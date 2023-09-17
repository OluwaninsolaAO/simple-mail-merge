#!/usr/bin/env python3
"""Task Module"""
from models.queue import app
from models.mail import MailFactory
from models.mail.utils import render_template
from typing import List
from dotenv import load_dotenv
from os import getenv
import redis
from datetime import datetime, timedelta

load_dotenv()
PSN = getenv('PROJECT_SHORT_NAME', 'test_queue')
r = redis.from_url(app.connection().as_uri())


@app.task
def task_send_mail(
    config: dict, Subject: str, body: str,
    recipient: dict, **kwargs
):
    """Sends email to a single reciepient"""

    # --------------------------------------------
    # CONFIGS RATE LIMITING IMPLEMENTATION WITH REDIS
    # --------------------------------------------
    key = '{}_configs:{}'.format(PSN, config.get('id'))
    ttl = timedelta(hours=1)

    # --------------------------------------------------------
    # ttl shorter in TEST Mode To be removed
    # --------------------------------------------------------
    if getenv('TEST', False):
        ttl = timedelta(seconds=15)  # test environ
    # --------------------------------------------------------

    mailcount = r.hget(key, 'mailcount')
    timestamp = r.hget(key, 'timestamp')

    if not all([mailcount, timestamp]):  # not being tracked
        r.hset(key, 'mailcount', 1)
        r.hset(key, 'timestamp', datetime.now().isoformat())
        r.expire(key, ttl.seconds - 5)  # 5 seconds shorter
    else:
        mailcount = int(mailcount)
        timestamp = datetime.fromisoformat(timestamp.decode('utf-8'))

        if mailcount >= 3:  # config.get('rate'):  # rate limit exceeded
            timestamp = (timestamp + ttl) - datetime.now()
            # reschedule task for later
            task_send_mail.apply_async(
                args=(
                    config, Subject, body, recipient
                ),
                kwargs=kwargs,
                countdown=timestamp.seconds
            )
            return
        else:  # rate not exceeded; OK increase  mailcount
            r.hset(key, 'mailcount', mailcount + 1)
    # --------------------------------------------

    mail = MailFactory(config=config)
    mail.send_mail(
        Subject=render_template(body=Subject, **recipient),
        body=render_template(body=body, **recipient),
        user=recipient,
        ** kwargs
    )


@app.task
def task_bulk_send(
    config: dict, Subject: str, body: str,
    recipients: List[dict], **kwargs
):
    """Factory an SMTP connection and send bulk email"""
    for reciepient in recipients:
        fields = {
            'config': config,
            'Subject': Subject,
            'body': body,
            'recipient': reciepient
        }
        fields.update(kwargs)
        task_send_mail.apply_async(kwargs=fields)

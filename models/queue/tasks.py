#!/usr/bin/env python3
"""Task Module"""
from models.queue import app
from models.mail import MailFactory
from models.mail.utils import render_template
from models import storage
from models.smtp_config import SMTPConfig


@app.task
def task_send_mail(
    config_id, Subject: str, body: str,
    receipient: dict, **kwargs
):
    """Creates Factory an SMTP connection and send mail"""
    config = storage.get(SMTPConfig, config_id)
    mail = MailFactory(config=config)
    mail.send_mail(
        Subject=render_template(body=Subject, **receipient),
        body=render_template(body=body, **receipient),
        user=receipient,
        ** kwargs
    )

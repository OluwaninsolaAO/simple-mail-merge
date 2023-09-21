#!/usr/bin/env python3
"""SendMail API Module"""
from api.v1.views import (
    app_views, postdata, login_required
)
from flask import abort, jsonify, g
from models import storage
from models.smtp_config import SMTPConfig
from models.recipient import Recipient
from models.queue.tasks import task_bulk_send


@app_views.route('/sendmail', methods=['POST'])
@login_required()
def sendmail_to_recipients():
    """Send email out to recipients"""
    data = postdata()
    if data is None:
        abort(400)

    attrs = ['config_id', 'subject', 'body', 'recipients']
    maildata = {}
    for attr in attrs:
        if attr in data:
            maildata.update({attr: data.get(attr)})
        else:
            return jsonify({
                "status": "error",
                "message": "Missing required data: " + attr,
                "data": None
            }), 400

    config_id = maildata.get('config_id')
    config = storage.get(SMTPConfig, config_id)
    if config is None:
        return jsonify({
            "status": "error",
            "message": "SMTP configuration not found",
            "data": None
        })
    if config.user is not g.user:
        abort(401)

    # try:
    #     recipients = Recipient.json_to_list(
    #         data=maildata.get('recipients')
    #     )
    # except Exception as exc:
    #     return jsonify({
    #         "status": "error",
    #         "message": str(exc),
    #         "data": None
    #     }), 400

    fields: dict = {
        'config': config.to_dict(detailed=True),
        'Subject': data.get('subject'),
        'body': data.get('body'),
        'recipients': maildata.get('recipients'),
        'content_type': 'html',
    }
    task_bulk_send.apply_async(kwargs=fields)

    return jsonify({
        "status": "success",
        "message": "Mail on its way",
        "data": None
    })

#!/usr/bin/env python3
"""Recipients API module"""

from api.v1.views import (
    app_views, jsonify, postdata, login_required
)
from models import storage
from models.user import UserRole, User
from models.recipient import Recipient
from flask import g, abort, request


@app_views.route('/users/me/recipients', methods=['GET'])
@login_required()
def get_users_recipients():
    """Returns a list of active user's Recipients list"""
    return jsonify({
        "status": "success",
        "message": "User recipients retrieved successfully",
        "data": {
            "count": len(g.user.recipients_list),
            "recipients_list": [r.to_dict() for r in g.user.recipients_list]
        }
    }), 200


@app_views.route('/recipients/<recipients_id>', methods=['GET'])
@login_required()
def get_recipients_list(recipients_id):
    """Returns a Recipients List with a matching recipients_id"""
    detailed = request.args.get('detailed', None) == 'true'
    recipients: Recipient = storage.get(Recipient, recipients_id)
    if recipients is None:
        abort(404)

    if recipients.user is not g.user:
        abort(401)

    return jsonify({
        "status": "success",
        "message": "Recipients List retrieved successfully",
        "data": recipients.to_dict(detailed=detailed)
    }), 200


@app_views.route('/users/me/recipients', methods=['POST'])
@login_required()
def create_users_recipients():
    """Create a list of Recipient for active user"""
    data = postdata()
    if data is None:
        abort(400)

    r_data = data.get('data', None)
    r_tag = data.get('tag', None)
    if not all([r_data, r_tag]):
        return jsonify({
            "status": "error",
            "message": "Missing required data `data` and `tag`",
            "data": None
        }), 400
    if not isinstance(r_data, list):
        return jsonify({
            "status": "error",
            "message": "Expecting data attribute to be of type list",
            "data": None
        }), 400

    recipients = Recipient(user=g.user, data=r_data, tag=r_tag)
    recipients.save()

    return jsonify({
        "status": "success",
        "message": "Recipients list created successfully",
        "data": recipients.to_dict()
    }), 201


@app_views.route('/recipients/<recipients_id>', methods=['PUT'])
@login_required()
def update_user_recipients(recipients_id):
    """Updates user's recipients list with a matching recipient_id"""
    data = postdata()
    if data is None:
        abort(400)

    recipients: Recipient = storage.get(Recipient, recipients_id)
    if recipients is None:
        abort(404)

    if recipients.user is not g.user:
        abort(401)

    r_data = data.get('data', None)
    r_tag = data.get('tag', None)

    if r_data is not None:
        if not isinstance(r_data, list):
            return jsonify({
                "status": "error",
                "message": "Expecting data attribute to be of type list",
                "data": None
            }), 400
        else:
            setattr(recipients, 'data', r_data)
    if r_tag is not None:
        setattr(recipients, 'tag', r_tag)
    recipients.save()

    return jsonify({
        "status": "success",
        "message": "Recipients list created successfully",
        "data": recipients.to_dict()
    }), 201


@app_views.route('/recipients/<recipients_id>', methods=['DELETE'])
@login_required()
def delete_user_recipients(recipients_id):
    """Deletes user's recipients list with a matching recipients_id"""
    recipients: Recipient = storage.get(Recipient, recipients_id)
    if recipients is None:
        abort(404)

    if recipients.user is not g.user:
        abort(401)

    storage.delete(recipients)
    storage.save()

    return jsonify({
        "status": "success",
        "message": "Recipients list deleted successfully",
        "data": None
    })

#!/usr/bin/env python3
"""SMTPConfig URI module"""

from flask import abort, g, request
from api.v1.views import (
    app_views, storage, jsonify, postdata, login_required)
from models.user import User
from models.smtp_config import SMTPConfig
from sqlalchemy.exc import IntegrityError
from models.enums import UserRole
from typing import List


@app_views.route('/configs', methods=['GET'])
@login_required()
def get_user_configs():
    """
    Returns a list of active user's smtp configurations.

    Query params:
    + detailed :
        = true : returns detailed data for each smtp configurations,
        including sensitive information such as passwords.
    """

    configs: List[SMTPConfig] = g.user.smtp_configs
    detailed = request.args.get('detailed', False) == 'true'

    return jsonify({
        "status": "success",
        "message": "User's smtp configurations retrieved successfully",
        "data": {
            "count": len(configs),
            "configs": [
                config.to_dict(detailed=detailed) for config in configs
            ]
        }
    })


@app_views.route('/configs/<config_id>', methods=['GET'])
@login_required()
def get_user_config(config_id):
    """
    Returns user's smtp configuration with a matching config_id

    Query params:
    + detailed :
        = true : returns detailed data for the smtp configuration,
        including sensitive information such as password.
    """
    detailed = request.args.get('detailed', False) == 'true'
    config: SMTPConfig = storage.get(SMTPConfig, config_id)
    if config is None:
        abort(404)
    if g.user is not config.user:
        abort(401)

    return jsonify({
        "status": "success",
        "message": "SMTP configuration retrieved successfully",
        "data": config.to_dict(detailed=detailed)
    })


@app_views.route('/configs', methods=['POST'])
@login_required()
def create_user_config():
    """
    Creates new SMTP configuration for the Active User

    TODO:
    - Validate SMTP Configuration to ensure it works fine.
    """
    data = postdata()
    if data is None:
        abort(400)

    attrs = ['alias', 'username', 'port', 'rate', 'server', 'password']
    misc = ['alias', 'port', 'rate']  # not required
    smtp_config = {}

    for attr in attrs:
        if attr in data:
            smtp_config.update({attr: data.get(attr)})
        elif attr not in misc:
            return jsonify({
                "status": "error",
                "message": "Missing required data: " + attr,
                "data": None
            }), 400

    config = SMTPConfig(user=g.user, **smtp_config)
    config.save()

    return jsonify({
        "status": "success",
        "message": "SMTP configuration created successfully",
        "data": config.to_dict()
    }), 201


@app_views.route('/configs/<config_id>', methods=['PUT'])
@login_required()
def update_user_config(config_id):
    """Updates user's smtp configuration with a matching config_id"""
    data = postdata()
    if data is None:
        abort(400)

    config: SMTPConfig = storage.get(SMTPConfig, config_id)
    if config is None:
        abort(404)

    # validates g.user's access to update user data
    if config.user is not g.user:
        abort(401)

    # list of config attribues allowed to be updated
    config_data = {}
    attrs = ['alias', 'username', 'port', 'rate', 'server', 'password']
    for attr in attrs:
        if attr in data:
            if attr in ['port', 'rate']:
                try:
                    config_data.update({attr: int(data.get(attr))})
                except ValueError:
                    return jsonify({
                        "status": "error",
                        "message": "Invalid value for port or rate",
                        "data": None
                    }), 400
            else:
                config_data.update({attr: data.get(attr)})

    for key, value in config_data.items():
        setattr(config, key, value)

    try:
        config.save()
    except IntegrityError:
        storage.rollback()
        return jsonify({
            "status": "error",
            "message": "Something went wrong while processing data, could be an empty or a None string in request data",
            "data": None
        }), 400

    return jsonify({
        "status": "success",
        "message": "SMTP configuration updated successfully",
        "data": config.to_dict(detailed=True)
    })


@app_views.route('/configs/<config_id>', methods=['DELETE'])
@login_required()
def delete_user_config(config_id):
    """Deletes user smtp configuration with a matching config_id"""
    config = storage.get(SMTPConfig, config_id)
    if config is None:
        abort(404)

    # validate user's access to delete
    if config.user is not g.user:
        abort(401)

    storage.delete(config)
    storage.save()

    return jsonify({
        "status": "success",
        "message": "SMTP configuration deleted successfully",
        "data": None
    })

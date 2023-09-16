#!/usr/bin/env python3
"""Users URI Module"""

from flask import abort
from api.v1.views import (
    app_views, storage, jsonify, postdata, login_required)
from models.user import User
from sqlalchemy.exc import IntegrityError
from typing import List
from models.enums import UserRole


@app_views.route('/users', methods=['GET'])
# @login_required([UserRole.admin, UserRole.moderator])
def get_users():
    """Return all users in storage"""

    users: List[User] = storage.all(User).values()
    return jsonify({
        "status": "success",
        "message": "Users retrieved successfully",
        "data": {
            "users": [user.to_dict() for user in users],
            "total": len(users)
        }
    }), 200


@app_views.route('/users', methods=['POST'])
def create_users():
    """Create a new User"""
    data = postdata()
    if data is None:
        abort(400)

    attrs = ['firstname', 'lastname', 'email', 'phone',
             'password', 'address',]
    user_data: dict = {}
    for attr in attrs:
        if attr in data:
            user_data.update({attr: data.pop(attr)})
    try:
        user = User(**user_data)
        user.save()
    except IntegrityError:
        storage.rollback()
        abort(422)

    return jsonify({
        "status": "success",
        "message": "User created successfully",
        "data": user.to_dict()
    }), 201

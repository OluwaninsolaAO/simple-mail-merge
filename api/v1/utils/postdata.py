#!/usr/bin/env python3
"""Get post/put data from flask request"""

from flask import request


def postdata() -> dict[str, str]:
    """Return obj of <class 'dict'> or None"""
    if request.get_json(silent=True):
        data = request.get_json(silent=True)
    elif request.form:
        data = request.form
    else:
        return None

    return data.copy()


def postjson() -> dict[str, str]:
    """Return obj of <class 'dict'> or None"""
    return request.get_json(silent=True)


def postform() -> dict[str, str]:
    """Return obj of <class 'dict'> or None"""
    return request.form

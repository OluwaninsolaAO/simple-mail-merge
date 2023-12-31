#!/usr/bin/env python3
"""A simple Celery Task Queue Service"""
from celery import Celery
from os import getenv

QUEUE_NAME = getenv('QUEUE_NAME') or 'tasks'

app: Celery = Celery(
    QUEUE_NAME, include=['models.queue.tasks']
)
app.config_from_object('models.queue.config')

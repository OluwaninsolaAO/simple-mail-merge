# ----------------------------------------------------------------
# Configurations for Python Celery for Queue System
#
# Installing dependencies:
# A list of dependencies required for Celery has been included in
# `requirements.txt` file, if the broker is configured to use redis,
# ensure that redis is up and running on your machine.
#
# Start Queue Service using:
# $ celery -A <path-to-queue> worker --loglevel=info
# ----------------------------------------------------------------

from os import getenv

REDIS_URL = getenv('REDIS_URL')

broker_url = REDIS_URL
result_backend = REDIS_URL
# result_backend = 'db+sqlite:///queue.sqlite'
broker_connection_retry_on_startup = True
worker_concurrency = 1
task_publish_retry = True

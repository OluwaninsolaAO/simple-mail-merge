#!/usr/bin/env python3
"""Models"""
from models.engine.db_storage import DBStorage
from models.mail import MailFactory
from models.smtp_config import SMTPConfig
from dotenv import load_dotenv
from os import getenv

load_dotenv()

storage = DBStorage()
storage.reload()

# Application's Own Mail Setup
SMTP_USERNAME = getenv('SMTP_USERNAME')
SMTP_PASSWORD = getenv('SMTP_PASSWORD')
SMTP_SERVER = getenv('SMTP_SERVER')
SMTP_PORT = getenv('SMTP_PORT')
NOTIFY_EMAIL = getenv('NOTIFY_EMAIL')

config = SMTPConfig(server=SMTP_SERVER, port=SMTP_PORT,
                    username=SMTP_USERNAME, password=SMTP_PASSWORD)

mail = MailFactory(config=config)

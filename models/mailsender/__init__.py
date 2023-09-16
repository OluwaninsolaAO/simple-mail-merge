#!/usr/bin/env python3
"""MailSender Module"""
import smtplib
from models.smtp_config import SMTPConfig
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from smtplib import SMTPAuthenticationError, SMTPConnectError


class MailSender:
    """MailSender Class"""

    def __init__(self, config: SMTPConfig, **kwargs):
        """Initializes a new instance of MailSender"""
        self.config = config

        # addtional attributes handling. e.g. header & footer watermark
        if kwargs is not None:
            for key, value in kwargs.items():
                setattr(self, key, value)

    def make_message(self, From=None, To=None, Subject=None,
                     user=None, body=None, content_type='plain'):
        """Returns a MIMEMultipart object string instance"""
        message = MIMEMultipart()
        message['Subject'] = Subject

        # validate From
        if From is None:
            message['From'] = self.config.username
        else:
            message['From'] = From

        # validate To
        if To is None and hasattr(user, 'email'):
            message['To'] = getattr(user, 'email')
        elif To is None and isinstance(user, dict):
            if user.get('email', None):
                message['To'] = user.get('email')
        elif To is not None:
            message['To'] = To
        else:
            raise AttributeError('Mail `To` cannot be left blank')

        # append additional attributes if defined
        if all([hasattr(self, 'header'), hasattr(self, 'footer')]):
            body = str(self.header) + body + str(self.footer)

        message.attach(MIMEText(body, content_type))
        return message

    def send_mail(self, From=None, To=None, Subject=None,
                  user=None, body=None, content_type='plain'):
        """Overloads and sends out email"""
        message = self.make_message(From, To, Subject,
                                    user, body, content_type)

        try:
            with smtplib.SMTP_SSL(self.config.server,
                                  self.config.port) as server:
                server.starttls()
                server.login(self.config.username,
                             self.config.password)
                server.sendmail(message.get('From'),
                                message.get('To'),
                                message.as_string())
        except SMTPAuthenticationError as exc:
            raise SMTPAuthenticationError  # to be handled later
        except SMTPConnectError as exc:
            raise SMTPConnectError  # to be handled later

        return True

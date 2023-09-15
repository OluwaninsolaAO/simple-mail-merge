#!/usr/bin/env python3
"""SMTP Configurations module"""

from models.base_model import Base, BaseModel
from sqlalchemy import (
    Column, String, Integer, ForeignKey
)
from sqlalchemy.orm import relationship
from base64 import b64encode, b64decode
from typing import Dict


class SMTPConfig(BaseModel, Base):
    """Holds Users SMTP Configurations"""

    __tablename__ = 'smtp_configs'

    alias = Column(String(255), nullable=True)
    username = Column(String(255), nullable=False)
    _password = Column(String(255), nullable=False)
    server = Column(String(255), nullable=False)
    port = Column(Integer, default=587, nullable=False)
    rate = Column(Integer, default=50)  # mails/hour

    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    user = relationship('User', backref='smtp_configs',
                        cascade='all, delete')

    @property
    def password(self) -> str:
        """Returns decoded SMTP password"""
        return b64decode(self._password.encode('utf-8')).decode('utf-8')

    @password.setter
    def password(self, password: str):
        """Setter for SMTP Config password"""
        self._password = b64encode(password.encode('utf-8')).decode('utf-8')

    def to_dict(self, detailed=False) -> Dict[str, str]:
        """Overrides parent's defualt"""
        obj = super().to_dict()

        # level - 1 heldback attributes
        attrs = ['_password']
        for attr in attrs:
            if obj.get(attr, None):
                obj.pop(attr)

        if detailed is True:
            return obj

        # level - 2 heldback attributes
        attrs = ['user_id']
        for attr in attrs:
            if obj.get(attr, None):
                obj.pop(attr)

        return obj

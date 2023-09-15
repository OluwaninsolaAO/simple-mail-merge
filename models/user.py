#!/usr/bin/env python3
"""Defines User class"""

import bcrypt
from uuid import uuid4
from base64 import b64encode, b64decode
from models.base_model import Base, BaseModel
from sqlalchemy import (
    Column, String
)


class User(BaseModel, Base):
    """Users class"""
    __tablename__ = "users"

    firstname = Column(String(255), nullable=False)
    lastname = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    phone = Column(String(15), nullable=False, unique=True)
    address = Column(String(255), nullable=True)
    reset_token = Column(String(255), nullable=True)
    _password = Column(String(255), nullable=True)

    @property
    def password(self):
        """User password getter"""
        return self._password

    @password.setter
    def password(self, value: str):
        """
        User password setter: hash with bcrypt before
        storing in the database.
        """
        if value is None or value == '':
            raise ValueError('User password cannot be null or empty string')
        self._password = bcrypt.hashpw(
            value.encode('utf-8'), bcrypt.gensalt(4)
        )

    @property
    def name(self) -> str:
        """Returns User fullname"""
        return '{} {}'.format(self.firstname, self.lastname)

    def is_valid_password(self, password: str) -> bool:
        """Validate if password is a valid user password"""
        return bcrypt.checkpw(
            password.encode('utf-8'), self._password
        )

    def is_valid_reset_token(self, reset_token: str) -> bool:
        """Validate if token is a valid user reset token"""
        return self.reset_token == reset_token

    def generate_reset_token(self) -> str:
        """Generates new user reset_token and return"""
        token = str(uuid4())
        self.reset_token = token
        return b64encode(token.encode('utf-8')).decode('utf-8')

    @staticmethod
    def decode_reset_token(encoded_token: str):
        """A static method for decoding base64 encoded token"""
        return b64decode(encoded_token.encode('utf-8')).decode('utf-8')

#!/usr/bin/env python3
"""Defines User class"""

from models.base_model import Base, BaseModel
from sqlalchemy import (
    Column, String
)
from models.user.auth import UserAuth


class User(BaseModel, Base, UserAuth):
    """Users class"""
    __tablename__ = "users"

    firstname = Column(String(255), nullable=False)
    lastname = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    phone = Column(String(15), nullable=False, unique=True)
    address = Column(String(255), nullable=True)

    @property
    def name(self) -> str:
        """Returns User fullname"""
        return '{} {}'.format(self.firstname, self.lastname)

#!/usr/bin/env python3
"""Recipient Module"""
from models.recipient.data_format_converter import DataFormatConverter
from models.base_model import BaseModel, Base
from sqlalchemy import (
    Column, JSON, String, ForeignKey
)
from sqlalchemy.orm import relationship
from base64 import b64encode, b64decode
from typing import Dict


class Recipient(BaseModel, Base, DataFormatConverter):
    """Recipient Class for storing user contacts"""

    __tablename__ = 'recipients'
    data = Column(JSON, nullable=False)
    tag = Column(String(255))

    # Foreign Keys
    user_id = Column(String(60), ForeignKey('users.id'),
                     nullable=False)

    @property
    def ref(self) -> str:
        """Return a b64encoded string as reference to Recipient"""
        return b64encode(self.id.encode('utf-8')).decode('utf-8')

    def to_dict(self, detailed=False) -> Dict[str, str]:
        """Overrides parent's defualt"""
        obj = super().to_dict()

        # attributes with their own to_dict() methods
        attrs = ['user']
        for attr in attrs:
            if hasattr(self, attr):
                if getattr(self, attr, None) is not None:
                    obj.update({attr: getattr(self, attr).to_dict()})
                else:
                    obj.update({attr: getattr(self, attr)})

        # level - 1 heldback attributes
        attrs = ['user_id']
        for attr in attrs:
            if attr in obj:
                obj.pop(attr)

        if detailed is True:
            return obj

        # level - 3 heldback attributes
        attrs = ['created_at', 'updated_at', 'user']
        for attr in attrs:
            if attr in obj:
                obj.pop(attr)

        return obj

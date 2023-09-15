#!/usr/bin/env python3
"""Models"""
from models.engine.db_storage import DBStorage
from dotenv import load_dotenv

load_dotenv()

storage = DBStorage()
storage.reload()

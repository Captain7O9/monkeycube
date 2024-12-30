import os

import pymongo

from .models import User

database_url = os.getenv("DATABASE_URL")
db_client = pymongo.MongoClient(database_url)
db = db_client["monkeycube"]


def get_user(filter: dict):
    user = db["users"].find_one(filter, {"hashed_password": 0})
    if user:
        return User(**user)

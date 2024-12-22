import os

import pymongo

database_url = os.getenv("DATABASE_URL")
db_client = pymongo.MongoClient(database_url)
db = db_client["monkeycube"]

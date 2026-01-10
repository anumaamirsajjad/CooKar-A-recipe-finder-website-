import os
from pymongo import MongoClient
from flask import g
from dotenv import load_dotenv

load_dotenv()  # loads variables from .env

def get_db():
    """
    Returns a MongoDB database instance using MongoDB Atlas.
    Uses Flask's 'g' to store connection for each request.
    """
    if "db" not in g:
        mongo_uri = os.getenv("MONGO_URI")

        if not mongo_uri:
            raise RuntimeError(
                "MONGO_URI not set. Please create a .env file with your MongoDB connection string."
            )

        client = MongoClient(
            mongo_uri,
            serverSelectionTimeoutMS=50000,
            connectTimeoutMS=30000,
            socketTimeoutMS=30000
        )

        g.db = client["flaskAppDB"]

    return g.db


def close_db(e=None):
    g.pop("db", None)

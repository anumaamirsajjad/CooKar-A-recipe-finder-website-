from pymongo import MongoClient
from flask import g
import os

def get_db():
    """
    Get MongoDB database connection for MongoDB Atlas
    """
    if 'db' not in g:
        # MongoDB Atlas connection string
        # Replace with your actual connection string from MongoDB
        #  Atlas
        connection_string = "mongodb+srv://l230893_db_user:FuFtw6DUTItdC74F@cluster0.q3zi5uv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        
        
        client = MongoClient(connection_string)
        g.db = client["flaskAppDB"]  # Your database name in Atlas
    return g.db

def close_db(e=None):
    # MongoDB connections are handled automatically
    pass
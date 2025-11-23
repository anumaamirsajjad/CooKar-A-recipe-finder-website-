# # db.py
# from pymongo import MongoClient
# from flask import g

# def get_db():
#     """
#     Returns a MongoDB database instance using MongoDB Atlas.
#     Uses Flask's 'g' to store connection for each request.
#     """
#     if "db" not in g:
#         connection_string = (
#             "mongodb+srv://l230893_db_user:FuFtw6DUTItdC74F"
#             "@cluster0.q3zi5uv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
#         )

#         client = MongoClient(connection_string)
#         g.db = client["flaskAppDB"]  # Your Atlas database name

#     return g.db

# def close_db(e=None):
#     """
#     Optional cleanup — MongoDB handles pooling automatically.
#     """
#     db = g.pop("db", None)
#     if db is not None:
#         pass  # client.close() not required for Atlas
# db.py
from pymongo import MongoClient
from flask import g

def get_db():
    """
    Returns a MongoDB database instance using MongoDB Atlas.
    Uses Flask's 'g' to store connection for each request.
    """
    if "db" not in g:
        connection_string = (
            "mongodb+srv://l230893_db_user:FuFtw6DUTItdC74F"
            "@cluster0.q3zi5uv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        )

        # Add timeout parameters here
        client = MongoClient(
            connection_string,
            serverSelectionTimeoutMS=50000,  # 50 seconds to find a primary
            connectTimeoutMS=30000,          # 20 seconds to establish connection
            socketTimeoutMS=30000            # 20 seconds for read/write operations
        )

        g.db = client["flaskAppDB"]  # Your Atlas database name

    return g.db

def close_db(e=None):
    """
    Optional cleanup — MongoDB handles pooling automatically.
    """
    db = g.pop("db", None)
    if db is not None:
        pass  # client.close() not required for Atlas
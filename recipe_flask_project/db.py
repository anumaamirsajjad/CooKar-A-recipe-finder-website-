 # Database connection setup


# http://127.0.0.1:5000/comments

from pymongo import MongoClient

def get_db():
    # Your MongoDB connection string
    uri = "mongodb+srv://l230893_db_user:FuFtw6DUTItdC74F@cluster0.q3zi5uv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    
    # Connect to MongoDB Atlas
    client = MongoClient(uri)

    # Select your database (must match the name you created in Atlas)
    db = client["flaskAppDB"]
    
    return db

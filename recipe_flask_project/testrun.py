from pymongo import MongoClient

# Your connection string
uri = "mongodb+srv://l230893_db_user:FuFtw6DUTItdC74F@cluster0.q3zi5uv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Connect to MongoDB Atlas
client = MongoClient(uri)

# Access the database
db = client["flaskAppDB"]

# List of collections to create
collections_to_create = [
    "Recipe",
    "RecipeFinder",
    "Rating",
    "Cuisine",
    "Ingredients",
    "Comment",
    "DietaryPreference"
]

# Attempt to create collections
for collection_name in collections_to_create:
    try:
        db.create_collection(collection_name)
        print(f"Collection '{collection_name}' created successfully.")
    except Exception as e:
        print(f"Error creating collection '{collection_name}': {e}")

# Verify collections
collections = db.list_collection_names()
print("Collections in test_database:")
for collection in collections:
    print(collection)
    
    #HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
    #hellooooooooooooooooooo
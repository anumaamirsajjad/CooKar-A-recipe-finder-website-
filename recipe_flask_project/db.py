from pymongo import MongoClient
import random

# Connect to MongoDB
uri = "mongodb+srv://l230893_db_user:FuFtw6DUTItdC74F@cluster0.q3zi5uv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["flaskAppDB"]

recipe_col = db["Recipe"]
ingredient_col = db["Ingredient"]
rating_col = db["Rating"]
comment_col = db["Comment"]

# --- Recipe Names (from your collection) ---
recipe_names = [
    "Spicy Black-Eyed Pea Curry with Swiss Chard and Roasted Eggplant",
    "Gujarati Dry Mung Bean Curry",
    "Rice and Peas with Coconut Curry Mackerel",
    "Indian-Style Dill and Turmeric Potato Salad",
    "Slow Cooker Lamb Curry",
    "Curry Mussels",
    "Authentic Jamaican Curry Chicken",
    "Indian-Style Pumpkin Side Dish",
    "Easy Chicken Tikka Masala",
    "Curry Beef Over Rice Noodles",
    "Luscious Palak Paneer",
    "Assam Fish Curry",
    "Ethiopian Lentil Curry",
    "Mint, Fennel and Garlic Naan",
    "Lamb Chops Masala",
    "Chai Pani’s Malabar Chicken Curry",
    "Lamb Coconut Tomato Curry Sauce",
    "Couscous Biryani",
    "Roasted Acorn Squash Stuffed with spicy Biryani (Veg/vegan)",
    "Strawberry and Banana Lassi",
    "Spicy Coconut Curry With Peppers, Pak Choi and Tomatoes",
    "Masala Lamb Chops",
    "Indian-Inspired Lentil Soup",
    "Chicken Tikka Masala Indian",
    "Indian Lentil Dahl",
    "Kari Kepala Ikan Bersama Belimbing Buluh (Fish Head Curry)",
    "Minced Beef Curry",
    "Coconut Vegetable Curry Over Quinoa",
    "Chickpea and Pumpkin Curry",
    "Red Curry Stew & Vegetable Noodles",
    "Baked Indian Spice Chickpea",
    "Halibut with Coconut and Green Curry",
    "Cashew Butter Chicken",
    "Pachai Payaru Kulambu (Green Moong Dal Curry)",
    "Fish Fillet In Creamy Coconut Curry",
    "Channa-Chickpea, Potato & Cauliflower Curry",
    "Eggplant Curry",
    "Palak Paneer",
    "Thai Coconut Curry Lentil Soup",
    "Thai Basil Chicken With Green Curry",
    "Hyderabadi Chicken Curry",
    "Kashmiri Rogan Josh",
    "Paneer jalfrezi",
    "Fenugreek Roti",
    "Curry Chicken Salad",
    "Thai Coconut Curry Soup",
    "Vegan Chana Masala Curry",
    "Meatball Curry (Kofta Curry)",
    "Madras Beef Curry",
    "Boiled Egg Curry",
    "Masala Raisin Chicken",
    "Curry and Sage Roast Chicken",
    "Spinach Chickpea - Palak Chana Rice",
    "Easy Chicken Tandoori",
    "Murg Malai Tikka",
    "Indian-Style Eggs On Toast",
    "Creamy Maharashtrian Chole",
    "Baked Indian Samosas",
    "Butter Chicken",
    "Minced Mutton Curry",
    "Creamy Chicken Tikka Masala",
    "Healthy Tomato Soup with Coconut and Curry",
    "Thai Red Curry",
    "Garlic-Butter Naan",
    "Kohlrabi Fries with Curry Ketchup",
    "Indian Asparagus with Ginger & Lime",
    "Express Chicken Curry",
    "Indian Tandoori Chicken",
    "Ridiculously Easy Naan",
    "Curry Mee Noodle Soup",
    "Prawn Curry",
    "Grilled Masala Prawns With Pineapple-Mint Raita",
    "Easy Eggplant Curry",
    "My Chicken Korma",
    "Red Lentil Curry (Vegan, Gluten Free)",
    "Coconut Prawn Curry",
    "Masala Roti/chapati( Spiced Indian Flat Bread)",
    "Easy Naan Bread with Garlic Butter",
    "Kofat Curry/meat Ball Curry",
    "Vegetable Paneer Skewers Or Paneer Tikka",
    "Palak-tofu (bean curd)",
    "Curry-Braised Chicken",
    "Quick Goan Fish Curry",
    "Maple & Curry Acorn Squash",
    "Spicy Coconut Chicken Curry",
    "Beef and Tomato Curry Over Quinoa",
    "Garam Masala Pork Chops with Mint Yogurt and Spiced Couscous",
    "Prawn Biryani( Shrimps In Aromatic and Flavored Indian Rice)",
    "chettinad egg curry",
    "Singapore Curry",
    "Malay-Style Red Chicken Curry",
    "Special Vegetable Biryani",
    "onion raita",
    "mushroom curry",
    "Simple Garlic Butter Naan",
    "Indian Spiced Red Lentil Soup",
    "Curry Fish With Peas",
    "Kaleji Curry",
    "Mussels In Curry Sauce",
    "Green Curry Chicken Salad",
    "Salted Mint Lassi",
    "Palak Gosht",
    "Trinidadian Chicken Potato Curry",
    "avarakkai paruppu curry recipe",
    "Mughlai Malai Kofta Curry",
    "Curry Spiced Carrots",
    "Garlicky Mussels With Curry Cream",
    "Chana Masala in Minty Yogurt sauce",
    "Indian Butter Chicken",
    "Indian Sweet Jackfruit Dessert",
    "paneer butter masala",
    "Indian-Spiced Ground Beef Main Dish",
    "Tropical Thai Chicken Curry",
    "Walnut Dark Chocolate Truffles",
    "Spiced Lassi",
    "mushroom masala",
    "Creamy Curry Chicken With Yellow Rice",
    "Saffron Chicken Tikka",
    "Curry Crackers",
    "Avocado Sweet Lassi - How to make Avocado Lassi - Indian Avocado",
    "mint raita"
]

# --- Mock data for population ---
sample_ingredients = [
    ["onion", "garlic", "ginger", "tomatoes", "curry powder"],
    ["chicken", "coconut milk", "onion", "garlic", "spices"],
    ["paneer", "spinach", "cream", "garlic", "salt"],
    ["eggplant", "tomato", "mustard seeds", "chili powder", "oil"],
    ["rice", "peas", "coconut milk", "salt", "pepper"]
]

sample_comments = [
    "Absolutely delicious!",
    "Turned out better than I expected.",
    "A bit spicy but perfect for curry lovers.",
    "Will definitely make this again!",
    "Very authentic taste."
]

# --- Populate each recipe ---
for name in recipe_names:
    recipe = recipe_col.find_one({"title": name})
    if recipe:
        print(f"Populating: {name}")

        # Random ingredients
        chosen_ingredients = random.choice(sample_ingredients)
        ingredient_ids = []
        for item in chosen_ingredients:
            ing_doc = {"name": item, "quantity": f"{random.randint(1,3)} tbsp"}
            inserted_ing = ingredient_col.insert_one(ing_doc)
            ingredient_ids.append(inserted_ing.inserted_id)

        # Rating
        rating_doc = {"recipe_id": recipe["_id"], "rating": round(random.uniform(3.0, 5.0), 1)}
        rating_col.insert_one(rating_doc)

        # Comments
        for comment in random.sample(sample_comments, k=2):
            comment_col.insert_one({"recipe_id": recipe["_id"], "comment": comment})

        # Update recipe with ingredients + rating refs
        recipe_col.update_one(
            {"_id": recipe["_id"]},
            {"$set": {"ingredients": ingredient_ids}}
        )
    else:
        print(f"❌ Recipe not found: {name}")

print("✅ Population complete!")

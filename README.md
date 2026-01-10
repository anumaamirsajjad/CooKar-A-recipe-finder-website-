# CooKar – Recipe Finder Website

[![Project Status](https://img.shields.io/badge/status-active-success)](https://github.com/anumaamirsajjad/CooKar-A-recipe-finder-website-)  
[![License](https://img.shields.io/badge/license-Educational-blue)](LICENSE)

CooKar is a web-based **Recipe Finder** that helps users discover recipes based on ingredients, cuisine, and dietary preferences. It reduces food waste, encourages culinary creativity, and provides a community-driven cooking experience with features like calorie tracking, step-by-step instructions, YouTube tutorials, commenting, and ratings.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Installation](#installation)  
4. [Usage](#usage)  
5. [Contributing](#contributing)  
6. [License](#license)

---

## Features

* **Search Recipes** – By name or ingredients you have at home.  
* **Cuisine & Dietary Filters** – Filter recipes by cuisine (e.g., Italian, Pakistani) or dietary preferences (e.g., vegan, keto).  
* **Calorie & Nutritional Info** – Know what you eat.  
* **Step-by-Step Instructions** – Easy cooking with tutorials.  
* **Community Engagement** – Comment and rate recipes.  
* **Add New Recipes** – Admins or users can contribute new recipes.

---

## Tech Stack

**Frontend:** React.js, TailwindCSS  
**Backend:** Python Flask (RESTful APIs)  
**Database:** MongoDB Atlas  
**Other:** dotenv (environment variables), Flask-CORS  

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CooKar.git
cd CooKar/recipe_flask_project
```
### 2. Set Up Backend

```bash
# Create virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Set Up Frontend

```bash
cd frontend
npm install
```

### 4. Environment Variables

Create a .env file in recipe_flask_project/:
```bash
MONGO_URI=<your_mongodb_connection_string>
```

## Usage

### 1. Start the backend (from backend/):

```bash
python app.py
```

### 2. Start the frontend (from frontend/):

```bash
npm start
```
Open [http://localhost:5173](http://localhost:5173) to use the website.

You can:

* Search recipes by name or ingredients
* Filter recipes by cuisine or dietary preference
* View detailed instructions and video tutorials
* Comment and rate recipes
* Add new recipes (if admin or contributor)

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push branch: `git push origin feature/YourFeature`
5. Open a Pull Request

> Remember: Do **not** commit `.env` or sensitive files.

---

## License

This project is for educational purposes.
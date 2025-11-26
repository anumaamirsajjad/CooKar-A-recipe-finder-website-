#include <string>
#include <vector>
#include <algorithm>
#include <numeric>
#include "Ingredient.c"
#include "Comment.c"
#include "Rating.c"
#include "Cuisine.c"
#include "DietaryPreference.c"
#include "IObserver.c"

class Recipe {
private:
    // ✅ Composite Pattern:
    // Recipe "composes" Ingredients, Comments, Ratings into a whole.
    std::vector<Ingredient> ingredients;
    std::vector<Comment> comments;
    std::vector<Rating> ratings;

    // ✅ Observer Pattern:
    // Recipe maintains a list of observers to notify on changes.
    std::vector<IObserver*> observers;

public:
    std::string recipeName;
    int recipeID;
    int cookingTime;
    std::vector<std::string> instructions;
    int servings;
    int calories;
    bool isVegetarian;
    bool isVegan;
    bool isGlutenFree;
    Cuisine cuisine;
    DietaryPreference preference;

    Recipe(std::string name, int id, int time, std::vector<std::string> instructions,
           int servings, int calories, bool veg, bool vegan, bool glutenFree,
           Cuisine cuisine, DietaryPreference preference)
        : recipeName(name), recipeID(id), cookingTime(time), instructions(instructions),
          servings(servings), calories(calories), isVegetarian(veg), isVegan(vegan),
          isGlutenFree(glutenFree), cuisine(cuisine), preference(preference) {}

    void addIngredient(const Ingredient& ingredient) { ingredients.push_back(ingredient); }

    void removeIngredient(const std::string& name) {
        ingredients.erase(std::remove_if(ingredients.begin(), ingredients.end(),
            [&](const Ingredient& ing) { return ing.name == name; }), ingredients.end());
    }

    void addComment(const Comment& comment) {
        comments.push_back(comment);
        notifyObservers("New comment added by " + comment.user);
    }

    void addRating(const Rating& rating) {
        if (Rating::isValidRating(rating.value)) {
            ratings.push_back(rating);
            notifyObservers("New rating added by " + rating.user);
        }
    }

    double getAverageRating() const {
        if (ratings.empty()) return 0.0;
        int sum = std::accumulate(ratings.begin(), ratings.end(), 0,
            [](int acc, const Rating& r) { return acc + r.value; });
        return static_cast<double>(sum) / ratings.size();
    }

    const std::vector<Ingredient>& getIngredients() const { return ingredients; }
    const std::vector<Comment>& getComments() const { return comments; }
    const std::vector<Rating>& getRatings() const { return ratings; }

    // ✅ Observer Pattern methods
    void attach(IObserver* observer) { observers.push_back(observer); }
    void detach(IObserver* observer) {
        observers.erase(std::remove(observers.begin(), observers.end(), observer), observers.end());
    }
    void notifyObservers(const std::string& message) {
        for (auto* obs : observers) {
            obs->update("Recipe [" + recipeName + "]: " + message);
        }
    }
};
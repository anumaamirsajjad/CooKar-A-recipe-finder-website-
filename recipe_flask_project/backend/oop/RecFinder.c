#include <vector>
#include <memory>
#include <algorithm>
#include "ISearchStrategy.c"

// ✅ Strategy Pattern applied here:
// RecipeFinder delegates searching to injected ISearchStrategy implementations.
// ✅ OCP: New search strategies can be added without modifying RecipeFinder.
// ✅ DIP: Depends on ISearchStrategy abstraction, not concrete classes.
class RecipeFinder {
private:
    std::vector<std::shared_ptr<Recipe>> recipes;

public:
    void addRecipe(std::shared_ptr<Recipe> recipe) { recipes.push_back(recipe); }

    std::vector<std::shared_ptr<Recipe>> search(ISearchStrategy& strategy, const std::string& keyword) {
        return strategy.search(recipes, keyword);
    }

    std::vector<std::shared_ptr<Recipe>> getTopRatedRecipes() {
        auto all = recipes;
        std::sort(all.begin(), all.end(), [](const auto& a, const auto& b) {
            return a->getAverageRating() > b->getAverageRating();
        });
        return all;
    }
};
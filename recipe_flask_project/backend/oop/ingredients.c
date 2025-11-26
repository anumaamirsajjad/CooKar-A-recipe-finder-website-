#include <string>
#include <vector>
#include <algorithm>

class Ingredient {
public:
    std::string name;
    std::string quantity;

    // ✅ SRP: Ingredient only manages its own data and allergen check.
    Ingredient(const std::string& name, const std::string& quantity)
        : name(name), quantity(quantity) {}

    bool isAllergen(const std::string& ingredientName) const {
        static std::vector<std::string> allergens = {"peanut", "gluten", "soy"};
        return std::find(allergens.begin(), allergens.end(), ingredientName) != allergens.end();
    }
};
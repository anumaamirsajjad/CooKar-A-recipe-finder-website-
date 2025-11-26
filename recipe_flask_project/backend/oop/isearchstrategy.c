#include <string>
#include <vector>
#include <memory>
#include "Recipe.c"

// ✅ Strategy Pattern:
// Defines abstraction for search algorithms.
// ✅ DIP: RecipeFinder depends on this abstraction, not concrete implementations.
class ISearchStrategy {
public:
    virtual std::vector<std::shared_ptr<Recipe>> search(
        const std::vector<std::shared_ptr<Recipe>>& recipes,
        const std::string& keyword) = 0;

    virtual ~ISearchStrategy() = default;
};


#include "ISearchStrategy.c"

// ✅ Strategy Pattern:
// Concrete implementation of ISearchStrategy for searching by recipe name.
class SearchByName : public ISearchStrategy {
public:
    std::vector<std::shared_ptr<Recipe>> search(
        const std::vector<std::shared_ptr<Recipe>>& recipes,
        const std::string& keyword) override {

        std::vector<std::shared_ptr<Recipe>> result;
        for (auto& r : recipes) {
            if (r->recipeName.find(keyword) != std::string::npos) {
                result.push_back(r);
            }
        }
        return result;
    }
};
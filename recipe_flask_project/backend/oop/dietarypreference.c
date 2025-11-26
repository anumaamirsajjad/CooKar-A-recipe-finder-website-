#include <string>

class DietaryPreference {
public:
    std::string name;

    DietaryPreference(const std::string& name) : name(name) {}

    static bool isValidPreferenceName(const std::string& name) {
        return !name.empty();
    }
};
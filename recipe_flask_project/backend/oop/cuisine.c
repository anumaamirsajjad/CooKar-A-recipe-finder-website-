#include <string>

class Cuisine {
public:
    std::string name;

    Cuisine(const std::string& name) : name(name) {}

    static bool isValidCuisineName(const std::string& name) {
        return !name.empty();
    }
};
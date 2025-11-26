#include <string>

class Rating {
public:
    int ratingID;
    int value;
    std::string user;

    // ✅ SRP: Rating only manages rating data and validation.
    Rating(int id, int value, const std::string& user)
        : ratingID(id), value(value), user(user) {}

    static bool isValidRating(int value) {
        return value >= 1 && value <= 5;
    }
};
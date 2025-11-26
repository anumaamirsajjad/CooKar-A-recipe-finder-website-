#include <string>

class Comment {
public:
    int commentID;
    std::string text;
    std::string user;

    // ✅ SRP: Comment only stores user feedback data.
    Comment(int id, const std::string& text, const std::string& user)
        : commentID(id), text(text), user(user) {}
};
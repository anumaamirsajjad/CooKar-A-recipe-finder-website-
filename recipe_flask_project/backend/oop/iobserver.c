#include <string>

// ✅ Observer Pattern:
// Abstract observer interface. Any class interested in recipe changes implements this.
class IObserver {
public:
    virtual void update(const std::string& message) = 0;
    virtual ~IObserver() = default;
};
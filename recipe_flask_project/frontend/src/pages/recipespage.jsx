/**
 * 🎨 DESIGN PATTERNS IMPLEMENTED:
 * 
 * 1. ✅ ADAPTER PATTERN:
 *    - getRecipeTitleFromUrl adapts URL to recipe title format
 *    - stripHtmlTags adapts HTML to plain text
 *    - Component adapts different field names (servingSize/servings, ratingAvg/rating)
 * 
 * 2. ✅ OBSERVER PATTERN (React State):
 *    - Recipe, ingredients, cuisines are observables
 *    - UI automatically updates when state changes
 *    - Notification system observes success events
 * 
 * 3. ✅ COMPOSITE PATTERN:
 *    - RecipeFinder composed of sections (hero, stats, instructions, reviews)
 *    - RecipeReviews nested as child component
 *    - Tree structure of components
 * 
 * 4. ✅ DECORATOR PATTERN:
 *    - stripHtmlTags decorates HTML content
 *    - showSuccessNotification decorates actions with feedback
 * 
 * 5. ✅ TEMPLATE METHOD PATTERN:
 *    - Page layout follows fixed template
 *    - Header → Hero Image → Stats → Instructions → Cuisines → Dietary → Reviews → Ingredients
 *    - Content varies but structure consistent
 * 
 * 6. ✅ PRESENTER/CONTROLLER PATTERN:
 *    - RecipeFinder orchestrates data flow
 *    - Manages state, delegates to child components
 *    - Separates business logic from presentation
 *
 * 🎨 DESIGN PRINCIPLES APPLIED:
 * 
 * 1. SINGLE RESPONSIBILITY PRINCIPLE (SRP):
 *    - RecipeFinder: orchestrates recipe detail page display
 *    - stripHtmlTags: handles ONLY HTML sanitization
 *    - getRecipeTitleFromUrl: handles ONLY URL parsing
 *    - showSuccessNotification: handles ONLY notification display
 * 
 * 2. DRY (Don't Repeat Yourself):
 *    - stripHtmlTags utility prevents repeating sanitization logic
 *    - Notification logic centralized in one function
 * 
 * 3. SEPARATION OF CONCERNS:
 *    - Data fetching separate from rendering
 *    - URL parsing separate from API calls
 *    - Notification logic separate from main component
 * 
 * 4. COMPOSITION:
 *    - RecipeReviews component composed into page
 *    - Page built from smaller, focused sections
 * 
 * 5. DEPENDENCY INJECTION:
 *    - Recipe data passed to child components as props
 *    - RecipeReviews receives recipe via props, doesn't fetch itself
 */

// RecipeFinder.jsx (Recipe Detail Page)
import React, { useState, useEffect } from "react";
import "./recipespages.css";
import RecipeReviews from "./RecipeReviews";
import bgLogo from "../assets/images/bg.png"; 

const RecipeFinder = () => {
  // 🔹 STATE MANAGEMENT (SRP - each state has single purpose)
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [dietaryPrefs, setDietaryPrefs] = useState([]); 
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // 🔹 DECORATOR PATTERN: Strips/decorates HTML content to plain text
  // Wraps HTML and enhances it by removing tags
  const stripHtmlTags = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // 🔹 UTILITY FUNCTION: Notification handler (SRP)
  // Single purpose: display success notifications
  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // 🔹 ADAPTER PATTERN: Converts URL format to recipe title
  // Adapts browser URL to application data format
  const getRecipeTitleFromUrl = () => {
    const parts = window.location.pathname.split("/");
    return (
      decodeURIComponent(parts[parts.length - 1]) ||
      "Spicy Black-Eyed Pea Curry with Swiss Chard and Roasted Eggplant"
    );
  };

  // 🔹 DATA FETCHING EFFECT (Separation of Concerns)
  // Handles ONLY data loading from API, not rendering
  // Backend enrichment eliminates need for multiple API calls
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setLoading(true);
        const recipeTitle = getRecipeTitleFromUrl();

        // 1) Fetch recipe
        const recipeResponse = await fetch(
          `http://localhost:5000/api/recipes/${encodeURIComponent(recipeTitle)}`
        );
        if (!recipeResponse.ok) throw new Error("Failed to fetch recipe");
        const recipeData = await recipeResponse.json();

        let ratingData = { rating: 0, reviews_count: 0 };
        const rawId = recipeData._id;
        const recipeId =
          typeof rawId === "string" ? rawId : rawId?.$oid ? rawId.$oid : null;

        if (recipeId) {
          const ratingResponse = await fetch(
            `http://localhost:5000/api/ratings/${recipeId}`
          );
          if (ratingResponse.ok) ratingData = await ratingResponse.json();
        }

        // 2) Fetch comments count
        let commentsData = { comments_count: 0 };
        if (recipeId) {
          const commentsResponse = await fetch(
            `http://localhost:5000/api/comments/count/${recipeId}`
          );
          if (commentsResponse.ok) commentsData = await commentsResponse.json();
        }

        const fullRecipe = {
          ...recipeData,
          rating: ratingData.rating || 0,
          reviews_count: ratingData.reviews_count || 0,
          comments_count: commentsData.comments_count || 0,
        };

        setRecipe(fullRecipe);

        // 3) Fetch cuisines
        if (recipeData.cuisine_ids?.length) {
          const cuisineIds = recipeData.cuisine_ids.map((x) =>
            x.$oid ? x.$oid : x
          );

          const cuisinesResponse = await fetch(
            "http://localhost:5000/api/cuisines/many",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ids: cuisineIds }),
            }
          );

          if (cuisinesResponse.ok) {
            const cuisinesData = await cuisinesResponse.json();
            setCuisines(cuisinesData);
          }
        }

        // 3b) Fetch dietary preferences ✅
        if (recipeData.dietary_ids?.length) {
          const dietaryIds = recipeData.dietary_ids.map((x) =>
            x.$oid ? x.$oid : x
          );

          const dietaryResponse = await fetch(
            "http://localhost:5000/api/dietary-preferences/many",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ids: dietaryIds }),
            }
          );

          if (dietaryResponse.ok) {
            const dietaryData = await dietaryResponse.json();
            setDietaryPrefs(dietaryData);
          }
        }

        // 4) Fetch ingredients
        if (recipeData.ingredients?.length) {
          const ids = recipeData.ingredients.map((x) =>
            typeof x === "string" ? x : x.$oid
          );

          const ingredientsResponse = await fetch(
            "http://localhost:5000/api/ingredients/many",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ids }),
            }
          );

          if (ingredientsResponse.ok) {
            const ingredientsData = await ingredientsResponse.json();
            setIngredients(ingredientsData);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, []);

  // Function to pass to RecipeReviews for handling successful submission
  const handleReviewSubmitted = () => {
    showSuccessNotification("Review submitted successfully!");
  };

  if (loading) return <div className="page-loading">Loading recipe...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;
  if (!recipe) return <div className="page-error">Recipe not found</div>;

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#fdf6e3", padding: "0" }}
      className="recipe-page"
    >
      {/* Success Notification */}
      {showNotification && (
        <div className="notification-box">
          <div className="notification-content">
            <span className="notification-icon">✓</span>
            <span className="notification-text">{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        style={{
          margin: "0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 50px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        className="top-header"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={bgLogo}
            alt="Chef Cap"
            style={{ width: "45px", marginRight: "10px" }}
          />

          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#4B2E2E",
              margin: 0,
            }}
          >
            CooKar
          </h1>
        </div>
      </header>

      {/* <div style={{ padding: "30px 0px"}}>
        <a href="/recipes" className="back-btn">
          ← Back to Recipes
        </a>
      </div> */}
      <div style={{ margin: "0px 55px" }}>
        <div className="back-btn-block">
          <a href="/recipes" className="back-btn">
            ← Back to Recipes
          </a>
        </div>

        {/* Two-column layout */}
        <div className="content-layout">
          {/* LEFT COLUMN */}
          <div className="left-column">
            {/* Full-width hero image */}
            <div className="hero-image-container">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="hero-image"
              />
            </div>

            {/* Title */}
            {/* Title in a box */}
            <div className="recipe-title-box">
              <h2 className="recipe-title-new">{recipe.title}</h2>
            </div>
            {/* <h2 className="recipe-title-new">{recipe.title}</h2> */}

            {/* Tags */}
            {/* <div className="tag-list">
              {recipe.tags?.map((tag, i) => (
                <span key={i} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div> */}

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-box">
                <h4>{recipe.servings || "-"}</h4>
                <p>Servings</p>
              </div>

             

              <div className="stat-box">
                <h4>{recipe.rating.toFixed(1)}</h4>
                <p>Rating</p>
              </div>

              <div className="stat-box">
                <h4>{recipe.comments_count}</h4>
                <p>Reviews</p>
              </div>
            </div>

            {/* Instructions */}
            <section className="instructions-section-new">
              <div className="instruction-step-card">
                <h3>Cooking Instructions</h3>
                <div className="instruction-steps">
                  {recipe.summary || recipe.instructions ? (
                    recipe.summary
                      .split(/\d*\.\s/) // Split by numbers like "1. ", "2. "
                      .filter((step) => step.trim() !== "")
                      .map((step, index) => (
                        <div key={index} className="step-row">
                          <div className="step-number">{index + 1}</div>
                          <p className="step-text">{step.trim()}</p>
                        </div>
                      ))
                  ) : (
                    //   <div className="instruction-step-card">
                    //   <div className="step-number">1</div>
                    //   <p>{stripHtmlTags(recipe.summary || recipe.instructions)}</p>
                    // </div>
                    <p>No instructions available.</p>
                  )}
                </div>
              </div>
            </section>

            {/* Cuisines */}
            <section className="generic-section-new">
              <div className="generic-box">
                <h3>Cuisines</h3>
                <div className="generic-tag-list">
                  {cuisines.length > 0 ? (
                    cuisines.map((c) => (
                      // <div
                      //   key={c._id?.$oid || c._id}
                      //   href={`/cuisines/${encodeURIComponent(c.name)}`}
                      //   className="cuisine-pill"
                      // >
                      <div
                        key={c._id?.$oid || c._id}
                        style={{
                          backgroundColor: "#e2e1e1ff",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#000",
                          border: "1px solid #868686",
                        }}
                      >
                        {c.name}
                      </div>

                      // </div>
                    ))
                  ) : (
                    <span>No cuisines available.</span>
                  )}
                </div>
              </div>
            </section>

            {/* Dietary Preferences ✅ */}
            <section className="generic-section-new">
              <div className="generic-box">
                <h3>Dietary Preferences</h3>
                <div className="generic-tag-list">
                  {recipe.dietaryNames?.length > 0 ? (
                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      {recipe.dietaryNames.map((diet, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: "#e2e1e1ff",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#000",
                            border: "1px solid #868686",
                          }}
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "#777", margin: 0 }}>None specified</p>
                  )}
                </div>
              </div>
            </section>

            {/* Reviews - Pass the success handler */}
            <RecipeReviews 
              recipe={recipe} 
              onReviewSubmitted={handleReviewSubmitted}
            />
          </div>

          {/* RIGHT COLUMN (INGREDIENTS) */}
          <aside className="right-column ingredients-wrapper">
            <div className="ingredients-box-new">
              <h3>Ingredients</h3>

              <div className="ingredient-list">
                {ingredients.length > 0 ? (
                  ingredients.map((ing, i) => (
                    <div key={i} className="ingredient-row">
                      <span className="ing-name">{ing.name}</span>
                      <span className="ing-qty">
                        {ing.quantity || ""} {ing.unit || ""}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No ingredients found.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Add CSS for notification */}
      <style jsx="true">{`
        .notification-box {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #4CAF50;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
          max-width: 300px;
        }
        
        .notification-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .notification-icon {
          font-size: 18px;
          font-weight: bold;
        }
        
        .notification-text {
          font-size: 14px;
          font-weight: 500;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RecipeFinder;
import React, { useState, useEffect } from 'react';
import './recipespages.css';

const RecipeFinder = () => {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Extract recipe title from URL
  const getRecipeTitleFromUrl = () => {
    const path = window.location.pathname;
    const parts = path.split('/');
    return decodeURIComponent(parts[parts.length - 1]) || 'Spicy Black-Eyed Pea Curry with Swiss Chard and Roasted Eggplant';  // <-- title from URL
  };

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setLoading(true);
        const recipeTitle = getRecipeTitleFromUrl();

        // ---- 1) FETCH RECIPE BY TITLE ----
        const recipeResponse = await fetch(
          `http://localhost:5000/api/recipes/${encodeURIComponent(recipeTitle)}`
        );

        if (!recipeResponse.ok) throw new Error("Failed to fetch recipe");

        const recipeData = await recipeResponse.json();

        // ⭐ ADD THIS HERE ⭐
        console.log("Ingredients from recipe:", recipeData.ingredients);
        setRecipe(recipeData);
        setIsFavorite(recipeData.is_favorite || false);
 // ---- 2) FETCH INGREDIENT DETAILS ----
      if (recipeData.ingredients && recipeData.ingredients.length > 0) {
        
        // Normalize IDs whether string or {$oid: "..."}
        const ids = recipeData.ingredients.map(item =>
          typeof item === "string" ? item : item.$oid
        );

        console.log("Extracted IDs:", ids);

        // Fetch ingredients
        const ingredientsResponse = await fetch(
          "http://localhost:5000/api/ingredients/many",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids })
          }
        );

          if (!ingredientsResponse.ok) throw new Error("Failed to fetch ingredients");

          const ingredientsData = await ingredientsResponse.json();
          setIngredients(ingredientsData);
        } else {
          setIngredients([]);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, []);

  // Toggle favorite
  const toggleFavorite = async () => {
    try {
      if (!recipe) return;

      const recipeTitle = recipe.title; // <-- Use title

      const response = await fetch(
        `http://localhost:5000/api/recipes/${encodeURIComponent(recipeTitle)}/favorite`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_favorite: !isFavorite }),
        }
      );

      if (response.ok) {
        setIsFavorite(!isFavorite);
        setRecipe(prev =>
          prev ? { ...prev, is_favorite: !isFavorite } : null
        );
      }
    } catch (err) {
      console.error("Error updating favorite:", err);
    }
  };

  if (loading) return <div className="recipe-finder"><div className="loading">Loading recipe...</div></div>;
  if (error) return <div className="recipe-finder"><div className="error">Error: {error}</div></div>;
  if (!recipe) return <div className="recipe-finder"><div className="error">Recipe not found</div></div>;

  return (
    <div className="recipe-finder">
      <header className="recipe-header">
        <h1>Recipe Finder</h1>
        <nav className="breadcrumb">
          <a href="/recipes" className="back-link">← Back to Recipes</a>
        </nav>
      </header>

      <div className="recipe-actions">
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '★ Added to Favorites' : '☆ Add to Favorites'}
        </button>
      </div>

      <div className="recipe-content">
        <section className="recipe-header-section">
          <h2 className="recipe-title">{recipe.title}</h2>
        </section>

        <section className="instructions-section">
          <h3>Instructions</h3>
          <p>{recipe.summary || "No instructions available."}</p>
        </section>

        <section className="ingredients-section">
          <h3>Ingredients</h3>
          <table className="ingredients-table">
            <tbody>
              {ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td>{ingredient.name}</td>
                    <td>
                      {ingredient.quantity || ''}
                      {ingredient.unit ? ` ${ingredient.unit}` : ''}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="2">No ingredients found for this recipe.</td></tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default RecipeFinder;

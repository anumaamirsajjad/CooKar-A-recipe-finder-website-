import React, { useState, useEffect } from 'react';
import './recipespages.css';

const RecipeFinder = () => {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Extract recipe name from URL or use default
  const getRecipeNameFromUrl = () => {
    const path = window.location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1] || 'Spicy Black-Eyed Pea Curry with Swiss Chard and Roasted Eggplant';
  };

  // Fetch recipe data
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setLoading(true);
        const recipeName = getRecipeNameFromUrl();
        
        // Fetch recipe details
        const recipeResponse = await fetch(`http://localhost:5000/api/recipes/${encodeURIComponent(recipeName)}`);
        if (!recipeResponse.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const recipeData = await recipeResponse.json();
        setRecipe(recipeData);
        setIsFavorite(recipeData.is_favorite || false);

        // Fetch all ingredients
        const ingredientsResponse = await fetch('http://localhost:5000/api/ingredients');
        if (!ingredientsResponse.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        const ingredientsData = await ingredientsResponse.json();
        setIngredients(ingredientsData);

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
      const titleOrName = recipe.title || recipe.name;

      const response = await fetch(`http://localhost:5000/api/recipes/${encodeURIComponent(titleOrName)}/favorite`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_favorite: !isFavorite }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        setRecipe(prev => prev ? { ...prev, is_favorite: !isFavorite } : null);
      }
    } catch (err) {
      console.error('Error updating favorite:', err);
    }
  };

  // Filter ingredients for this recipe
  const getRecipeIngredients = () => {
    if (!recipe || !recipe.ingredient_names || !ingredients.length) return [];
    return ingredients.filter(ingredient => 
      recipe.ingredient_names.includes(ingredient.name)
    );
  };

  if (loading) return <div className="recipe-finder"><div className="loading">Loading recipe...</div></div>;
  if (error) return <div className="recipe-finder"><div className="error">Error: {error}</div></div>;
  if (!recipe) return <div className="recipe-finder"><div className="error">Recipe not found</div></div>;

  const recipeIngredients = getRecipeIngredients();

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
        {recipe.video_url && (
          <a 
            href={recipe.video_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="video-btn"
          >
            ▶ Video
          </a>
        )}
      </div>

      <div className="recipe-content">
        <section className="recipe-header-section">
          <h2 className="recipe-title">{recipe.title || recipe.name}</h2>
          <div className="recipe-tags">
            {recipe.categories && recipe.categories.map((category, index) => (
              <span key={index} className={`tag ${category.toLowerCase().replace(' ', '-')}`}>
                {category}
              </span>
            ))}
          </div>
        </section>

        <section className="instructions-section">
          <h3>Instructions</h3>
          <div className="instruction-step">
            <p>{recipe.summary || "No instructions available."}</p>
          </div>
        </section>

        <section className="ingredients-section">
          <h3>Ingredients</h3>
          <table className="ingredients-table">
            <tbody>
              {recipeIngredients.length > 0 ? (
                recipeIngredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.quantity || ''}{ingredient.unit ? ` ${ingredient.unit}` : ''}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="2">No ingredients found for this recipe.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        {recipe.related_recipes && recipe.related_recipes.length > 0 && (
          <section className="related-recipes">
            <h3>Related Recipes</h3>
            {recipe.related_recipes.map((relatedRecipe, index) => (
              <div key={index} className="related-recipe-item">
                {typeof relatedRecipe === 'object' ? relatedRecipe.title || relatedRecipe.name : relatedRecipe}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default RecipeFinder;

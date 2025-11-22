import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeFinder = () => {
  const { title } = useParams(); // recipe title from URL
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setLoading(true);

        // ---- 1) FETCH RECIPE BY TITLE ----
        const recipeResponse = await fetch(
          `http://localhost:5000/api/recipes/${encodeURIComponent(title)}`
        );
        if (!recipeResponse.ok) throw new Error("Failed to fetch recipe");
        const recipeData = await recipeResponse.json();

        setRecipe(recipeData);
        setIsFavorite(recipeData.is_favorite || false);

        // ---- 2) FETCH INGREDIENT DETAILS ----
        if (recipeData.ingredients && recipeData.ingredients.length > 0) {
          const ids = recipeData.ingredients.map(item =>
            typeof item === "string" ? item : item.$oid
          );

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
  }, [title]);

  // ---- Toggle favorite ----
  const toggleFavorite = async () => {
    try {
      if (!recipe) return;

      const response = await fetch(
        `http://localhost:5000/api/recipes/${encodeURIComponent(recipe.title)}/favorite`,
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

  // ---- Render States ----
  if (loading) return <div style={{ textAlign: 'center' }}>Loading recipe...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  if (!recipe) return <div style={{ textAlign: 'center', color: 'red' }}>Recipe not found</div>;

  return (
    <div style={{ padding: '40px', backgroundColor: '#fdf6e3', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#4B2E2E' }}>Recipe Finder</h1>
        <nav style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link to="/" style={{ color: '#4B2E2E', textDecoration: 'none' }}>← Back to Recipes</Link>
        </nav>
      </header>

      {/* Favorite Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={toggleFavorite}
          style={{
            padding: '10px 20px',
            backgroundColor: isFavorite ? '#FFD700' : '#4B2E2E',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          {isFavorite ? '★ Added to Favorites' : '☆ Add to Favorites'}
        </button>
      </div>

      {/* Recipe Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        {/* Title + Summary */}
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#4B2E2E' }}>{recipe.title}</h2>
          <p>{recipe.summary || "No instructions available."}</p>
        </section>

        {/* Ingredients */}
        <section>
          <h3 style={{ color: '#4B2E2E' }}>Ingredients</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{ingredient.name}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                      {ingredient.quantity || ''} {ingredient.unit || ''}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="2" style={{ textAlign: 'center', padding: '8px' }}>No ingredients found.</td></tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default RecipeFinder;
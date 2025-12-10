// RecipeFinder.jsx (SOLID Refactored)
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecipeDetails } from './hooks/useRecipeDetails';
import { FavoriteButton } from './components/FavoriteButton';
import { IngredientsTable } from './components/IngredientsTable';

export default function RecipeFinder() {
  const { title } = useParams();
  const { recipe, ingredients, loading, error, isFavorite, toggleFavorite } = useRecipeDetails(title);

  if (loading) return <div style={{ textAlign: 'center' }}>Loading recipe...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  if (!recipe) return <div style={{ textAlign: 'center', color: 'red' }}>Recipe not found</div>;

  return (
    <div style={{ padding: '40px', backgroundColor: '#fdf6e3', minHeight: '100vh' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#4B2E2E' }}>Recipe Finder</h1>
        <nav style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link to="/" style={{ color: '#4B2E2E', textDecoration: 'none' }}>← Back to Recipes</Link>
        </nav>
      </header>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <FavoriteButton isFavorite={isFavorite} onToggle={toggleFavorite} />
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#4B2E2E' }}>{recipe.title}</h2>
          <p>{recipe.summary || 'No instructions available.'}</p>
        </section>

        <section>
          <h3 style={{ color: '#4B2E2E' }}>Ingredients</h3>
          <IngredientsTable ingredients={ingredients} />
        </section>
      </div>
    </div>
  );
}

// FavoriteButton.jsx
export function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      onClick={onToggle}
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
  );
}

// IngredientsTable.jsx
export function IngredientsTable({ ingredients }) {
  return (
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
          <tr>
            <td colSpan="2" style={{ textAlign: 'center', padding: '8px' }}>No ingredients found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

// hooks/useRecipeDetails.js
import { useState, useEffect } from 'react';
import { recipeService } from '../services/recipeService';

export function useRecipeDetails(title) {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const recipeData = await recipeService.getRecipeByTitle(title);
        setRecipe(recipeData);
        setIsFavorite(recipeData.is_favorite || false);

        if (recipeData.ingredients?.length > 0) {
          const ingData = await recipeService.getIngredients(recipeData.ingredients);
          setIngredients(ingData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [title]);

  async function toggleFavorite() {
    if (!recipe) return;

    const updated = await recipeService.updateFavorite(recipe.title, !isFavorite);
    if (updated) {
      setIsFavorite(!isFavorite);
      setRecipe(prev => ({ ...prev, is_favorite: !isFavorite }));
    }
  }

  return { recipe, ingredients, loading, error, isFavorite, toggleFavorite };
}

// services/recipeService.js
export const recipeService = {
  async getRecipeByTitle(title) {
    const res = await fetch(`http://localhost:5000/api/recipes/${encodeURIComponent(title)}`);
    if (!res.ok) throw new Error('Failed to fetch recipe');
    return res.json();
  },

  async getIngredients(ids) {
    const normalized = ids.map(item => (typeof item === 'string' ? item : item.$oid));

    const res = await fetch('http://localhost:5000/api/ingredients/many', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: normalized }),
    });

    if (!res.ok) throw new Error('Failed to fetch ingredients');
    return res.json();
  },

  async updateFavorite(title, isFavorite) {
    const res = await fetch(`http://localhost:5000/api/recipes/${encodeURIComponent(title)}/favorite`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_favorite: isFavorite }),
    });

    return res.ok;
  }
};

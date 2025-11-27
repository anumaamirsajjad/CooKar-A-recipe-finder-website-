// // RecipeFinder.jsx (Redesigned Layout)
// import React, { useState, useEffect } from 'react';
// import './recipespages.css';
// import RecipeReviews from './RecipeReviews';

// const RecipeFinder = () => {
//   const [recipe, setRecipe] = useState(null);
//   const [ingredients, setIngredients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cuisines, setCuisines] = useState([]);

//   // Extract title from URL
//   const getRecipeTitleFromUrl = () => {
//     const parts = window.location.pathname.split('/');
//     return decodeURIComponent(parts[parts.length - 1]) || 'Spicy Black-Eyed Pea Curry with Swiss Chard and Roasted Eggplant';
//   };

//   useEffect(() => {
//     const fetchRecipeData = async () => {
//       try {
//         setLoading(true);
//         const recipeTitle = getRecipeTitleFromUrl();

//         // 1) Fetch recipe
//         const recipeResponse = await fetch(
//           `http://localhost:5000/api/recipes/${encodeURIComponent(recipeTitle)}`
//         );
//         if (!recipeResponse.ok) throw new Error("Failed to fetch recipe");
//         const recipeData = await recipeResponse.json();

//         let ratingData = { rating: 0, reviews_count: 0 };
//         const rawId = recipeData._id;
//         const recipeId =
//           typeof rawId === "string" ? rawId : rawId?.$oid ? rawId.$oid : null;

//         if (recipeId) {
//           const ratingResponse = await fetch(
//             `http://localhost:5000/api/ratings/${recipeId}`
//           );
//           if (ratingResponse.ok) ratingData = await ratingResponse.json();
//         }

//         // 2) Fetch comments count
//         let commentsData = { comments_count: 0 };
//         if (recipeId) {
//           const commentsResponse = await fetch(
//             `http://localhost:5000/api/comments/count/${recipeId}`
//           );
//           if (commentsResponse.ok) commentsData = await commentsResponse.json();
//         }

//         const fullRecipe = {
//           ...recipeData,
//           rating: ratingData.rating || 0,
//           reviews_count: ratingData.reviews_count || 0,
//           comments_count: commentsData.comments_count || 0
//         };

//         setRecipe(fullRecipe);
// //copy this for dietary preference
//         // 3) Fetch cuisines
//         if (recipeData.cuisine_ids?.length) {
//           const cuisineIds = recipeData.cuisine_ids.map(x =>
//             x.$oid ? x.$oid : x
//           );

//           const cuisinesResponse = await fetch(
//             "http://localhost:5000/api/cuisines/many",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ ids: cuisineIds })
//             }
//           );

//           if (cuisinesResponse.ok) {
//             const cuisinesData = await cuisinesResponse.json();
//             setCuisines(cuisinesData);
//           }
//         }

//         // 4) Fetch ingredients
//         if (recipeData.ingredients?.length) {
//           const ids = recipeData.ingredients.map(x =>
//             typeof x === "string" ? x : x.$oid
//           );

//           const ingredientsResponse = await fetch(
//             "http://localhost:5000/api/ingredients/many",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ ids })
//             }
//           );

//           if (ingredientsResponse.ok) {
//             const ingredientsData = await ingredientsResponse.json();
//             setIngredients(ingredientsData);
//           }
//         }

//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipeData();
//   }, []);

//   if (loading)
//     return <div className="page-loading">Loading recipe...</div>;
//   if (error)
//     return <div className="page-error">Error: {error}</div>;
//   if (!recipe)
//     return <div className="page-error">Recipe not found</div>;

//   return (
//     <div className="recipe-page">

//       {/* Header */}
//       <header className="top-header">
//         <h1>Recipe Finder</h1>
//         <a href="/recipes" className="back-btn">← Back to Recipes</a>
//       </header>

//       {/* Full-width hero image */}
//       <div className="hero-image-container">
//         <img
//           src={recipe.image}
//           alt={recipe.title}
//           className="hero-image"
//         />
//       </div>

//       {/* Two-column layout */}
//       <div className="content-layout">

//         {/* LEFT COLUMN */}
//         <div className="left-column">

//           {/* Title */}
//           <h2 className="recipe-title-new">{recipe.title}</h2>

//           {/* Tags */}
//           <div className="tag-list">
//             {recipe.tags?.map((tag, i) => (
//               <span key={i} className="tag-pill">{tag}</span>
//             ))}
//           </div>

//           {/* Stats */}
//           <div className="stats-grid">
//             <div className="stat-box">
//               <h4>{recipe.servings || "-"}</h4>
//               <p>Servings</p>
//             </div>

//             <div className="stat-box">
//               <h4>{recipe.calories || 0}</h4>
//               <p>Calories</p>
//             </div>

//             <div className="stat-box">
//               <h4>{recipe.rating.toFixed(1)}</h4>
//               <p>Rating</p>
//             </div>

//             <div className="stat-box">
//               <h4>{recipe.comments_count}</h4>
//               <p>Reviews</p>
//             </div>
//           </div>

//           {/* Instructions */}
//           <section className="instructions-section-new">
//             <h3>Cooking Instructions</h3>

//             {recipe.summary ? (
//               <div className="instruction-step-card">
//                 <div className="step-number">1</div>
//                 <p>{recipe.summary}</p>
//               </div>
//             ) : (
//               <p>No instructions available.</p>
//             )}
//           </section>

//           {/* Cuisines */}
//           <section className="cuisine-section-new">
//             <h3>Cuisines</h3>
//             <div className="cuisine-tag-list">
//               {cuisines.length > 0 ? (
//                 cuisines.map(c => (
//                   <a
//                     key={c._id?.$oid || c._id}
//                     href={`/cuisines/${encodeURIComponent(c.name)}`}
//                     className="cuisine-pill"
//                   >
//                     {c.name}
//                   </a>
//                 ))
//               ) : (
//                 <span>No cuisines available.</span>
//               )}
//             </div>
//           </section>

//           {/* Reviews */}
//           <RecipeReviews recipe={recipe} />

//         </div>

//         {/* RIGHT COLUMN (INGREDIENTS) */}
//         <aside className="right-column">
//           <div className="ingredients-box-new">
//             <h3>Ingredients</h3>

//             <div className="ingredient-list">
//               {ingredients.length > 0 ? (
//                 ingredients.map((ing, i) => (
//                   <div key={i} className="ingredient-row">
//                     <span className="ing-name">{ing.name}</span>
//                     <span className="ing-qty">
//                       {ing.quantity || ''} {ing.unit || ''}
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <p>No ingredients found.</p>
//               )}
//             </div>

//           </div>
//         </aside>

//       </div>
//     </div>
//   );
// };

// export default RecipeFinder;
// RecipeFinder.jsx (Redesigned Layout)
import React, { useState, useEffect } from 'react';
import './recipespages.css';
import RecipeReviews from './RecipeReviews';

const RecipeFinder = () => {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [dietaryPrefs, setDietaryPrefs] = useState([]); // ✅ new state

  // Extract title from URL
  const getRecipeTitleFromUrl = () => {
    const parts = window.location.pathname.split('/');
    return decodeURIComponent(parts[parts.length - 1]) || 'Spicy Black-Eyed Pea Curry with Swiss Chard and Roasted Eggplant';
  };

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
          comments_count: commentsData.comments_count || 0
        };

        setRecipe(fullRecipe);

        // 3) Fetch cuisines
        if (recipeData.cuisine_ids?.length) {
          const cuisineIds = recipeData.cuisine_ids.map(x =>
            x.$oid ? x.$oid : x
          );

          const cuisinesResponse = await fetch(
            "http://localhost:5000/api/cuisines/many",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ids: cuisineIds })
            }
          );

          if (cuisinesResponse.ok) {
            const cuisinesData = await cuisinesResponse.json();
            setCuisines(cuisinesData);
          }
        }

        // 3b) Fetch dietary preferences ✅
        if (recipeData.dietary_ids?.length) {
          const dietaryIds = recipeData.dietary_ids.map(x =>
            x.$oid ? x.$oid : x
          );

          const dietaryResponse = await fetch(
            "http://localhost:5000/api/dietary-preferences/many",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ids: dietaryIds })
            }
          );

          if (dietaryResponse.ok) {
            const dietaryData = await dietaryResponse.json();
            setDietaryPrefs(dietaryData);
          }
        }

        // 4) Fetch ingredients
        if (recipeData.ingredients?.length) {
          const ids = recipeData.ingredients.map(x =>
            typeof x === "string" ? x : x.$oid
          );

          const ingredientsResponse = await fetch(
            "http://localhost:5000/api/ingredients/many",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ids })
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

  if (loading)
    return <div className="page-loading">Loading recipe...</div>;
  if (error)
    return <div className="page-error">Error: {error}</div>;
  if (!recipe)
    return <div className="page-error">Recipe not found</div>;

  return (
    <div className="recipe-page">

      {/* Header */}
      <header className="top-header">
        <h1>Recipe Finder</h1>
        <a href="/recipes" className="back-btn">← Back to Recipes</a>
      </header>

      {/* Full-width hero image */}
      <div className="hero-image-container">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="hero-image"
        />
      </div>

      {/* Two-column layout */}
      <div className="content-layout">

        {/* LEFT COLUMN */}
        <div className="left-column">

          {/* Title */}
          <h2 className="recipe-title-new">{recipe.title}</h2>

          {/* Tags */}
          <div className="tag-list">
            {recipe.tags?.map((tag, i) => (
              <span key={i} className="tag-pill">{tag}</span>
            ))}
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-box">
              <h4>{recipe.servings || "-"}</h4>
              <p>Servings</p>
            </div>

            <div className="stat-box">
              <h4>{recipe.calories || 0}</h4>
              <p>Calories</p>
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
            <h3>Cooking Instructions</h3>

            {recipe.summary ? (
              <div className="instruction-step-card">
                <div className="step-number">1</div>
                <p>{recipe.summary}</p>
              </div>
            ) : (
              <p>No instructions available.</p>
            )}
          </section>

          {/* Cuisines */}
          <section className="cuisine-section-new">
            <h3>Cuisines</h3>
            <div className="cuisine-tag-list">
              {cuisines.length > 0 ? (
                cuisines.map(c => (
                  <a
                    key={c._id?.$oid || c._id}
                    href={`/cuisines/${encodeURIComponent(c.name)}`}
                    className="cuisine-pill"
                  >
                    {c.name}
                  </a>
                ))
              ) : (
                <span>No cuisines available.</span>
              )}
            </div>
          </section>

          {/* Dietary Preferences ✅ */}
          <section className="dietary-section-new">
            <h3>Dietary Preferences</h3>
            <div className="dietary-tag-list">
              {dietaryPrefs.length > 0 ? (
                dietaryPrefs.map(d => (
                  <a
                    key={d._id?.$oid || d._id}
                    href={`/dietary/${encodeURIComponent(d.name)}`}
                    className="dietary-pill"
                  >
                    {d.name}
                  </a>
                ))
              ) : (
                <span>No dietary preferences available.</span>
              )}
            </div>
          </section>

          {/* Reviews */}
          <RecipeReviews recipe={recipe} />

        </div>

        {/* RIGHT COLUMN (INGREDIENTS) */}
        <aside className="right-column">
          <div className="ingredients-box-new">
            <h3>Ingredients</h3>

            <div className="ingredient-list">
              {ingredients.length > 0 ? (
                ingredients.map((ing, i) => (
                  <div key={i} className="ingredient-row">
                    <span className="ing-name">{ing.name}</span>
                    <span className="ing-qty">
                      {ing.quantity || ''} {ing.unit || ''}
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
  );
};

export default RecipeFinder;
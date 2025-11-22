// import React from 'react';

// const MainPage = () => {
//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         width: '100%',
//         backgroundColor: '#fdf6e3', // Cream light brown
//         padding: '40px',
//         boxSizing: 'border-box',
//       }}
//     >
//       {/* Cookar Title */}
//       <h1
//         style={{
//           fontSize: '64px',
//           fontWeight: 'bold',
//           color: '#4B2E2E', // Coffee brown
//           textAlign: 'center',
//           marginBottom: '40px',
//           letterSpacing: '1px',
//         }}
//       >
//         Cookar
//       </h1>

//       {/* White Box Container */}
//       <div
//         style={{
//           maxWidth: '800px',
//           margin: '0 auto',
//           backgroundColor: '#fff',
//           padding: '30px',
//           borderRadius: '16px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//         }}
//       >
//         {/* Search Bar + Button */}
//         <div
//           style={{
//             display: 'flex',
//             gap: '16px',
//             marginBottom: '30px',
//             flexWrap: 'wrap',
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Search recipes by name or ingredient..."
//             style={{
//               flex: '1 1 300px',
//               padding: '14px 18px',
//               fontSize: '16px',
//               borderRadius: '8px',
//               border: '1px solid #ccc',
//               backgroundColor: '#fff',
//             }}
//           />
//           <button
//             style={{
//               padding: '14px 24px',
//               backgroundColor: '#4B2E2E',
//               color: '#fff',
//               fontWeight: '600',
//               borderRadius: '8px',
//               border: 'none',
//               cursor: 'pointer',
//             }}
//           >
//             Search
//           </button>
//         </div>

//         {/* Dropdowns Side-by-Side */}
//         <div
//           style={{
//             display: 'flex',
//             gap: '24px',
//             flexWrap: 'wrap',
//           }}
//         >
//           {/* Dietary Preference */}
//           <div style={{ flex: '1 1 300px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4B2E2E' }}>
//               Dietary Preference
//             </label>
//             <select
//               style={{
//                 width: '100%',
//                 padding: '12px 16px',
//                 borderRadius: '8px',
//                 border: '1px solid #ccc',
//                 fontSize: '16px',
//                 backgroundColor: '#fff',
//               }}
//             >
//               <option>All Preferences</option>
//               <option>Vegetarian</option>
//               <option>Beef</option>
//               <option>Mutton</option>
//               <option>Chicken</option>
//             </select>
//           </div>

//           {/* Cuisine */}
//           <div style={{ flex: '1 1 300px' }}>
//             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4B2E2E' }}>
//               Cuisine
//             </label>
//             <select
//               style={{
//                 width: '100%',
//                 padding: '12px 16px',
//                 borderRadius: '8px',
//                 border: '1px solid #ccc',
//                 fontSize: '16px',
//                 backgroundColor: '#fff',
//               }}
//             >
//               <option>All Cuisines</option>
//               <option>Pashto</option>
//               <option>Balochi</option>
//               <option>Sindhi</option>
//               <option>Punjabi</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainPage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const [cuisines, setCuisines] = useState([]);
  const [dietaryPrefs, setDietaryPrefs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedDietary, setSelectedDietary] = useState("");

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [cuisineRes, dietaryRes] = await Promise.all([
          fetch("http://localhost:5000/api/cuisines"),
          fetch("http://localhost:5000/api/dietary-preferences"),
        ]);
        const cuisineData = await cuisineRes.json();
        const dietaryData = await dietaryRes.json();

        setCuisines(Array.isArray(cuisineData) ? cuisineData.map(c => c.name) : []);
        setDietaryPrefs(Array.isArray(dietaryData) ? dietaryData.map(d => d.name) : []);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };

    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes");
        const data = await res.json();

        if (Array.isArray(data)) {
          setRecipes(data);
        } else if (data.recipes && Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchFilters();
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = searchTerm
      ? recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients?.some(ing =>
          (ing.name || ing).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    const matchesCuisine = selectedCuisine
      ? recipe.cuisine_ids?.includes(selectedCuisine)
      : true;

    const matchesDietary = selectedDietary
      ? recipe.diet_ids?.includes(selectedDietary)
      : true;

    return matchesSearch && matchesCuisine && matchesDietary;
  });

  return (
    <div style={{ minHeight: "100vh", width: "100%", backgroundColor: "#fdf6e3", padding: "40px" }}>
      <h1 style={{ fontSize: "64px", fontWeight: "bold", color: "#4B2E2E", textAlign: "center", marginBottom: "40px" }}>
        Cookar
      </h1>

      {/* Filter Box */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        {/* Search */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "30px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search recipes by name or ingredient..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              flex: "1 1 300px",
              padding: "14px 18px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#fff"
            }}
          />
          <button style={{
            padding: "14px 24px",
            backgroundColor: "#4B2E2E",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}>
            Search
          </button>
        </div>

        {/* Dropdowns */}
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#4B2E2E" }}>
              Dietary Preference
            </label>
            <select
              value={selectedDietary}
              onChange={e => setSelectedDietary(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
                backgroundColor: "#fff"
              }}
            >
              <option value="">All Preferences</option>
              {dietaryPrefs.map((diet, idx) => (
                <option key={idx} value={diet}>{diet}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: "1 1 300px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#4B2E2E" }}>
              Cuisine
            </label>
            <select
              value={selectedCuisine}
              onChange={e => setSelectedCuisine(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
                backgroundColor: "#fff"
              }}
            >
              <option value="">All Cuisines</option>
              {cuisines.map((cuisine, idx) => (
                <option key={idx} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Recipe Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "30px",
        marginTop: "40px"
      }}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, idx) => (
            <Link
              key={idx}
              to={`/recipes/${encodeURIComponent(recipe.title)}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden",
                cursor: "pointer"
              }}>
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title || `Recipe ${recipe.recipeId || idx}`}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                )}
                <div style={{ padding: "20px" }}>
                  <h2 style={{ margin: "0 0 10px", color: "#4B2E2E" }}>
                    {recipe.title || `Recipe #${recipe.recipeId}`}
                  </h2>

                  <div style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
                    {"⭐".repeat(Math.round(recipe.rating || 4))}{" "}
                    {Number(recipe.rating || 4).toFixed(1)} ({recipe.reviews || 0} reviews)
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    fontSize: "14px"
                  }}>
                    <span>🍽️ {recipe.serving_size || recipe.servings || "N/A"} servings</span>
                    {recipe.nutrition?.nutrients?.find(n => n.name === "Calories") && (
                      <span>
                        🔥 {recipe.nutrition.nutrients.find(n => n.name === "Calories").amount}{" "}
                        {recipe.nutrition.nutrients.find(n => n.name === "Calories").unit}
                      </span>
                    )}
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    {(recipe.tags || []).map((tag, i) => (
                      <span key={i} style={{
                        display: "inline-block",
                        backgroundColor: "#eee",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        marginRight: "5px",
                        fontSize: "12px"
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                                   {/* Key Ingredients */}
                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ marginBottom: "5px" }}>Key Ingredients:</h4>
                    <p style={{ margin: 0, color: "#555" }}>
                      {(recipe.ingredients || [])
                        .slice(0, 4) // show first 4 ingredients only
                        .map(ing =>
                          typeof ing === "string"
                            ? ing
                            : `${ing.amount || ""} ${ing.unit || ""} ${ing.name || ""}`
                        )
                        .join(", ")}
                      {recipe.ingredients?.length > 4 && " ..."}
                    </p>
                  </div>

                  {/* Method */}
                  <div style={{ marginBottom: "15px" }}>
                    <h4 style={{ marginBottom: "5px" }}>Method:</h4>
                    <p style={{ margin: 0, color: "#555" }}>
                      {(recipe.instructions || recipe.method || "No instructions provided.")
                        .split(" ")
                        .slice(0, 20) // show first 20 words only
                        .join(" ")}...
                    </p>
                  </div>

                  {/* Recent Comments */}
                  {Array.isArray(recipe.comments) && recipe.comments.length > 0 && (
                    <div style={{ marginBottom: "15px" }}>
                      <h4 style={{ marginBottom: "5px" }}>Recent Comments:</h4>
                      <p style={{ margin: 0, color: "#555" }}>
                        “{recipe.comments[0].text}” – {recipe.comments[0].author}
                        {recipe.comments.length > 1 && " ..."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default MainPage;
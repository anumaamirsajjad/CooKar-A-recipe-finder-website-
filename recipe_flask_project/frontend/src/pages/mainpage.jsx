// // // // import React from 'react';

// // // // const MainPage = () => {
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         minHeight: '100vh',
// // // //         width: '100%',
// // // //         backgroundColor: '#fdf6e3', // Cream light brown
// // // //         padding: '40px',
// // // //         boxSizing: 'border-box',
// // // //       }}
// // // //     >
// // // //       {/* Cookar Title */}
// // // //       <h1
// // // //         style={{
// // // //           fontSize: '64px',
// // // //           fontWeight: 'bold',
// // // //           color: '#4B2E2E', // Coffee brown
// // // //           textAlign: 'center',
// // // //           marginBottom: '40px',
// // // //           letterSpacing: '1px',
// // // //         }}
// // // //       >
// // // //         Cookar
// // // //       </h1>

// // // //       {/* White Box Container */}
// // // //       <div
// // // //         style={{
// // // //           maxWidth: '800px',
// // // //           margin: '0 auto',
// // // //           backgroundColor: '#fff',
// // // //           padding: '30px',
// // // //           borderRadius: '16px',
// // // //           boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
// // // //         }}
// // // //       >
// // // //         {/* Search Bar + Button */}
// // // //         <div
// // // //           style={{
// // // //             display: 'flex',
// // // //             gap: '16px',
// // // //             marginBottom: '30px',
// // // //             flexWrap: 'wrap',
// // // //           }}
// // // //         >
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search recipes by name or ingredient..."
// // // //             style={{
// // // //               flex: '1 1 300px',
// // // //               padding: '14px 18px',
// // // //               fontSize: '16px',
// // // //               borderRadius: '8px',
// // // //               border: '1px solid #ccc',
// // // //               backgroundColor: '#fff',
// // // //             }}
// // // //           />
// // // //           <button
// // // //             style={{
// // // //               padding: '14px 24px',
// // // //               backgroundColor: '#4B2E2E',
// // // //               color: '#fff',
// // // //               fontWeight: '600',
// // // //               borderRadius: '8px',
// // // //               border: 'none',
// // // //               cursor: 'pointer',
// // // //             }}
// // // //           >
// // // //             Search
// // // //           </button>
// // // //         </div>

// // // //         {/* Dropdowns Side-by-Side */}
// // // //         <div
// // // //           style={{
// // // //             display: 'flex',
// // // //             gap: '24px',
// // // //             flexWrap: 'wrap',
// // // //           }}
// // // //         >
// // // //           {/* Dietary Preference */}
// // // //           <div style={{ flex: '1 1 300px' }}>
// // // //             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4B2E2E' }}>
// // // //               Dietary Preference
// // // //             </label>
// // // //             <select
// // // //               style={{
// // // //                 width: '100%',
// // // //                 padding: '12px 16px',
// // // //                 borderRadius: '8px',
// // // //                 border: '1px solid #ccc',
// // // //                 fontSize: '16px',
// // // //                 backgroundColor: '#fff',
// // // //               }}
// // // //             >
// // // //               <option>All Preferences</option>
// // // //               <option>Vegetarian</option>
// // // //               <option>Beef</option>
// // // //               <option>Mutton</option>
// // // //               <option>Chicken</option>
// // // //             </select>
// // // //           </div>

// // // //           {/* Cuisine */}
// // // //           <div style={{ flex: '1 1 300px' }}>
// // // //             <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4B2E2E' }}>
// // // //               Cuisine
// // // //             </label>
// // // //             <select
// // // //               style={{
// // // //                 width: '100%',
// // // //                 padding: '12px 16px',
// // // //                 borderRadius: '8px',
// // // //                 border: '1px solid #ccc',
// // // //                 fontSize: '16px',
// // // //                 backgroundColor: '#fff',
// // // //               }}
// // // //             >
// // // //               <option>All Cuisines</option>
// // // //               <option>Pashto</option>
// // // //               <option>Balochi</option>
// // // //               <option>Sindhi</option>
// // // //               <option>Punjabi</option>
// // // //             </select>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MainPage;

// // // import React, { useState, useEffect } from "react";
// // // import { Link } from "react-router-dom";

// // // function MainPage() {
// // //   const [cuisines, setCuisines] = useState([]);
// // //   const [dietaryPrefs, setDietaryPrefs] = useState([]);
// // //   const [recipes, setRecipes] = useState([]);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [selectedCuisine, setSelectedCuisine] = useState("");
// // //   const [selectedDietary, setSelectedDietary] = useState("");

// // //   useEffect(() => {
// // //     const fetchFilters = async () => {
// // //       try {
// // //         const [cuisineRes, dietaryRes] = await Promise.all([
// // //           fetch("http://localhost:5000/api/cuisines"),
// // //           fetch("http://localhost:5000/api/dietary-preferences"),
// // //         ]);
// // //         const cuisineData = await cuisineRes.json();
// // //         const dietaryData = await dietaryRes.json();

// // //         setCuisines(Array.isArray(cuisineData) ? cuisineData.map(c => c.name) : []);
// // //         setDietaryPrefs(Array.isArray(dietaryData) ? dietaryData.map(d => d.name) : []);
// // //       } catch (err) {
// // //         console.error("Error fetching filters:", err);
// // //       }
// // //     };

// // //     const fetchRecipes = async () => {
// // //       try {
// // //         const res = await fetch("http://localhost:5000/api/recipes");
// // //         const data = await res.json();

// // //         if (Array.isArray(data)) {
// // //           setRecipes(data);
// // //         } else if (data.recipes && Array.isArray(data.recipes)) {
// // //           setRecipes(data.recipes);
// // //         } else {
// // //           setRecipes([]);
// // //         }
// // //       } catch (err) {
// // //         console.error("Error fetching recipes:", err);
// // //       }
// // //     };

// // //     fetchFilters();
// // //     fetchRecipes();
// // //   }, []);

// // //   const filteredRecipes = recipes.filter(recipe => {
// // //     const matchesSearch = searchTerm
// // //       ? recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         recipe.ingredients?.some(ing =>
// // //           (ing.name || ing).toLowerCase().includes(searchTerm.toLowerCase())
// // //         )
// // //       : true;

// // //     const matchesCuisine = selectedCuisine
// // //       ? recipe.cuisine_ids?.includes(selectedCuisine)
// // //       : true;

// // //     const matchesDietary = selectedDietary
// // //       ? recipe.diet_ids?.includes(selectedDietary)
// // //       : true;

// // //     return matchesSearch && matchesCuisine && matchesDietary;
// // //   });

// // //   return (
// // //     <div style={{ minHeight: "100vh", width: "100%", backgroundColor: "#fdf6e3", padding: "40px" }}>
// // //       <h1 style={{ fontSize: "64px", fontWeight: "bold", color: "#4B2E2E", textAlign: "center", marginBottom: "40px" }}>
// // //         Cookar
// // //       </h1>

// // //       {/* Filter Box */}
// // //       <div style={{
// // //         maxWidth: "800px",
// // //         margin: "0 auto",
// // //         backgroundColor: "#fff",
// // //         padding: "30px",
// // //         borderRadius: "16px",
// // //         boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
// // //       }}>
// // //         {/* Search */}
// // //         <div style={{ display: "flex", gap: "16px", marginBottom: "30px", flexWrap: "wrap" }}>
// // //           <input
// // //             type="text"
// // //             placeholder="Search recipes by name or ingredient..."
// // //             value={searchTerm}
// // //             onChange={e => setSearchTerm(e.target.value)}
// // //             style={{
// // //               flex: "1 1 300px",
// // //               padding: "14px 18px",
// // //               fontSize: "16px",
// // //               borderRadius: "8px",
// // //               border: "1px solid #ccc",
// // //               backgroundColor: "#fff"
// // //             }}
// // //           />
// // //           <button style={{
// // //             padding: "14px 24px",
// // //             backgroundColor: "#4B2E2E",
// // //             color: "#fff",
// // //             fontWeight: "600",
// // //             borderRadius: "8px",
// // //             border: "none",
// // //             cursor: "pointer"
// // //           }}>
// // //             Search
// // //           </button>
// // //         </div>

// // //         {/* Dropdowns */}
// // //         <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
// // //           <div style={{ flex: "1 1 300px" }}>
// // //             <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#4B2E2E" }}>
// // //               Dietary Preference
// // //             </label>
// // //             <select
// // //               value={selectedDietary}
// // //               onChange={e => setSelectedDietary(e.target.value)}
// // //               style={{
// // //                 width: "100%",
// // //                 padding: "12px 16px",
// // //                 borderRadius: "8px",
// // //                 border: "1px solid #ccc",
// // //                 fontSize: "16px",
// // //                 backgroundColor: "#fff"
// // //               }}
// // //             >
// // //               <option value="">All Preferences</option>
// // //               {dietaryPrefs.map((diet, idx) => (
// // //                 <option key={idx} value={diet}>{diet}</option>
// // //               ))}
// // //             </select>
// // //           </div>

// // //           <div style={{ flex: "1 1 300px" }}>
// // //             <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#4B2E2E" }}>
// // //               Cuisine
// // //             </label>
// // //             <select
// // //               value={selectedCuisine}
// // //               onChange={e => setSelectedCuisine(e.target.value)}
// // //               style={{
// // //                 width: "100%",
// // //                 padding: "12px 16px",
// // //                 borderRadius: "8px",
// // //                 border: "1px solid #ccc",
// // //                 fontSize: "16px",
// // //                 backgroundColor: "#fff"
// // //               }}
// // //             >
// // //               <option value="">All Cuisines</option>
// // //               {cuisines.map((cuisine, idx) => (
// // //                 <option key={idx} value={cuisine}>{cuisine}</option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Recipe Cards */}
// // //       <div style={{
// // //         display: "grid",
// // //         gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
// // //         gap: "30px",
// // //         marginTop: "40px"
// // //       }}>
// // //         {filteredRecipes.length > 0 ? (
// // //           filteredRecipes.map((recipe, idx) => (
// // //             <Link
// // //               key={idx}
// // //               to={`/recipes/${encodeURIComponent(recipe.title)}`}
// // //               style={{ textDecoration: "none", color: "inherit" }}
// // //             >
// // //               <div style={{
// // //                 backgroundColor: "#fff",
// // //                 borderRadius: "12px",
// // //                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// // //                 overflow: "hidden",
// // //                 cursor: "pointer"
// // //               }}>
// // //                 {recipe.image && (
// // //                   <img
// // //                     src={recipe.image}
// // //                     alt={recipe.title || `Recipe ${recipe.recipeId || idx}`}
// // //                     style={{ width: "100%", height: "200px", objectFit: "cover" }}
// // //                   />
// // //                 )}
// // //                 <div style={{ padding: "20px" }}>
// // //                   <h2 style={{ margin: "0 0 10px", color: "#4B2E2E" }}>
// // //                     {recipe.title || `Recipe #${recipe.recipeId}`}
// // //                   </h2>

// // //                   <div style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
// // //                     {"⭐".repeat(Math.round(recipe.rating || 4))}{" "}
// // //                     {Number(recipe.rating || 4).toFixed(1)} ({recipe.reviews || 0} reviews)
// // //                   </div>

// // //                   <div style={{
// // //                     display: "flex",
// // //                     justifyContent: "space-between",
// // //                     marginBottom: "10px",
// // //                     fontSize: "14px"
// // //                   }}>
// // //                     <span>🍽️ {recipe.serving_size || recipe.servings || "N/A"} servings</span>
// // //                     {recipe.nutrition?.nutrients?.find(n => n.name === "Calories") && (
// // //                       <span>
// // //                         🔥 {recipe.nutrition.nutrients.find(n => n.name === "Calories").amount}{" "}
// // //                         {recipe.nutrition.nutrients.find(n => n.name === "Calories").unit}
// // //                       </span>
// // //                     )}
// // //                   </div>

// // //                   <div style={{ marginBottom: "15px" }}>
// // //                     {(recipe.tags || []).map((tag, i) => (
// // //                       <span key={i} style={{
// // //                         display: "inline-block",
// // //                         backgroundColor: "#eee",
// // //                         padding: "5px 10px",
// // //                         borderRadius: "6px",
// // //                         marginRight: "5px",
// // //                         fontSize: "12px"
// // //                       }}>
// // //                         {tag}
// // //                       </span>
// // //                     ))}
// // //                   </div>

// // //                                    {/* Key Ingredients */}
// // //                   <div style={{ marginBottom: "15px" }}>
// // //                     <h4 style={{ marginBottom: "5px" }}>Key Ingredients:</h4>
// // //                     <p style={{ margin: 0, color: "#555" }}>
// // //                       {(recipe.ingredients || [])
// // //                         .slice(0, 4) // show first 4 ingredients only
// // //                         .map(ing =>
// // //                           typeof ing === "string"
// // //                             ? ing
// // //                             : `${ing.amount || ""} ${ing.unit || ""} ${ing.name || ""}`
// // //                         )
// // //                         .join(", ")}
// // //                       {recipe.ingredients?.length > 4 && " ..."}
// // //                     </p>
// // //                   </div>

// // //                   {/* Method */}
// // //                   <div style={{ marginBottom: "15px" }}>
// // //                     <h4 style={{ marginBottom: "5px" }}>Method:</h4>
// // //                     <p style={{ margin: 0, color: "#555" }}>
// // //                       {(recipe.instructions || recipe.method || "No instructions provided.")
// // //                         .split(" ")
// // //                         .slice(0, 20) // show first 20 words only
// // //                         .join(" ")}...
// // //                     </p>
// // //                   </div>

// // //                   {/* Recent Comments */}
// // //                   {Array.isArray(recipe.comments) && recipe.comments.length > 0 && (
// // //                     <div style={{ marginBottom: "15px" }}>
// // //                       <h4 style={{ marginBottom: "5px" }}>Recent Comments:</h4>
// // //                       <p style={{ margin: 0, color: "#555" }}>
// // //                         “{recipe.comments[0].text}” – {recipe.comments[0].author}
// // //                         {recipe.comments.length > 1 && " ..."}
// // //                       </p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </Link>
// // //           ))
// // //         ) : (
// // //           <p style={{ textAlign: "center" }}>No recipes found.</p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default MainPage;

// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";

// // function MainPage() {
// //   const [recipes, setRecipes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [cuisines, setCuisines] = useState([]);
// //   const [dietaryPrefs, setDietaryPrefs] = useState([]);
// //   const [selectedCuisine, setSelectedCuisine] = useState("");
// //   const [selectedDietary, setSelectedDietary] = useState("");

// //   useEffect(() => {
// //     const fetchFilters = async () => {
// //       try {
// //         const [cuisineRes, dietaryRes] = await Promise.all([
// //           fetch("http://localhost:5000/api/cuisines"),
// //           fetch("http://localhost:5000/api/dietary-preferences"),
// //         ]);
// //         setCuisines(await cuisineRes.json());
// //         setDietaryPrefs(await dietaryRes.json());
// //       } catch (err) {
// //         console.error("Error fetching filters:", err);
// //       }
// //     };

// //     const fetchRecipes = async () => {
// //       try {
// //         const res = await fetch("http://localhost:5000/api/recipes");
// //         const data = await res.json();
// //         setRecipes(Array.isArray(data) ? data : []);
// //       } catch (err) {
// //         console.error("Error fetching recipes:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchFilters();
// //     fetchRecipes();
// //   }, []);

// //   const filteredRecipes = recipes.filter((recipe) => {
// //     const matchesSearch = searchTerm
// //       ? recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         (recipe.ingredientNames || []).some((ing) =>
// //           ing.toLowerCase().includes(searchTerm.toLowerCase())
// //         )
// //       : true;

// //     const matchesCuisine = selectedCuisine
// //       ? (recipe.cuisineNames || []).includes(selectedCuisine)
// //       : true;

// //     const matchesDietary = selectedDietary
// //       ? (recipe.dietaryNames || []).includes(selectedDietary)
// //       : true;

// //     return matchesSearch && matchesCuisine && matchesDietary;
// //   });

// //   if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading recipes...</div>;

// //   return (
// //     <div style={{ minHeight: "100vh", backgroundColor: "#fdf6e3", padding: "40px" }}>
// //       <h1 style={{ fontSize: "64px", fontWeight: "bold", color: "#4B2E2E", textAlign: "center", marginBottom: "40px" }}>
// //         Cookar
// //       </h1>
// //       <p style={{ textAlign: "center", fontSize: "20px", color: "#666", marginBottom: "50px" }}>
// //         Discover recipes by cuisine, dietary preference, or search by ingredients.
// //       </p>

// //       {/* Search + Filters */}
// //       <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "40px" }}>
// //         <div style={{ display: "flex", gap: "16px", marginBottom: "30px", flexWrap: "wrap" }}>
// //           <input
// //             type="text"
// //             placeholder="Search recipes by name or ingredient..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             style={{ flex: "1 1 300px", padding: "14px 18px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", backgroundColor: "#fff" }}
// //           />
// //         </div>

// //         <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
// //           <div style={{ flex: "1 1 300px" }}>
// //             <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#4B2E2E" }}>Dietary Preference</label>
// //             <select
// //               value={selectedDietary}
// //               onChange={(e) => setSelectedDietary(e.target.value)}
// //               style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", backgroundColor: "#fff" }}
// //             >
// //               <option value="">All Preferences</option>
// //               {dietaryPrefs.map((diet, idx) => (
// //                 <option key={idx} value={diet.name || diet}>
// //                   {diet.name || diet}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div style={{ flex: "1 1 300px" }}>
// //             <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#4B2E2E" }}>Cuisine</label>
// //             <select
// //               value={selectedCuisine}
// //               onChange={(e) => setSelectedCuisine(e.target.value)}
// //               style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", backgroundColor: "#fff" }}
// //             >
// //               <option value="">All Cuisines</option>
// //               {cuisines.map((cuisine, idx) => (
// //                 <option key={idx} value={cuisine.name || cuisine}>
// //                   {cuisine.name || cuisine}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Recipe Cards */}
// //       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
// //         {filteredRecipes.map((recipe, idx) => (
// //           <Link
// //             key={idx}
// //             to={`/recipes/${encodeURIComponent(recipe.title)}`}
// //             style={{ textDecoration: "none", color: "inherit" }}
// //           >
// //             <div
// //               style={{
// //                 backgroundColor: "#fff",
// //                 borderRadius: "12px",
// //                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //                 overflow: "hidden",
// //                 cursor: "pointer",
// //               }}
// //             >
// //               {recipe.image && (
// //                 <img
// //                   src={recipe.image}
// //                   alt={recipe.title}
// //                   style={{ width: "100%", height: "200px", objectFit: "cover" }}
// //                 />
// //               )}
// //               <div style={{ padding: "20px" }}>
// //                 <h2 style={{ margin: "0 0 10px", color: "#4B2E2E", fontWeight: "700" }}>
// //                   {recipe.title}
// //                 </h2>

// //                 {/* Rating */}
// //                 <div style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
// //                   {"⭐".repeat(Math.round(Number(recipe.ratingAvg || 0)))}{" "}
// //                   {recipe.ratingAvg ? Number(recipe.ratingAvg).toFixed(1) : "N/A"} (
// //                   {recipe.ratingCount || 0} ratings)
// //                 </div>

// //                 {/* Cuisine + Dietary */}
// //                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px", color: "#4B2E2E" }}>
// //                   <span>🌍 {recipe.cuisineNames?.length ? recipe.cuisineNames.join(", ") : "Unknown"}</span>
// //                   <span>🥗 {recipe.dietaryNames?.length ? recipe.dietaryNames.join(", ") : "Unspecified"}</span>
// //                 </div>

// //                 {/* Key Ingredients */}
// // <div style={{ marginBottom: "15px" }}>
// //   <h4 style={{ marginBottom: "5px" }}>Key Ingredients:</h4>
// //   <p style={{ margin: 0, color: "#555" }}>
// //     {(recipe.ingredientNames || [])
// //       .slice(0, 4) // show first 4 ingredients only
// //       .join(", ")}
// //     {Array.isArray(recipe.ingredientNames) && recipe.ingredientNames.length > 4 && " ..."}
// //   </p>
// // </div>

// //                                 {/* Method */}
// //                 <div style={{ marginBottom: "15px" }}>
// //                   <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>
// //                     Method:
// //                   </h4>
// //                   <p style={{ margin: 0, color: "#555" }}>
// //                     {(recipe.instructions ||
// //                       recipe.method ||
// //                       recipe.summary ||
// //                       "No instructions provided.")
// //                       .split(" ")
// //                       .slice(0, 20)
// //                       .join(" ")}...
// //                   </p>
// //                 </div>

// //                 {/* Recent Comments */}
// //                 <div style={{ marginBottom: "15px" }}>
// //                   <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>
// //                     Recent comments:
// //                   </h4>
// //                   {Array.isArray(recipe.comments) && recipe.comments.length > 0 ? (
// //                     <p style={{ margin: 0, color: "#555" }}>
// //                       “{recipe.comments[0]}” {recipe.comments.length > 1 && " ..."}
// //                     </p>
// //                   ) : (
// //                     <p style={{ margin: 0, color: "#999" }}>No comments</p>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default MainPage;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function MainPage() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cuisines, setCuisines] = useState([]);
//   const [dietaryPrefs, setDietaryPrefs] = useState([]);
//   const [selectedCuisine, setSelectedCuisine] = useState("");
//   const [selectedDietary, setSelectedDietary] = useState("");

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/recipes");
//         if (!res.ok) throw new Error("Failed to fetch recipes");
//         const data = await res.json();

//         setRecipes(Array.isArray(data) ? data : []);

//         // ✅ Derive cuisines and dietary preferences directly from recipe data
//         const allCuisines = [...new Set(data.flatMap(r => r.cuisineNames || []))];
//         const allDietary = [...new Set(data.flatMap(r => r.dietaryNames || []))];
//         setCuisines(allCuisines.map(name => ({ name })));
//         setDietaryPrefs(allDietary.map(name => ({ name })));
//       } catch (err) {
//         console.error("Error fetching recipes:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const filteredRecipes = recipes.filter((recipe) => {
//     const matchesSearch = searchTerm
//       ? recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (recipe.ingredientNames || []).some((ing) =>
//           ing.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       : true;

//     const matchesCuisine = selectedCuisine
//       ? (recipe.cuisineNames || []).includes(selectedCuisine)
//       : true;

//     const matchesDietary = selectedDietary
//       ? (recipe.dietaryNames || []).includes(selectedDietary)
//       : true;

//     return matchesSearch && matchesCuisine && matchesDietary;
//   });

//   if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading recipes...</div>;

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#fdf6e3", padding: "40px" }}>
//       <h1 style={{ fontSize: "64px", fontWeight: "bold", color: "#4B2E2E", textAlign: "center", marginBottom: "40px" }}>
//         Cookar
//       </h1>
//       <p style={{ textAlign: "center", fontSize: "20px", color: "#666", marginBottom: "50px" }}>
//         Discover recipes by cuisine, dietary preference, or search by ingredients.
//       </p>

//       {/* Search + Filters */}
//       <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "40px" }}>
//         <div style={{ display: "flex", gap: "16px", marginBottom: "30px", flexWrap: "wrap" }}>
//           <input
//             type="text"
//             placeholder="Search recipes by name or ingredient..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ flex: "1 1 300px", padding: "14px 18px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", backgroundColor: "#fff" }}
//           />
//         </div>

//         <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
//           <div style={{ flex: "1 1 300px" }}>
//             <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#4B2E2E" }}>Dietary Preference</label>
//             <select
//               value={selectedDietary}
//               onChange={(e) => setSelectedDietary(e.target.value)}
//               style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", backgroundColor: "#fff" }}
//             >
//               <option value="">All Preferences</option>
//               {dietaryPrefs.map((diet, idx) => (
//                 <option key={idx} value={diet.name}>{diet.name}</option>
//               ))}
//             </select>
//           </div>

//           <div style={{ flex: "1 1 300px" }}>
//             <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#4B2E2E" }}>Cuisine</label>
//             <select
//               value={selectedCuisine}
//               onChange={(e) => setSelectedCuisine(e.target.value)}
//               style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", backgroundColor: "#fff" }}
//             >
//               <option value="">All Cuisines</option>
//               {cuisines.map((cuisine, idx) => (
//                 <option key={idx} value={cuisine.name}>{cuisine.name}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Recipe Cards */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
//         {filteredRecipes.map((recipe, idx) => (
//           <Link
//             key={idx}
//             to={`/recipes/${encodeURIComponent(recipe.title)}`}
//             style={{ textDecoration: "none", color: "inherit" }}
//           >
//             <div
//               style={{
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                 overflow: "hidden",
//                 cursor: "pointer",
//               }}
//             >
//               {recipe.image && (
//                 <img
//                   src={recipe.image}
//                   alt={recipe.title}
//                   style={{ width: "100%", height: "200px", objectFit: "cover" }}
//                 />
//               )}
//               <div style={{ padding: "20px" }}>
//                 <h2 style={{ margin: "0 0 10px", color: "#4B2E2E", fontWeight: "700" }}>
//                   {recipe.title}
//                 </h2>

//                 {/* Rating */}
//                 <div style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
//                   {"⭐".repeat(Math.round(Number(recipe.ratingAvg || 0)))}{" "}
//                   {recipe.ratingAvg ? Number(recipe.ratingAvg).toFixed(1) : "N/A"} (
//                   {recipe.ratingCount || 0} ratings)
//                 </div>

//                 {/* Cuisine + Dietary */}
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px", color: "#4B2E2E" }}>
//                   <span>🌍 {recipe.cuisineNames?.length ? recipe.cuisineNames.join(", ") : "Unknown"}</span>
//                   <span>🥗 {recipe.dietaryNames?.length ? recipe.dietaryNames.join(", ") : "Unspecified"}</span>
//                 </div>

//                                 {/* Method */}
//                 <div style={{ marginBottom: "15px" }}>
//                   <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>Method:</h4>
//                   <p style={{ margin: 0, color: "#555" }}>
//                     {(recipe.instructions ||
//                       recipe.method ||
//                       recipe.summary ||
//                       "No instructions provided.")
//                       .split(" ")
//                       .slice(0, 20)
//                       .join(" ")}...
//                   </p>
//                 </div>

//                 {/* Recent Comments */}
//                 <div style={{ marginBottom: "15px" }}>
//                   <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>Recent comments:</h4>
//                   {Array.isArray(recipe.comments) && recipe.comments.length > 0 ? (
//                     <p style={{ margin: 0, color: "#555" }}>
//                       “{recipe.comments[0]}” {recipe.comments.length > 1 && " ..."}
//                     </p>
//                   ) : (
//                     <p style={{ margin: 0, color: "#999" }}>No comments</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MainPage;

// //SAHI SALAMAT CODE
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function MainPage() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cuisines, setCuisines] = useState([]);
//   const [dietaryPrefs, setDietaryPrefs] = useState([]);
//   const [selectedCuisine, setSelectedCuisine] = useState("");
//   const [selectedDietary, setSelectedDietary] = useState("");

//   useEffect(() => {
//     console.log("🔄 useEffect triggered: fetching filters and recipes...");

//     const fetchFilters = async () => {
//       try {
//         console.log("➡️ Fetching cuisines and dietary preferences...");
//         const [cuisineRes, dietaryRes] = await Promise.all([
//           fetch("http://localhost:5000/api/cuisines"),
//           fetch("http://localhost:5000/api/dietary-preferences"),
//         ]);
//         console.log("✅ Responses received:", cuisineRes, dietaryRes);

//         const cuisinesData = await cuisineRes.json();
//         const dietaryData = await dietaryRes.json();
//         console.log("📦 Parsed cuisines:", cuisinesData);
//         console.log("📦 Parsed dietary prefs:", dietaryData);

//         setCuisines(Array.isArray(cuisinesData) ? cuisinesData : []);
//         setDietaryPrefs(Array.isArray(dietaryData) ? dietaryData : []);
//       } catch (err) {
//         console.error("❌ Error fetching filters:", err);
//       }
//     };

//     const fetchRecipes = async () => {
//       try {
//         console.log("➡️ Fetching recipes...");
//         const res = await fetch("http://localhost:5000/api/recipes");
//         console.log("✅ Recipes response:", res);

//         const data = await res.json();
//         console.log("📦 Parsed recipes:", data);

//         setRecipes(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("❌ Error fetching recipes:", err);
//       } finally {
//         console.log("⏹️ Finished fetching recipes, setting loading=false");
//         setLoading(false);
//       }
//     };

//     fetchFilters();
//     fetchRecipes();
//   }, []);

//   const filteredRecipes = recipes
//     .filter(r => r) // ✅ skip nulls
//     .filter((recipe, idx) => {
//       console.log(`🔍 Filtering recipe[${idx}]:`, recipe);

//       const matchesSearch = searchTerm
//         ? recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (recipe.ingredients || []).some((ing) =>
//             ing.name?.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//         : true;

//       const matchesCuisine = selectedCuisine
//         ? (recipe.cuisineNames || []).includes(selectedCuisine)
//         : true;

//       const matchesDietary = selectedDietary
//         ? (recipe.dietaryNames || []).includes(selectedDietary)
//         : true;

//       const result = matchesSearch && matchesCuisine && matchesDietary;
//       console.log(`➡️ Recipe[${idx}] included?`, result);
//       return result;
//     });

//   if (loading) {
//     console.log("⏳ Still loading recipes...");
//     return <div style={{ textAlign: "center", padding: "40px" }}>Loading recipes...</div>;
//   }

//   console.log("🎯 Final filtered recipes:", filteredRecipes);

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#fdf6e3", padding: "40px" }}>
//       <h1 style={{ fontSize: "64px", fontWeight: "bold", color: "#4B2E2E", textAlign: "center", marginBottom: "40px" }}>
//         Cookar
//       </h1>
//       <p style={{ textAlign: "center", fontSize: "20px", color: "#666", marginBottom: "50px" }}>
//         Discover recipes by cuisine, dietary preference, or search by ingredients.
//       </p>

//       {/* Search + Filters */}
//       <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "40px" }}>
//         <div style={{ display: "flex", gap: "16px", marginBottom: "30px", flexWrap: "wrap" }}>
//           <input
//             type="text"
//             placeholder="Search recipes by name or ingredient..."
//             value={searchTerm}
//             onChange={(e) => {
//               console.log("✏️ Search term changed:", e.target.value);
//               setSearchTerm(e.target.value);
//             }}
//             style={{ flex: "1 1 300px", padding: "14px 18px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", backgroundColor: "#fff" }}
//           />
//         </div>

//         <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
//           <div style={{ flex: "1 1 300px" }}>
//             <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#4B2E2E" }}>Dietary Preference</label>
//             <select
//               value={selectedDietary}
//               onChange={(e) => {
//                 console.log("🥗 Dietary preference selected:", e.target.value);
//                 setSelectedDietary(e.target.value);
//               }}
//               style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", backgroundColor: "#fff" }}
//             >
//               <option value="">All Preferences</option>
//               {dietaryPrefs
//                 .filter(d => d && d.name)
//                 .map((diet, idx) => {
//                   console.log(`📋 Rendering dietary option[${idx}]:`, diet);
//                   return (
//                     <option key={idx} value={diet.name}>
//                       {diet.name}
//                     </option>
//                   );
//                 })}
//             </select>
//           </div>

//           <div style={{ flex: "1 1 300px" }}>
//             <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#4B2E2E" }}>Cuisine</label>
//             <select
//               value={selectedCuisine}
//               onChange={(e) => {
//                 console.log("🌍 Cuisine selected:", e.target.value);
//                 setSelectedCuisine(e.target.value);
//               }}
//               style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", backgroundColor: "#fff" }}
//             >
//               <option value="">All Cuisines</option>
//               {cuisines
//                 .filter(c => c && c.name)
//                 .map((cuisine, idx) => {
//                   console.log(`📋 Rendering cuisine option[${idx}]:`, cuisine);
//                   return (
//                     <option key={idx} value={cuisine.name}>
//                       {cuisine.name}
//                     </option>
//                   );
//                 })}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Recipe Cards */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
//         {filteredRecipes.map((recipe, idx) => {
//           if (!recipe) {
//             console.warn(`⚠️ Skipping null recipe at index ${idx}`);
//             return null;
//           }
//           console.log(`🖼️ Rendering recipe card[${idx}]:`, recipe);

//           return (
//             <Link
//               key={idx}
//               to={`/recipes/${encodeURIComponent(recipe.title)}`}
//               style={{ textDecoration: "none", color: "inherit" }}
//             >
//               <div
//                 style={{
//                   backgroundColor: "#fff",
//                   borderRadius: "12px",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                   overflow: "hidden",
//                   cursor: "pointer",
//                 }}
//               >
//                 {recipe.image ? (
//                   <img
//                     src={recipe.image}
//                     alt={recipe.title}
//                     style={{ width: "100%", height: "200px", objectFit: "cover" }}
//                   />
//                 ) : (
//                   console.log(`⚠️ No image for recipe[${idx}]`, recipe)
//                 )}

//                 <div style={{ padding: "20px" }}>
//                   <h2 style={{ margin: "0 0 10px", color: "#4B2E2E", fontWeight: "700" }}>
//                     {recipe.title || "Untitled Recipe"}
//                   </h2>

//                                     {/* Rating */}
//                   <div style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
//                     {"⭐".repeat(Math.round(Number(recipe.rating || 0)))}{" "}
//                     {recipe.rating ? Number(recipe.rating).toFixed(1) : "N/A"}
//                   </div>

//                   {/* Cuisine + Dietary */}
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       marginBottom: "10px",
//                       fontSize: "14px",
//                       color: "#4B2E2E",
//                     }}
//                   >
//                     <span>
//                       🌍{" "}
//                       {recipe.cuisineNames?.length
//                         ? recipe.cuisineNames.join(", ")
//                         : (console.log(`⚠️ No cuisines for recipe card`), "Unknown")}
//                     </span>
//                     <span>
//                       🥗{" "}
//                       {recipe.dietaryNames?.length
//                         ? recipe.dietaryNames.join(", ")
//                         : (console.log(`⚠️ No dietary prefs for recipe card`), "Unspecified")}
//                     </span>
//                   </div>

//                   {/* Key Ingredients */}
//                   <div style={{ marginBottom: "15px" }}>
//                     <h4 style={{ marginBottom: "5px" }}>Key Ingredients:</h4>
//                     <p style={{ margin: 0, color: "#555" }}>
//                       {(recipe.ingredients || [])
//                         .slice(0, 4)
//                         .map((ing) => ing.name)
//                         .join(", ")}
//                       {Array.isArray(recipe.ingredients) &&
//                         recipe.ingredients.length > 4 &&
//                         " ..."}
//                     </p>
//                     {(!recipe.ingredients || recipe.ingredients.length === 0) &&
//                       console.log("⚠️ No ingredients for recipe card")}
//                   </div>

//                   {/* Method */}
//                   <div style={{ marginBottom: "15px" }}>
//                     <h4
//                       style={{
//                         marginBottom: "5px",
//                         fontWeight: "600",
//                         color: "#4B2E2E",
//                       }}
//                     >
//                       Method:
//                     </h4>
//                     <p style={{ margin: 0, color: "#555" }}>
//                       {(recipe.instructions ||
//                         recipe.summary ||
//                         "No instructions provided.")
//                         .split(" ")
//                         .slice(0, 20)
//                         .join(" ")}
//                       ...
//                     </p>
//                   </div>

//                   {/* Recent Comments */}
//                   <div style={{ marginBottom: "15px" }}>
//                     <h4
//                       style={{
//                         marginBottom: "5px",
//                         fontWeight: "600",
//                         color: "#4B2E2E",
//                       }}
//                     >
//                       Recent comments:
//                     </h4>
//                     {Array.isArray(recipe.comments) &&
//                     recipe.comments.length > 0 ? (
//                       <p style={{ margin: 0, color: "#555" }}>
//                         “{recipe.comments[0]}”{" "}
//                         {recipe.comments.length > 1 && " ..."}
//                       </p>
//                     ) : (
//                       <>
//                         <p style={{ margin: 0, color: "#999" }}>No comments</p>
//                         {console.log("⚠️ No comments for recipe card")}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default MainPage;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgLogo from "../assets/images/bg.png"; // Ensure this path is correct
import AddRecipe from "./addrecipe"; // Import AddRecipe component
import RecipeCard from "../components/recipecard";

function MainPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [dietaryPrefs, setDietaryPrefs] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedDietary, setSelectedDietary] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [cuisineRes, dietaryRes] = await Promise.all([
          fetch("http://localhost:5000/api/cuisines"),
          fetch("http://localhost:5000/api/dietary-preferences"),
        ]);
        const cuisinesData = await cuisineRes.json();
        const dietaryData = await dietaryRes.json();
        setCuisines(Array.isArray(cuisinesData) ? cuisinesData : []);
        setDietaryPrefs(Array.isArray(dietaryData) ? dietaryData : []);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };

    // const fetchRecipes = async () => {
    //   try {
    //     const res = await fetch("http://localhost:5000/api/recipes");
    //     const data = await res.json();
    //     setRecipes(Array.isArray(data) ? data : []);
    //   } catch (err) {
    //     console.error("Error fetching recipes:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // const fetchRecipes = async () => {
    //   try {
    //     const res = await fetch("http://localhost:5000/api/recipes");
    //     const data = await res.json();

    //     // Fetch ingredient objects for each recipe
    //     const recipesWithIngredients = await Promise.all(
    //       data.map(async (recipe) => {
    //         let dietaryNames = [];
    //         // ✅ Fetch dietary preferences for this recipe
    //         if (recipe.dietary_ids?.length) {
    //           const ids = recipe.dietary_ids.map((id) => id.$oid || id);
    //           const dietaryRes = await fetch(
    //             "http://localhost:5000/api/dietary-preferences/many",
    //             {
    //               method: "POST",
    //               headers: { "Content-Type": "application/json" },
    //               body: JSON.stringify({ ids }),
    //             }
    //           );
    //           if (dietaryRes.ok) dietaryNames = await dietaryRes.json();
    //         }

    //                 // Fetch ingredient objects
    //     let ingredientsData = recipe.ingredients || [];

    //         if (recipe.ingredients?.length) {
    //           const ids = recipe.ingredients.map((x) =>
    //             typeof x === "string" ? x : x.$oid
    //           );
    //           const ingRes = await fetch(
    //             "http://localhost:5000/api/ingredients/many",
    //             {
    //               method: "POST",
    //               headers: { "Content-Type": "application/json" },
    //               body: JSON.stringify({ ids }),
    //             }
    //           );
    //           if (ingRes.ok) ingredientsData = await ingRes.json();
    //     }

    //           // 1️⃣ Fetch dietary preferences for this recipe
    //           // let dietaryNames = [];
    //           // if (recipe.dietary_ids?.length) {
    //           //   const ids = recipe.dietary_ids.map((id) => id.$oid || id);
    //           //   const dietaryRes = await fetch(
    //           //     "http://localhost:5000/api/dietary-preferences/many",
    //           //     {
    //           //       method: "POST",
    //           //       headers: { "Content-Type": "application/json" },
    //           //       body: JSON.stringify({ ids }),
    //           //     }
    //           //   );
    //           //   if (dietaryRes.ok) dietaryNames = await dietaryRes.json();
    //           // }

    //           return {
    //             ...recipe,
    //             ingredients: ingredientsData,
    //             dietaryNames: dietaryNames.map((d) => d.name),
    //             servingSize:
    //               recipe.servings || recipe.serving_size || recipe.servings, // adjust as per API
    //           };
    //                   })
    //     );

    //     setRecipes(
    //       Array.isArray(recipesWithIngredients) ? recipesWithIngredients : []
    //     );
    //   } catch (err) {
    //     console.error("Error fetching recipes:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes");
        const data = await res.json();

        const recipesWithIngredientsAndDietary = await Promise.all(
          data.map(async (recipe) => {
            // 1️⃣ Fetch ingredients
            let ingredientsData = recipe.ingredients || [];
            if (recipe.ingredients?.length) {
              const ids = recipe.ingredients.map((x) =>
                typeof x === "string" ? x : x.$oid
              );
              const ingRes = await fetch(
                "http://localhost:5000/api/ingredients/many",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ids }),
                }
              );
              if (ingRes.ok) ingredientsData = await ingRes.json();
            }

            // 2️⃣ Fetch dietary preferences
            let dietaryNames = [];
            if (recipe.diet_ids?.length) {
              const ids = recipe.diet_ids.map((id) => id.$oid || id);
              const dietaryRes = await fetch(
                "http://localhost:5000/api/dietary-preferences/many",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ids }),
                }
              );

              ////////////////////////////////////////////////////////////////////////////////////////////////
              if (dietaryRes.ok) {
                const dietaryData = await dietaryRes.json();
                console.log(
                  "Dietary data for recipe",
                  recipe.title,
                  dietaryData
                ); // <-- check this
                if (Array.isArray(dietaryData)) {
                  dietaryNames = dietaryData.map((d) => d.name);
                  console.log("Mapped dietaryNames:", dietaryNames); // <-- check this
                }
              }
              ////////////////////////////////////////////////////////////////////////////////////////////////

              // if (dietaryRes.ok) {
              //   const dietaryData = await dietaryRes.json();
              //   if (Array.isArray(dietaryData)) {
              //     dietaryNames = dietaryData.map((d) => d.name);
              //   }
              // }
            }

            console.log("FINAL RECIPE:", {
              title: recipe.title,
              diet_ids: recipe.diet_ids,
              dietaryNames,
            });

            return {
              ...recipe,
              ingredients: ingredientsData,
              dietaryNames, // ✅ now correctly populated
              servingSize:
                recipe.servings || recipe.serving_size || recipe.servings,
            };
          })
        );

        setRecipes(recipesWithIngredientsAndDietary);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = searchTerm
      ? recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (recipe.ingredients || []).some((ing) =>
          ing.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    const matchesCuisine = selectedCuisine
      ? (recipe.cuisineNames || []).includes(selectedCuisine)
      : true;

    const matchesDietary = selectedDietary
      ? (recipe.dietaryNames || []).includes(selectedDietary)
      : true;

    return matchesSearch && matchesCuisine && matchesDietary;
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddRecipe = (recipe) => {
    // Add the newly created recipe directly to the recipes state
    setRecipes((prevRecipes) => [...prevRecipes, recipe]);
    closeModal();
  };

  // Helper function to strip HTML tags
  // const stripHtmlTags = (html) => {
  //   if (!html) return "";
  //   const tmp = document.createElement("DIV");
  //   tmp.innerHTML = html;
  //   return tmp.textContent || tmp.innerText || "";
  // };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading recipes...
      </div>
    );
  }

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#fdf6e3", padding: "0" }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={bgLogo}
            alt="Chef Cap"
            style={{ width: "50px", marginRight: "10px" }}
          />
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#4B2E2E",
              margin: 0,
            }}
          >
            Cookar
          </h1>
        </div>
        <button
          onClick={openModal}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4B2E2E",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Recipe
        </button>
      </header>

      {/* Modal for Add Recipe */}
      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <button onClick={closeModal} style={modalStyles.closeButton}>
              X
            </button>
            <AddRecipe
              closeModal={closeModal}
              handleAddRecipe={handleAddRecipe}
              cuisines={cuisines}
              dietaryPrefs={dietaryPrefs}
            />
          </div>
        </div>
      )}

      {/* Search + Filters */}
      {/* <div
        style={{
          maxWidth: "80%",
          borderRadius: "12px",
          backgroundColor: "#fff",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          margin: "20px auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search recipes by name or ingredient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: "1 1 300px",
              padding: "14px 18px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          />
          <select
            value={selectedDietary}
            onChange={(e) => setSelectedDietary(e.target.value)}
            style={{
              flex: "1 1 300px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#fff",
            }}
          >
            <option value="">All Preferences</option>
            {dietaryPrefs.map((diet, idx) => (
              <option key={idx} value={diet.name}>
                {diet.name}
              </option>
            ))}
          </select>
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            style={{
              flex: "1 1 300px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#fff",
            }}
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine, idx) => (
              <option key={idx} value={cuisine.name}>
                {cuisine.name}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      {/* Search + Filters */}
      <div
        style={{
          maxWidth: "80%",
          borderRadius: "12px",
          backgroundColor: "#fff",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          margin: "20px auto",
        }}
      >
        {/* Search Box - full width */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search recipes by name or ingredient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "97%",
              padding: "14px 18px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          />
        </div>

        {/* Filters row */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <select
            value={selectedDietary}
            onChange={(e) => setSelectedDietary(e.target.value)}
            style={{
              flex: "1 1 48%", // half width with some gap
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#fff",
            }}
          >
            <option value="">All Preferences</option>
            {dietaryPrefs.map((diet, idx) => (
              <option key={idx} value={diet.name}>
                {diet.name}
              </option>
            ))}
          </select>

          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            style={{
              flex: "1 1 48%", // half width with some gap
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#fff",
            }}
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine, idx) => (
              <option key={idx} value={cuisine.name}>
                {cuisine.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recipe Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px",
          padding: "20px",
          alignItems: "stretch",
        }}
      >
        {filteredRecipes.map((recipe, idx) => (
          <RecipeCard key={idx} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: "8px",
    padding: "20px",
    width: "90%",
    maxWidth: "600px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default MainPage;

// extracted code:
// {filteredRecipes.map((recipe, idx) => {
//   // // ⭐ Correctly placed debug
//   // console.log(
//   //   "Ingredients for:",
//   //   recipe.title,
//   //   recipe.ingredients,
//   //   recipe.ingredientNames
//   // );
//   return (
//     <Link
//       key={idx}
//       to={`/recipes/${encodeURIComponent(recipe.title)}`}
//       style={{ textDecoration: "none", color: "inherit" }}
//     >
//       <div
//         style={{
//           backgroundColor: "#fff",
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           overflow: "hidden",
//           cursor: "pointer",
//         }}
//       >
//         {recipe.image && (
//           <img
//             src={recipe.image}
//             alt={recipe.title}
//             style={{
//               width: "100%",
//               height: "200px",
//               objectFit: "cover",
//             }}
//           />
//         )}
//         <div style={{ padding: "20px" }}>
//           <h2
//             style={{
//               margin: "0 0 10px",
//               color: "#4B2E2E",
//               fontWeight: "700",
//             }}
//           >
//             {recipe.title || "Untitled Recipe"}
//           </h2>

//           {/* Rating */}
//           <div
//             style={{
//               color: "#666",
//               fontSize: "14px",
//               marginBottom: "10px",
//             }}
//           >
//             {"⭐".repeat(
//               Math.round(Number(recipe.ratingAvg || recipe.rating || 0))
//             )}{" "}
//             {recipe.ratingAvg
//               ? Number(recipe.ratingAvg).toFixed(1)
//               : recipe.rating
//               ? Number(recipe.rating).toFixed(1)
//               : "N/A"}{" "}
//             ({recipe.ratingCount || recipe.reviews_count || 0} reviews)
//           </div>

//           {/* Cuisine + Dietary */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "10px",
//               fontSize: "14px",
//               color: "#4B2E2E",
//             }}
//           >
//             <span>
//               🌍{" "}
//               {recipe.cuisineNames?.length
//                 ? recipe.cuisineNames.join(", ")
//                 : "Unknown"}
//             </span>
//             <span>
//               🥗{" "}
//               {recipe.dietaryNames?.length
//                 ? recipe.dietaryNames.join(", ")
//                 : "Unspecified"}
//             </span>
//           </div>

//           {/* Serving Size */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "10px",
//               fontSize: "14px",
//             }}
//           >
//             <span>
//               🍽️ {recipe.servingSize || recipe.serving_size || "N/A"}{" "}
//               servings
//             </span>
//           </div>

//           {/* Key Ingredients */}
//           <div style={{ marginBottom: "15px" }}>
//             <h4
//               style={{
//                 marginBottom: "5px",
//                 fontWeight: "600",
//                 color: "#4B2E2E",
//               }}
//             >
//               Key Ingredients:
//             </h4>
//             <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
//               {(recipe.ingredientNames || recipe.ingredients || [])
//                 .slice(0, 4)
//                 .map((ing) => {
//                   if (typeof ing === "string") return ing;
//                   return `${ing.quantity || ""} ${
//                     ing.measurement || ""
//                   } ${ing.name || ""}`.trim();
//                 })
//                 .join(", ")}
//               {(recipe.ingredientNames || recipe.ingredients || [])
//                 .length > 4 && " ..."}
//             </p>
//           </div>

//           {/* Method */}
//           <div style={{ marginBottom: "15px" }}>
//             <h4
//               style={{
//                 marginBottom: "5px",
//                 fontWeight: "600",
//                 color: "#4B2E2E",
//               }}
//             >
//               Method:
//             </h4>
//             <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
//               {stripHtmlTags(
//                 recipe.instructions ||
//                   recipe.summary ||
//                   "No instructions provided."
//               )
//                 .split(". ")
//                 .slice(0, 2)
//                 .join(". ") +
//                 (recipe.instructions || recipe.summary ? "..." : "")}
//             </p>
//           </div>

//           {/* Recent Comments */}
//           <div style={{ marginBottom: "15px" }}>
//             <h4
//               style={{
//                 marginBottom: "5px",
//                 fontWeight: "600",
//                 color: "#4B2E2E",
//               }}
//             >
//               Recent comments:
//             </h4>
//             {Array.isArray(recipe.comments) &&
//             recipe.comments.length > 0 ? (
//               <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
//                 "{recipe.comments[0]}"{" "}
//                 {recipe.comments.length > 1 && " ..."}
//               </p>
//             ) : (
//               <p style={{ margin: 0, color: "#999", fontSize: "14px" }}>
//                 No comments
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// })}

// // src/pages/mainpage.jsx
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import bgLogo from '../assets/images/bg.png'; // Make sure this path is correct

// function MainPage() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cuisines, setCuisines] = useState([]);
//   const [dietaryPrefs, setDietaryPrefs] = useState([]);
//   const [selectedCuisine, setSelectedCuisine] = useState("");
//   const [selectedDietary, setSelectedDietary] = useState("");

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const [cuisineRes, dietaryRes] = await Promise.all([
//           fetch("http://localhost:5000/api/cuisines"),
//           fetch("http://localhost:5000/api/dietary-preferences"),
//         ]);
//         const cuisinesData = await cuisineRes.json();
//         const dietaryData = await dietaryRes.json();
//         setCuisines(Array.isArray(cuisinesData) ? cuisinesData : []);
//         setDietaryPrefs(Array.isArray(dietaryData) ? dietaryData : []);
//       } catch (err) {
//         console.error("Error fetching filters:", err);
//       }
//     };

//     const fetchRecipes = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/recipes");
//         const data = await res.json();
//         setRecipes(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching recipes:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilters();
//     fetchRecipes();
//   }, []);

//   const filteredRecipes = recipes.filter((recipe) => {
//     const matchesSearch = searchTerm
//       ? recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (recipe.ingredients || []).some((ing) =>
//           ing.name?.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       : true;

//     const matchesCuisine = selectedCuisine
//       ? (recipe.cuisineNames || []).includes(selectedCuisine)
//       : true;

//     const matchesDietary = selectedDietary
//       ? (recipe.dietaryNames || []).includes(selectedDietary)
//       : true;

//     return matchesSearch && matchesCuisine && matchesDietary;
//   });

//   if (loading) {
//     return <div style={{ textAlign: "center", padding: "40px" }}>Loading recipes...</div>;
//   }

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#fdf6e3", padding: "0" }}>
//       {/* Header */}
//       <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <img src={bgLogo} alt="Chef Cap" style={{ width: "50px", marginRight: "10px" }} />
//           <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#4B2E2E", margin: 0 }}>Cookar</h1>
//         </div>
//         <Link to="/add-recipe">
//           <button style={{ padding: "10px 20px", backgroundColor: "#4B2E2E", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>Add Recipe</button>
//         </Link>
//       </header>

//       {/* Search + Filters */}
//       <div style={{ maxWidth: "100%", backgroundColor: "#fff", padding: "30px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", margin: "20px auto" }}>
//         <div style={{ display: "flex", gap: "16px", marginBottom: "30px", flexWrap: "wrap", justifyContent: "center" }}>
//           <input
//             type="text"
//             placeholder="Search recipes by name or ingredient..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ flex: "1 1 300px", padding: "14px 18px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc", backgroundColor: "#fff" }}
//           />
//           <select
//             value={selectedDietary}
//             onChange={(e) => setSelectedDietary(e.target.value)}
//             style={{ flex: "1 1 300px", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", backgroundColor: "#fff" }}
//           >
//             <option value="">All Preferences</option>
//             {dietaryPrefs.map((diet, idx) => (
//               <option key={idx} value={diet.name}>{diet.name}</option>
//             ))}
//           </select>
//           <select
//             value={selectedCuisine}
//             onChange={(e) => setSelectedCuisine(e.target.value)}
//             style={{ flex: "1 1 300px", padding: "12px 16px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", backgroundColor: "#fff" }}
//           >
//             <option value="">All Cuisines</option>
//             {cuisines.map((cuisine, idx) => (
//               <option key={idx} value={cuisine.name}>{cuisine.name}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Recipe Cards */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px", padding: "20px" }}>
//         {filteredRecipes.map((recipe, idx) => (
//           <Link
//             key={idx}
//             to={`/recipes/${encodeURIComponent(recipe.title)}`}
//             style={{ textDecoration: "none", color: "inherit" }}
//           >
//             <div style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", cursor: "pointer" }}>
//               {recipe.image && (
//                 <img
//                   src={recipe.image}
//                   alt={recipe.title}
//                   style={{ width: "100%", height: "200px", objectFit: "cover" }}
//                 />
//               )}
//               <div style={{ padding: "20px" }}>
//                 <h2 style={{ margin: "0 0 10px", color: "#4B2E2E", fontWeight: "700" }}>
//                   {recipe.title || "Untitled Recipe"}
//                 </h2>

//                 {/* Rating */}
//                 <div style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
//                   {"⭐".repeat(Math.round(Number(recipe.rating || 0)))}{" "}
//                   {recipe.rating ? Number(recipe.rating).toFixed(1) : "N/A"}
//                 </div>

//                 {/* Cuisine + Dietary */}
//                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px", color: "#4B2E2E" }}>
//                   <span>
//                     🌍 {recipe.cuisineNames?.length ? recipe.cuisineNames.join(", ") : "Unknown"}
//                   </span>
//                   <span>
//                     🥗 {recipe.dietaryNames?.length ? recipe.dietaryNames.join(", ") : "Unspecified"}
//                   </span>
//                 </div>

//                 {/* Key Ingredients */}
//                 <div style={{ marginBottom: "15px" }}>
//                   <h4 style={{ marginBottom: "5px" }}>Key Ingredients:</h4>
//                   <p style={{ margin: 0, color: "#555" }}>
//                     {(recipe.ingredients || [])
//                       .slice(0, 4)
//                       .map((ing) => ing.name)
//                       .join(", ")}
//                     {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 4 && " ..."}
//                   </p>
//                 </div>

//                 {/* Method */}
//                 <div style={{ marginBottom: "15px" }}>
//                   <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>Method:</h4>
//                   <p style={{ margin: 0, color: "#555" }}>
//                     {(recipe.instructions || "No instructions provided.")
//                       .split(" ")
//                       .slice(0, 20)
//                       .join(" ")}
//                     ...
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MainPage;

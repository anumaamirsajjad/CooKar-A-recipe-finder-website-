// function RecipeCard({ title, rating, reviews, tags, ingredients, method, image }) {
//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       <img src={image} alt={title} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//         <p className="text-sm text-gray-600 mb-2">⭐ {rating} ({reviews} reviews)</p>
//         <div className="flex flex-wrap gap-2 mb-2">
//           {tags.map((tag) => (
//             <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
//               {tag}
//             </span>
//           ))}
//         </div>
//         <p className="text-sm text-gray-700 mb-2">
//           <strong>Ingredients:</strong> {ingredients.join(', ')}
//         </p>
//         <p className="text-sm text-gray-700">
//           <strong>Method:</strong> {method}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default RecipeCard;

// // src/components/RecipeCard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const RecipeCard = ({ recipe }) => {
//   return (
//     <div
//       style={{
//         border: '1px solid #ddd',
//         borderRadius: '12px',
//         padding: '20px',
//         textAlign: 'center',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//         backgroundColor: '#fff',
//         cursor: 'pointer',
//       }}
//     >
//       <Link
//         to={`/recipes/${encodeURIComponent(recipe.title)}`}
//         style={{ textDecoration: 'none', color: 'inherit' }}
//       >
//         <img
//           src={recipe.image || '/placeholder.jpg'}
//           alt={recipe.title}
//           style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
//         />
//         <h2 style={{ color: '#4B2E2E', marginBottom: '8px' }}>{recipe.title}</h2>
//         <p>⭐⭐⭐⭐ ({recipe.reviews || 0} reviews)</p>
//         <p>Calories: {recipe.calories || 'N/A'} | Serves: {recipe.servings || 'N/A'}</p>
//         <p>Tags: {recipe.tags ? recipe.tags.join(', ') : 'None'}</p>
//       </Link>
//     </div>
//   );
// };

// export default RecipeCard;


// // src/components/RecipeCard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const RecipeCard = ({ recipe }) => {
//   console.log('Recipe object:', recipe); // Debugging

//   return (
//     <div
//       style={{
//         border: '1px solid #ddd',
//         borderRadius: '12px',
//         padding: '20px',
//         textAlign: 'center',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//         backgroundColor: '#fff',
//         cursor: 'pointer',
//       }}
//     >
//       <Link
//         to={`/recipes/${encodeURIComponent(recipe.title)}`}
//         style={{ textDecoration: 'none', color: 'inherit' }}
//       >
//         <img
//           src={recipe.image || '/placeholder.jpg'}
//           alt={recipe.title}
//           style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
//         />
//         <h2 style={{ color: '#4B2E2E', marginBottom: '8px' }}>{recipe.title}</h2>
//         <p>⭐⭐⭐⭐ ({recipe.reviews || 0} reviews)</p>
//         <p>Calories: {recipe.calories || 'N/A'} | Serves: {recipe.servings || 'N/A'}</p>
//         <p>Tags: {recipe.tags ? recipe.tags.join(', ') : 'None'}</p>
//       </Link>

//       {/* Ingredients list outside Link */}
//       {recipe.ingredients && recipe.ingredients.length > 0 ? (
//         <div style={{ textAlign: 'left', marginTop: '12px' }}>
//           <h4>Ingredients:</h4>
//           <ul style={{ paddingLeft: '20px' }}>
//             {recipe.ingredients.map((ing, idx) => (
//               <li key={idx}>
//                 {ing.name} {ing.quantity ? `- ${ing.quantity}` : ''}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No ingredients listed.</p>
//       )}
//     </div>
//   );
// };

// export default RecipeCard;


// // src/components/RecipeCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// const RecipeCard = ({ recipe }) => {

//   console.log("Recipe object:", recipe); // Debug

//   // Helper to strip HTML tags
//   const stripHtmlTags = (html) => {
//     if (!html) return "";
//     const tmp = document.createElement("DIV");
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || "";
//   };

//   return (
//     <Link
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
//             src={recipe.image || "/placeholder.jpg"}
//             alt={recipe.title}
//             style={{ width: "100%", height: "200px", objectFit: "cover" }}
//           />
//         )}

//         <div style={{ padding: "20px" }}>
//           <h2 style={{ margin: "0 0 10px", color: "#4B2E2E", fontWeight: "700" }}>
//             {recipe.title || "Untitled Recipe"}
//           </h2>

//           {/* Rating */}
//           <div style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
//             {"⭐".repeat(Math.round(Number(recipe.ratingAvg || recipe.rating || 0)))}{" "}
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
//               🌍 {recipe.cuisineNames?.length ? recipe.cuisineNames.join(", ") : "Unknown"}
//             </span>
//             <span>
//               🥗 {recipe.dietaryNames?.length ? recipe.dietaryNames.join(", ") : "Unspecified"}
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
//               🍽️ {recipe.servingSize || recipe.serving_size || "N/A"} servings
//             </span>
//           </div>

//           {/* Key Ingredients */}
//           <div style={{ marginBottom: "15px" }}>
//             <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>
//               Key Ingredients:
//             </h4>
//             <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
//               {(recipe.ingredientNames || recipe.ingredients || [])
//                 .slice(0, 4)
//                 .map((ing) => {
//                   if (typeof ing === "string") return ing;
//                   return `${ing.quantity || ""} ${ing.measurement || ""} ${ing.name || ""}`.trim();
//                 })
//                 .join(", ")}
//               {(recipe.ingredientNames || recipe.ingredients || []).length > 4 && " ..."}
//             </p>
//           </div>

//           {/* Ingredients list */}
//           {recipe.ingredients && recipe.ingredients.length > 0 && (
//             <div style={{ textAlign: "left", marginBottom: "15px" }}>
//               <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>
//                 Ingredients:
//               </h4>
//               <ul style={{ paddingLeft: "20px", margin: 0 }}>
//                 {recipe.ingredients.map((ing, idx) => (
//                   <li key={idx}>
//                     {ing.name} {ing.quantity ? `- ${ing.quantity}` : ""}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Method */}
//           <div style={{ marginBottom: "15px" }}>
//             <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>
//               Method:
//             </h4>
//             <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
//               {stripHtmlTags(recipe.instructions || recipe.summary || "No instructions provided.")
//                 .split(". ")
//                 .slice(0, 2)
//                 .join(". ") +
//                 (recipe.instructions || recipe.summary ? "..." : "")}
//             </p>
//           </div>

//           {/* Recent Comments */}
//           <div style={{ marginBottom: "15px" }}>
//             <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>
//               Recent comments:
//             </h4>
//             {Array.isArray(recipe.comments) && recipe.comments.length > 0 ? (
//               <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
//                 "{recipe.comments[0]}" {recipe.comments.length > 1 && " ..."}
//               </p>
//             ) : (
//               <p style={{ margin: 0, color: "#999", fontSize: "14px" }}>No comments</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default RecipeCard;


// src/components/RecipeCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {

  console.log("Recipe object:", recipe); // Debug

  // Helper to strip HTML tags
  const stripHtmlTags = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Helper to render ingredients as string
  const renderKeyIngredients = () => {
    if (!recipe.ingredients || recipe.ingredients.length === 0) return "N/A";
    return recipe.ingredients
      .slice(0, 4)
      .map((ing) => `${ing.name} ${ing.quantity ? `- ${ing.quantity}` : ""}`.trim())
      .join(", ") + (recipe.ingredients.length > 4 ? " ..." : "");
  };

  return (
    <Link
      to={`/recipes/${encodeURIComponent(recipe.title)}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column", // stack content vertically
          justifyContent: "space-between", // push bottom content down if needed
          height: "100%", // take full height of the grid cell
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
          cursor: "pointer",
          font: "Poppins",
        }}
      >
        {recipe.image && (
          <img
            src={recipe.image || "/placeholder.jpg"}
            alt={recipe.title}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        )}

        <div style={{ padding: "20px" }}>
          <h2 style={{margin: "0 0 10px", color: "#4B2E2E", fontWeight: "700" }}>
            {recipe.title || "Untitled Recipe"}
          </h2>

          {/* Rating */}
          <div style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
            {"⭐".repeat(Math.round(Number(recipe.ratingAvg || recipe.rating || 0)))}{" "}
            {recipe.ratingAvg
              ? Number(recipe.ratingAvg).toFixed(1)
              : recipe.rating
              ? Number(recipe.rating).toFixed(1)
              : "N/A"}{" "}
            ({recipe.ratingCount || recipe.reviews_count || 0} reviews)
          </div>

          {/* Cuisine + Dietary */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontSize: "14px",
              color: "#4B2E2E",
            }}
          >
            <span>
              🌍 {recipe.cuisineNames?.length ? recipe.cuisineNames.join(", ") : "Unknown"}
            </span>
            <span>
              🥗 {recipe.dietaryNames?.length ? recipe.dietaryNames.join(", ") : "Unspecified"}
            </span>
          </div>

          {/* Serving Size */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontSize: "14px",
            }}
          >
            <span>
              🍽️ {recipe.servingSize || recipe.serving_size || "N/A"} servings
            </span>
          </div>

          {/* Key Ingredients */}
          <div style={{ marginBottom: "15px" }}>
            <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>
              Key Ingredients:
            </h4>
            <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
              {renderKeyIngredients()}
            </p>
          </div>

          {/* Ingredients list */}
          {/* {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div style={{ textAlign: "left", marginBottom: "15px" }}>
              <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>
                Ingredients:
              </h4>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>
                    {ing.name} {ing.quantity ? `- ${ing.quantity}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          {/* Method */}
          <div style={{ marginBottom: "15px" }}>
            <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>
              Method:
            </h4>
            <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
              {stripHtmlTags(recipe.instructions || recipe.summary || "No instructions provided.")
                .split(". ")
                .slice(0, 2)
                .join(". ") +
                (recipe.instructions || recipe.summary ? "..." : "")}
            </p>
          </div>

          {/* Recent Comments */}
          <div style={{ marginBottom: "15px" }}>
            <h4 style={{ marginBottom: "5px", fontWeight: "600", color: "#4B2E2E" }}>
              Recent comments:
            </h4>
            {Array.isArray(recipe.comments) && recipe.comments.length > 0 ? (
              <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
                "{recipe.comments[0]}" {recipe.comments.length > 1 && " ..."}
              </p>
            ) : (
              <p style={{ margin: 0, color: "#999", fontSize: "14px" }}>No comments</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;

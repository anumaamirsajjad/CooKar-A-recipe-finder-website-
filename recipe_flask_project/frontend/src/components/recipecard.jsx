
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

//   // Helper to render ingredients as string
//   const renderKeyIngredients = () => {
//     if (!recipe.ingredients || recipe.ingredients.length === 0) return "N/A";
//     return recipe.ingredients
//       .slice(0, 4)
//       .map((ing) => `${ing.name} ${ing.quantity ? `- ${ing.quantity}` : ""}`.trim())
//       .join(", ") + (recipe.ingredients.length > 4 ? " ..." : "");
//   };

//   return (
//     <Link
//       to={`/recipes/${encodeURIComponent(recipe.title)}`}
//       style={{ textDecoration: "none", color: "inherit" }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column", // stack content vertically
//           justifyContent: "space-between", // push bottom content down if needed
//           height: "100%", // take full height of the grid cell
//           backgroundColor: "#fff",
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           overflow: "hidden",
//           cursor: "pointer",
//           font: "Poppins",
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
//           <h2 style={{margin: "0 0 10px", color: "#4B2E2E", fontWeight: "700" }}>
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
//               {renderKeyIngredients()}
//             </p>
//           </div>

//           {/* Ingredients list */}
//           {/* {recipe.ingredients && recipe.ingredients.length > 0 && (
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
//           )} */}

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




/**
 * 🎨 DESIGN PATTERNS IMPLEMENTED:
 * 
 * 1. ✅ ADAPTER PATTERN:
 *    - RecipeCard adapts raw recipe data to display format
 *    - Handles different data formats (ratingAvg vs rating, servingSize vs servings)
 *    - Normalizes inconsistent API responses
 * 
 * 2. ✅ DECORATOR PATTERN:
 *    - stripHtmlTags decorates/wraps HTML content
 *    - shortenText decorates text with truncation
 *    - renderKeyIngredients decorates ingredient list with formatting
 * 
 * 3. ✅ PRESENTER PATTERN:
 *    - RecipeCard is presentational component
 *    - Receives data via props, doesn't fetch
 *    - Pure presentation logic
 * 
 * 4. ✅ STRATEGY PATTERN:
 *    - Different display strategies for ingredients (objects vs strings)
 *    - Conditional rendering based on data availability
 * 
 * 5. ✅ TEMPLATE METHOD PATTERN:
 *    - Card layout follows fixed template
 *    - Image → Title → Rating → Cuisine/Dietary → Servings → Ingredients → Method → Comments
 *    - Content varies but structure is consistent
 *
 * 🎨 DESIGN PRINCIPLES APPLIED:
 * 
 * 1. SINGLE RESPONSIBILITY PRINCIPLE (SRP):
 *    - RecipeCard component has ONE job: render a single recipe card
 *    - Each helper function has ONE specific purpose
 *    - stripHtmlTags only strips HTML, shortenText only truncates, etc.
 * 
 * 2. DRY (Don't Repeat Yourself):
 *    - Helper functions eliminate code duplication
 *    - Text processing logic centralized in reusable functions
 * 
 * 3. PURE FUNCTIONS:
 *    - stripHtmlTags, shortenText, renderKeyIngredients are pure functions
 *    - Same input always produces same output, no side effects
 * 
 * 4. SEPARATION OF CONCERNS:
 *    - Presentation logic (JSX) separate from data transformation (helpers)
 *    - Styling separated into inline styles for component encapsulation
 */

// src/components/RecipeCard.jsx
import React from "react";
import { Link } from "react-router-dom";

// 🔹 ADAPTER PATTERN: Normalizes different recipe data formats
const RecipeCard = ({ recipe }) => {
  console.log("Recipe object:", recipe); // Debug

  // 🔹 DECORATOR PATTERN: Strips HTML tags from text (wraps/enhances text)
  // Pure function that decorates HTML content into plain text
  const stripHtmlTags = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // 🔹 DECORATOR PATTERN: Truncates/decorates text with ellipsis
  // Pure function that enhances text with length limit
  const shortenText = (text, limit = 20) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  {
    shortenText(stripHtmlTags(recipe.instructions || recipe.summary), 25);
  }

  // 🔹 DECORATOR PATTERN: Formats/decorates ingredient list for display
  // Transforms raw ingredient objects into formatted display string
  const renderKeyIngredients = () => {
    if (!recipe.ingredients || recipe.ingredients.length === 0) return "N/A";
    return (
      recipe.ingredients
        .slice(0, 4)
        .map((ing) =>
          `${ing.name} ${ing.quantity ? `- ${ing.quantity}` : ""}`.trim()
        )
        .join(", ") + (recipe.ingredients.length > 4 ? " ..." : "")
    );
  };

  // 🔹 COMPONENT RENDERING (Separation of Concerns)
  // JSX handles ONLY presentation, data processing done by pure functions above
  return (
    <Link
      to={`/recipes/${encodeURIComponent(recipe.title)}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
          gap: "20px",
          gridAutoRows: "1fr", // THIS FIXES GRID CELL HEIGHT
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column", // stack content vertically
            justifyContent: "space-between", // push bottom content down if needed
            height: "600px", // take full height of the grid cell
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
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          )}

          <div style={{ padding: "20px" }}>
            <h2
              style={{
                margin: "0 0 6px",
                color: "#4B2E2E",
                fontWeight: "600",
              }}
            >
              {recipe.title || "Untitled Recipe"}
            </h2>

            {/* Rating */}
            <div
              style={{
                color: "#666",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              {"⭐".repeat(
                Math.round(Number(recipe.ratingAvg || recipe.rating || 0))
              )}{" "}
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
                marginBottom: "8px",
                fontSize: "14px",
                color: "#4B2E2E",
              }}
            >
              <span>
                🌍{" "}
                {recipe.cuisineNames?.length
                  ? recipe.cuisineNames.join(", ")
                  : "Unknown"}
              </span>
              <span>
                🥗{" "}
                {recipe.dietaryNames?.length
                  ? shortenText(recipe.dietaryNames.join(", "), 2)
                  : "Unspecified"}
              </span>
            </div>

            {/* Serving Size */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              <span>
                🍽️ {recipe.servingSize || recipe.serving_size || "N/A"} servings
              </span>
            </div>

            {/* Key Ingredients */}
            <div style={{ marginBottom: "8px" }}>
              <h4
                style={{
                  marginBottom: "5px",
                  fontWeight: "600",
                  color: "#4B2E2E",
                }}
              >
                Key Ingredients:
              </h4>
              <p
                style={{
                  margin: 0,
                  color: "#555",
                  fontSize: "14px",
                }}
              >
                {shortenText(renderKeyIngredients(), 12)}
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
            <div style={{ marginBottom: "0px" }}>
              <h4
                style={{
                  marginBottom: "2px",
                  fontWeight: "600",
                  color: "#4B2E2E",
                }}
              >
                Method:
              </h4>
              <p
                style={{
                  margin: 0,
                  color: "#555",
                  fontSize: "14px",
                }}
              >
                {stripHtmlTags(
                  recipe.instructions ||
                    recipe.summary ||
                    "No instructions provided."
                )
                  .split(". ")
                  .slice(0, 2)
                  .join(". ") +
                  (recipe.instructions || recipe.summary ? "..." : "")}
              </p>
            </div>

            {/* Recent Comments */}
            <div style={{ marginBottom: "0px" }}>
              <h4
                style={{
                  marginBottom: "5px",
                  fontWeight: "600",
                  color: "#4B2E2E",
                }}
              >
                Recent comments:
              </h4>
              {Array.isArray(recipe.comments) && recipe.comments.length > 0 ? (
                <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
                  {/* "{recipe.comments[0]}" {recipe.comments.length > 1 && " ..."} */}
                  {shortenText(recipe.comments[0], 15)}
                </p>
              ) : (
                <p style={{ margin: 0, color: "#999", fontSize: "14px" }}>
                  No comments
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;

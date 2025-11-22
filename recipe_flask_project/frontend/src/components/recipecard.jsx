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

// src/components/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        cursor: 'pointer',
      }}
    >
      <Link
        to={`/recipes/${encodeURIComponent(recipe.title)}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <img
          src={recipe.image || '/placeholder.jpg'}
          alt={recipe.title}
          style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
        />
        <h2 style={{ color: '#4B2E2E', marginBottom: '8px' }}>{recipe.title}</h2>
        <p>⭐⭐⭐⭐ ({recipe.reviews || 0} reviews)</p>
        <p>Calories: {recipe.calories || 'N/A'} | Serves: {recipe.servings || 'N/A'}</p>
        <p>Tags: {recipe.tags ? recipe.tags.join(', ') : 'None'}</p>
      </Link>
    </div>
  );
};

export default RecipeCard;
function RecipeCard({ title, rating, reviews, tags, ingredients, method, image }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">⭐ {rating} ({reviews} reviews)</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Ingredients:</strong> {ingredients.join(', ')}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Method:</strong> {method}
        </p>
      </div>
    </div>
  );
}

export default RecipeCard;
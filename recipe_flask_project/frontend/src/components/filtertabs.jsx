function FilterTabs() {
  const cuisines = ['Pashto', 'Balochi', 'Sindhi', 'Punjabi'];
  const diets = ['Vegetarian', 'Beef', 'Mutton', 'Chicken'];

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
          >
            {cuisine}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {diets.map((diet) => (
          <button
            key={diet}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200"
          >
            {diet}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterTabs;
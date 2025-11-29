import React, { useState } from 'react';

const measurementOptions = ['Cup', 'Tablespoon', 'Teaspoon', 'Gram', 'Kilogram'];

function AddRecipe({ closeModal, handleAddRecipe, cuisines, dietaryPrefs }) {
  const [formFields, setFormFields] = useState({
    title: '',
    cuisine: '',
    dietaryPreference: '',
    ingredients: [{ name: '', quantity: '', measurement: '' }],
    instructions: '',
    servingSize: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = [...formFields.ingredients];
    newIngredients[index][name] = value;
    setFormFields((prevDetails) => ({
      ...prevDetails,
      ingredients: newIngredients,
    }));
  };

  const addIngredient = () => {
    setFormFields((prevDetails) => ({
      ...prevDetails,
      ingredients: [...prevDetails.ingredients, { name: '', quantity: '', measurement: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for empty fields
    if (
      !formFields.title ||
      !formFields.cuisine ||
      !formFields.dietaryPreference ||
      !formFields.instructions ||
      !formFields.servingSize ||
      !formFields.image ||
      formFields.ingredients.some(ing => !ing.name || !ing.quantity || !ing.measurement)
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Create the new recipe object
    const newRecipe = {
      title: formFields.title,
      cuisineNames: [formFields.cuisine],
      dietaryNames: [formFields.dietaryPreference],
      ingredients: formFields.ingredients,
      instructions: formFields.instructions,
      servingSize: formFields.servingSize,
      image: formFields.image,
    };

    // POST the new recipe to backend
    fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then(async (res) => {
        if (res.ok) {
          const createdRecipe = await res.json();
          // Pass back the enriched recipe from backend (includes rating, ids, etc.)
          if (handleAddRecipe) handleAddRecipe(createdRecipe);
          if (closeModal) closeModal();
          alert("Recipe added successfully");
        } else {
          const json = await res.json().catch(() => ({}));
          alert(json.error || json.message || "Failed to add recipe");
        }
      })
      .catch((err) => {
        console.error("Error adding recipe:", err);
        alert("Network error while adding recipe");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2>Add Recipe</h2>
      <input type="text" name="title" placeholder="Recipe Title" value={formFields.title} onChange={handleInputChange} required style={inputStyle} />
      
      <select name="cuisine" value={formFields.cuisine} onChange={handleInputChange} required style={inputStyle}>
        <option value="">Select Cuisine</option>
        {cuisines.map((cuisine, idx) => (
          <option key={idx} value={cuisine.name}>{cuisine.name}</option>
        ))}
      </select>

      <select name="dietaryPreference" value={formFields.dietaryPreference} onChange={handleInputChange} required style={inputStyle}>
        <option value="">Select Dietary Preference</option>
        {dietaryPrefs.map((diet, idx) => (
          <option key={idx} value={diet.name}>{diet.name}</option>
        ))}
      </select>

      {formFields.ingredients.map((ingredient, index) => (
        <div key={index} style={{ display: "flex", gap: "10px" }}>
          <input type="text" name="name" placeholder="Ingredient Name" value={ingredient.name} onChange={(e) => handleIngredientChange(index, e)} required style={inputStyle} />
          <input type="number" name="quantity" placeholder="Quantity" value={ingredient.quantity} onChange={(e) => handleIngredientChange(index, e)} required style={inputStyle} />
          <select name="measurement" value={ingredient.measurement} onChange={(e) => handleIngredientChange(index, e)} required style={inputStyle}>
            <option value="">Select Measurement</option>
            {measurementOptions.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}
      <button type="button" onClick={addIngredient} style={buttonStyle}>Add Ingredient</button>

      <textarea name="instructions" placeholder="Instructions" value={formFields.instructions} onChange={handleInputChange} required style={inputStyle}></textarea>
      <input type="text" name="servingSize" placeholder="Serving Size" value={formFields.servingSize} onChange={handleInputChange} required style={inputStyle} />
      <input type="text" name="image" placeholder="Image URL" value={formFields.image} onChange={handleInputChange} required style={inputStyle} />
      <button type="submit" style={buttonStyle}>Submit Recipe</button>
    </form>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
};

const buttonStyle = {
  padding: "10px 15px",
  border: "none",
  backgroundColor: "#4B2E2E",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AddRecipe;
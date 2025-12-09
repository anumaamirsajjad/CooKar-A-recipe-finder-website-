/**
 * 🎨 DESIGN PATTERNS IMPLEMENTED:
 * 
 * 1. ✅ BUILDER PATTERN:
 *    - formFields state builds recipe object step by step
 *    - Ingredients array built dynamically with addIngredient
 *    - Final recipe constructed in handleSubmit
 * 
 * 2. ✅ COMPOSITE PATTERN:
 *    - AddRecipe contains multiple IngredientRow components
 *    - Form composed of smaller input components
 *    - Tree structure: AddRecipe → IngredientRow[]
 * 
 * 3. ✅ TEMPLATE METHOD PATTERN:
 *    - handleSubmit defines workflow template
 *    - Validate → Build object → API call → Callback → Close
 *    - Fixed sequence of steps
 * 
 * 4. ✅ STRATEGY PATTERN:
 *    - isFormValid encapsulates validation strategy
 *    - Can swap validation rules without changing form
 * 
 * 5. ✅ OBSERVER PATTERN (React State):
 *    - formFields observable, UI reacts to changes
 *    - ingredients array observed for dynamic rendering
 * 
 * 6. ✅ PRESENTER PATTERN:
 *    - IngredientRow is presentational component
 *    - AddRecipe is container managing state
 *
 * 🎨 DESIGN PRINCIPLES APPLIED (SOLID):
 * - SRP: Each component/function has single responsibility
 * - OCP: Adding ingredients without modifying core logic
 * - DRY: Validation and handlers centralized
 */

import React, { useState } from 'react';

// 🔹 CONSTANT: Configuration data (SRP)
const measurementOptions = ['Cup', 'Tablespoon', 'Teaspoon', 'Gram', 'Kilogram'];

// 🔹 PRESENTATIONAL COMPONENT: IngredientRow (COMPOSITE PATTERN element)
// Single ingredient in the composite ingredient list
function IngredientRow({ ingredient, index, handleIngredientChange }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        name="name"
        placeholder="Ingredient Name"
        value={ingredient.name}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        style={inputStyle}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={ingredient.quantity}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        style={inputStyle}
      />
      <select
        name="measurement"
        value={ingredient.measurement}
        onChange={(e) => handleIngredientChange(index, e)}
        required
        style={inputStyle}
      >
        <option value="">Select Measurement</option>
        {measurementOptions.map((option, idx) => (
          <option key={idx} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

// 🔹 CONTAINER COMPONENT: AddRecipe (BUILDER + TEMPLATE METHOD patterns)
// Builds recipe object incrementally and submits via fixed workflow
function AddRecipe({ closeModal, handleAddRecipe, cuisines, dietaryPrefs }) {
  // 🔹 BUILDER PATTERN: Recipe constructed step-by-step through state
  const [formFields, setFormFields] = useState({
    title: '',
    cuisine: '',
    dietaryPreference: '',
    ingredients: [{ name: '', quantity: '', measurement: '' }],
    instructions: '',
    servingSize: '',
    image: '',
  });

  // SRP: Dedicated handler for text input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // SRP: Dedicated handler for ingredient updates
  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formFields.ingredients];
    updatedIngredients[index][name] = value;

    setFormFields((prevDetails) => ({
      ...prevDetails,
      ingredients: updatedIngredients,
    }));
  };

  // 🔹 BUILDER PATTERN: Add ingredient to recipe being built
  // Dynamically extends ingredients array
  const addIngredient = () => {
    setFormFields((prevDetails) => ({
      ...prevDetails,
      ingredients: [...prevDetails.ingredients, { name: '', quantity: '', measurement: '' }],
    }));
  };

  // 🔹 STRATEGY PATTERN: Validation strategy encapsulated
  // Can swap validation rules without changing form logic
  const isFormValid = () => {
    if (
      !formFields.title ||
      !formFields.cuisine ||
      !formFields.dietaryPreference ||
      !formFields.instructions ||
      !formFields.servingSize ||
      !formFields.image
    ) return false;

    return !formFields.ingredients.some(
      (ing) => !ing.name || !ing.quantity || !ing.measurement
    );
  };

  // 🔹 TEMPLATE METHOD PATTERN: Fixed submission workflow
  // Steps: validate → build object → API call → success callback → close modal
  // Sequence is fixed but individual steps can be customized
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill in all fields.");
      return;
    }

    const newRecipe = {
      title: formFields.title,
      cuisineNames: [formFields.cuisine],
      dietaryNames: [formFields.dietaryPreference],
      ingredients: formFields.ingredients,
      instructions: formFields.instructions,
      servingSize: formFields.servingSize,
      image: formFields.image,
    };

    fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    })
      .then(async (res) => {
        if (res.ok) {
          const createdRecipe = await res.json();
          handleAddRecipe && handleAddRecipe(createdRecipe);
          closeModal && closeModal();
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

      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={formFields.title}
        onChange={handleInputChange}
        required
        style={inputStyle}
      />

      <select name="cuisine" value={formFields.cuisine} onChange={handleInputChange} required style={inputStyle}>
        <option value="">Select Cuisine</option>
        {cuisines.map((cuisine, idx) => (
          <option key={idx} value={cuisine.name}>{cuisine.name}</option>
        ))}
      </select>

      <select
        name="dietaryPreference"
        value={formFields.dietaryPreference}
        onChange={handleInputChange}
        required
        style={inputStyle}
      >
        <option value="">Select Dietary Preference</option>
        {dietaryPrefs.map((diet, idx) => (
          <option key={idx} value={diet.name}>{diet.name}</option>
        ))}
      </select>

      {formFields.ingredients.map((ingredient, index) => (
        <IngredientRow
          key={index}
          ingredient={ingredient}
          index={index}
          handleIngredientChange={handleIngredientChange}
        />
      ))}

      <button type="button" onClick={addIngredient} style={buttonStyle}>Add Ingredient</button>

      <textarea
        name="instructions"
        placeholder="Instructions"
        value={formFields.instructions}
        onChange={handleInputChange}
        required
        style={inputStyle}
      />

      <input
        type="text"
        name="servingSize"
        placeholder="Serving Size"
        value={formFields.servingSize}
        onChange={handleInputChange}
        required
        style={inputStyle}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formFields.image}
        onChange={handleInputChange}
        required
        style={inputStyle}
      />

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

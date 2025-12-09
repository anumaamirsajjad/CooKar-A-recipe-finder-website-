import React, { useState } from "react";

const measurementOptions = ["Unit", "Cup", "Tablespoon", "Teaspoon", "Gram", "Kilogram"];

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
        {measurementOptions.map((m, idx) => (
          <option key={idx} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}

function AddRecipe({ closeModal, handleAddRecipe, cuisines, dietaryPrefs }) {
  const [formFields, setFormFields] = useState({
    title: "",
    cuisine: "",
    dietaryPreference: "",
    ingredients: [{ name: "", quantity: "", measurement: "" }],
    instructions: "",
    servingSize: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formFields.ingredients];
    updated[index][name] = value;
    setFormFields((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredient = () => {
    setFormFields((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", measurement: "" }],
    }));
  };

  const isFormValid = () => {
    if (
      !formFields.title ||
      !formFields.cuisine ||
      !formFields.dietaryPreference ||
      !formFields.instructions ||
      !formFields.servingSize ||
      !formFields.image
    )
      return false;
    return !formFields.ingredients.some(
      (ing) => !ing.name || !ing.quantity || !ing.measurement
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return alert("Please fill in all fields.");

    const payload = {
      title: formFields.title,
      instructions: formFields.instructions,
      image: formFields.image,
      servingSize: parseInt(formFields.servingSize), // <-- convert to integer,
      ingredients: formFields.ingredients.map((ing) => ({
        name: ing.name,
        quantity: ing.quantity,
        measurement: ing.measurement,
      })),
      cuisine: formFields.cuisine,
      dietaryPreference: formFields.dietaryPreference,
    };

    try {
      const res = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json();
        return alert(json.error || "Failed to add recipe");
      }

      const createdRecipe = await res.json();
      handleAddRecipe && handleAddRecipe(createdRecipe);
      closeModal && closeModal();
      alert("Recipe added successfully!");
    } catch (err) {
      console.error(err);
      alert("Network error while adding recipe");
    }
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
        {cuisines.map((c, idx) => (
          <option key={idx} value={c.name}>
            {c.name}
          </option>
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
        {dietaryPrefs.map((d, idx) => (
          <option key={idx} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>

      {formFields.ingredients.map((ing, idx) => (
        <IngredientRow
          key={idx}
          ingredient={ing}
          index={idx}
          handleIngredientChange={handleIngredientChange}
        />
      ))}
      <button type="button" onClick={addIngredient} style={buttonStyle}>
        Add Ingredient
      </button>

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
      <button type="submit" style={buttonStyle}>
        Submit Recipe
      </button>
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

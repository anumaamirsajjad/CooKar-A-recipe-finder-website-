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
            CooKar
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
          padding: "20px 100px",
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
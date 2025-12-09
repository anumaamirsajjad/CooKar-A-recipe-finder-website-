// MainPage refactored with SOLID principles (React - JavaScript)

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgLogo from "../assets/images/bg.png";
import AddRecipe from "./addrecipe";
import RecipeCard from "../components/recipecard";

/**
 * 🔹 SERVICE LAYER (SRP + DIP)
 * All API calls moved to separate functions.
 * MainPage component no longer handles fetch logic directly.
 */
const fetchCuisines = async () => {
  const res = await fetch("http://localhost:5000/api/cuisines");
  return res.json();
};

const fetchDietaryPrefs = async () => {
  const res = await fetch("http://localhost:5000/api/dietary-preferences");
  return res.json();
};

const fetchRecipesData = async () => {
  const res = await fetch("http://localhost:5000/api/recipes");
  return res.json();
};

/**
 * 🔹 Ingredient + Dietary helper functions (SRP)
 */
const fetchIngredientsByIds = async (ids) => {
  const res = await fetch("http://localhost:5000/api/ingredients/many", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  return res.ok ? res.json() : [];
};

const fetchDietaryByIds = async (ids) => {
  const res = await fetch(
    "http://localhost:5000/api/dietary-preferences/many",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    }
  );
  return res.ok ? res.json() : [];
};

/**
 * 🔹 PURE FUNCTION TO TRANSFORM RECIPE
 * Applies OCP — extendable without modifying MainPage logic.
 */
const enrichRecipe = async (recipe) => {
  let ingredients = recipe.ingredients || [];
  let dietaryNames = [];

  if (recipe.ingredients?.length) {
    const ids = recipe.ingredients.map((x) => (typeof x === "string" ? x : x.$oid));
    ingredients = await fetchIngredientsByIds(ids);
  }

  if (recipe.diet_ids?.length) {
    const ids = recipe.diet_ids.map((id) => id.$oid || id);
    const dietaryData = await fetchDietaryByIds(ids);
    if (Array.isArray(dietaryData)) dietaryNames = dietaryData.map((d) => d.name);
  }

  return {
    ...recipe,
    ingredients,
    dietaryNames,
    servingSize: recipe.servings || recipe.serving_size || recipe.servings,
  };
};

/**
 * 🔹 OBSERVER PATTERN: Modal State Observer
 * Allows multiple components to react to modal state changes.
 */
class ModalObserver {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notify(eventType, data = null) {
    this.subscribers.forEach(callback => {
      if (typeof callback === 'function') {
        callback(eventType, data);
      }
    });
  }
}

// Create a singleton modal observer instance
export const modalObserver = new ModalObserver();

/** ----------------------------------------------------------------------
 *                          MAIN COMPONENT
 * ---------------------------------------------------------------------- */

function MainPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [dietaryPrefs, setDietaryPrefs] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedDietary, setSelectedDietary] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // OBSERVER PATTERN: Subscribe to modal events
  useEffect(() => {
    const unsubscribe = modalObserver.subscribe((eventType, data) => {
      switch (eventType) {
        case 'MODAL_OPENED':
          console.log('Modal was opened externally');
          break;
        case 'MODAL_CLOSED':
          console.log('Modal was closed externally');
          break;
        case 'RECIPE_ADDED':
          if (data) {
            console.log('New recipe added via observer:', data.title);
          }
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * 🔹 EFFECT HANDLES ONLY COORDINATION — SRP
   * Fetch logic lives in dedicated service functions.
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [cuisineData, dietaryData, recipeData] = await Promise.all([
          fetchCuisines(),
          fetchDietaryPrefs(),
          fetchRecipesData(),
        ]);

        setCuisines(Array.isArray(cuisineData) ? cuisineData : []);
        setDietaryPrefs(Array.isArray(dietaryData) ? dietaryData : []);

        const enrichedRecipes = await Promise.all(recipeData.map(enrichRecipe));
        setRecipes(enrichedRecipes);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /**
   * 🔹 PURE FUNCTION FOR FILTERING (SRP)
   */
  const filterRecipes = (recipesList) => {
    return recipesList.filter((recipe) => {
      const matchesSearch = searchTerm
        ? recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some((ing) =>
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
  };

  const filteredRecipes = filterRecipes(recipes);

  const handleAddRecipe = (recipe) => {
    setRecipes((prev) => [...prev, recipe]);
    setIsModalOpen(false);
    
    // OBSERVER PATTERN: Notify subscribers about the new recipe
    modalObserver.notify('RECIPE_ADDED', recipe);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // OBSERVER PATTERN: Notify subscribers that modal was opened
    modalObserver.notify('MODAL_OPENED');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // OBSERVER PATTERN: Notify subscribers that modal was closed
    modalObserver.notify('MODAL_CLOSED');
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "40px" }}>Loading recipes...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fdf6e3" }}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={bgLogo} alt="Chef Cap" style={styles.logo} />
          <h1 style={styles.title}>CooKar</h1>
        </div>
        <button onClick={handleOpenModal} style={styles.addButton}>
          Add Recipe
        </button>
      </header>

      {/* MODAL */}
      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <button onClick={handleCloseModal} style={modalStyles.closeButton}>X</button>
            <AddRecipe
              closeModal={handleCloseModal}
              handleAddRecipe={handleAddRecipe}
              cuisines={cuisines}
              dietaryPrefs={dietaryPrefs}
            />
          </div>
        </div>
      )}

      {/* SEARCH + FILTERS */}
      <div style={styles.filterContainer}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterRow}>
          <select
            value={selectedDietary}
            onChange={(e) => setSelectedDietary(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Preferences</option>
            {dietaryPrefs.map((diet, idx) => (
              <option key={idx} value={diet.name}>{diet.name}</option>
            ))}
          </select>

          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine, idx) => (
              <option key={idx} value={cuisine.name}>{cuisine.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* RECIPE GRID */}
      <div style={styles.recipeGrid}>
        {filteredRecipes.map((recipe, idx) => (
          <RecipeCard key={idx} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

/** ----------------------------------------------------------------------
 *                         STYLES (SRP)
 * ---------------------------------------------------------------------- */

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  logo: { width: "50px", marginRight: "10px" },
  title: { fontSize: "36px", color: "#4B2E2E", fontWeight: "bold", margin: 0 },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#4B2E2E",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  filterContainer: {
    maxWidth: "80%",
    margin: "20px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  searchInput: {
    width: "97%",
    padding: "14px", borderRadius: "8px",
    border: "1px solid #ccc",
  },
  filterRow: {
    display: "flex",
    gap: "16px", flexWrap: "wrap",
  },
  filterSelect: {
    flex: "1 1 48%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  recipeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
    padding: "20px 100px",
  },
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
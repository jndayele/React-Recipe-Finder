import React, { useState } from "react";
import "./recipeFinder.css";

const RecipeFinder = () => {
  //Setting useStates
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch recipes using fetch() API
  const fetchRecipes = (e) => {
    e.preventDefault();

    const APP_ID = "f76bd12a";
    const APP_KEY = "2524760c6452c4a55070e3e03efa506b"; 
    const API_URL = `/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    // Fetching recipes from the API
    fetch(API_URL, { mode: 'no-cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        if (data.hits.length === 0) {
          setError("No recipes found");
          setRecipes([]);
        } else {
          setRecipes(data.hits);
          setError(null);
        }
      })
      .catch((error) => {
        setError("Unable to fetch recipes. Please try again.");
        console.error("Error fetching recipes:", error);
      });
  };

  return (
    <div className="recipe-finder">
      <h1>Recipe Finder</h1>

      <form onSubmit={fetchRecipes} className="search-form">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {/*Shows an error when its unable to fetch recides */}
      {error && <p className="error-message">{error}</p>}

      {/* Recipe List */}
      <div className="recipe-list">
        {recipes.map((item, index) => (
          <div key={index} className="recipe-card">
            <img
              src={item.recipe.image}
              alt={item.recipe.label}
              className="recipe-image"
            />
            <h2>{item.recipe.label}</h2>
            <p>Calories: {Math.round(item.recipe.calories)}</p>
            <a
              href={item.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="view-recipe"
            >
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFinder;

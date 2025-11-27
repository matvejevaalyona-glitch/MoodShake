
// --- Get references to HTML elements ---
const moodSelect = document.getElementById("moodSelect");
const getCocktailBtn = document.getElementById("getCocktailBtn");
const cocktailResults = document.getElementById("cocktailResults");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

// --- Step 1: Match moods to cocktail search terms ---
const moodToKeyword = {
  happy: "margarita",
  sad: "whiskey",
  tired: "coffee",
  adventurous: "daiquiri",
  stressed: "martini",
  party: "mojito",
  romantic: "bellini",
  chill: "paloma"
};

// Array of hardcoded ironic alcohol quotes
const ironicQuote = [
  "Alcohol may be man’s worst enemy, but the Bible says love your enemy. – Frank Sinatra",
  "I cook with wine, sometimes I even add it to the food. – W.C. Fields",
  "I only drink on two occasions: when I’m thirsty and when I’m not. – Brendan Behan",
  "Always do sober what you said you’d do drunk. – Ernest Hemingway",
  "Work is the curse of the drinking classes. – Oscar Wilde",
  "Too much of anything is bad, but too much good whiskey is barely enough. – Mark Twain",
  "First you take a drink, then the drink takes a drink, then the drink takes you. – F. Scott Fitzgerald",
  "In wine there is wisdom, in beer there is freedom, in water there is bacteria. – Benjamin Franklin",
];

// --- Step 2: Add click event listener to the button ---
getCocktailBtn.addEventListener("click", async () => {
  const mood = moodSelect.value; // Get user’s selected mood
  cocktailResults.innerHTML = ""; // Clear any old results
  errorEl.classList.add("hidden"); // Hide old errors

  // If user hasn’t selected a mood yet
  if (!mood) {
    errorEl.textContent = "Please select a mood first.";
    errorEl.classList.remove("hidden");
    return;
  }

  // --- Step 3: Connect to the external API ---
  const searchTerm = moodToKeyword[mood];
  const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;

  try {
    // --- Step 4: Show loading indicator ---
    loadingEl.classList.remove("hidden");

    // --- Step 5: Make the API request ---
    const response = await fetch(apiUrl);

    // --- Step 6: Check if response is valid ---
    if (!response.ok) {
      console.log('Response status code:', response.status);
      throw new Error(`Something went wrong. Please try again. ${response.status}`);
    }

    // --- Step 7: Parse JSON data ---
    const data = await response.json();
    const drinks = data.drinks;

    // --- Step 8: Handle empty or unexpected data ---
    if (!drinks || drinks.length === 0) {
      throw new Error("No cocktails found for this mood.");
    }

    // --- Step 9: Take only the first 3 cocktails ---
    const limitedDrinks = drinks.slice(0, 3);

    // --- Step 10: Build HTML to display each cocktail ---
    cocktailResults.innerHTML = limitedDrinks
      .map((drink) => {
        const ingredients = Object.keys(drink)
          .filter((key) => key.startsWith("strIngredient") && drink[key])
          .map((key) => drink[key])
          .join(", ");

        return `
          <div class="cocktail">
            <h3>${drink.strDrink}</h3>
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <p><strong>Ingredients:</strong> ${ingredients}</p>
            <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
          </div>
        `;
      })
      .join("");

    // --- Step 11: Add ONE random ironic quote ---
    const randomQuote = ironicQuote[Math.floor(Math.random() * ironicQuote.length)];
    cocktailResults.innerHTML += `<div class="quote">${randomQuote}</div>`;

  } catch (error) {
    console.error("Error fetching cocktails:", error);
    errorEl.textContent = error.message || "Something went wrong. Please try again.";
    errorEl.classList.remove("hidden");
  } finally {
    // --- Step 12: Hide loading indicator ---
    loadingEl.classList.add("hidden");
  }
});
# [MoodShake]

## Team Members
- Member 1 - [Alyona Matvejeva]
- Member 2 - [Zanda Rasa]
- Member 3 - [Jekabs Musins]

## Project Description
Mood Shake is an interactive web application designed to suggest the perfect cocktail based on your current emotional state (mood).
The user selects their mood (e.g., Energetic, Sad, Curious), and the application suggests up to three suitable drinks, including the full recipe, image, and instructions. As an ironic bonus, the application also provides a random Quote of the day to think about while enjoying your coctail.

Unique Features
-Emotional Mapping: Each mood is mapped to a specific ingredient or drink category for targeted API searching.
-Double Query System: The application executes two API requests to ensure data completeness: it first filters drinks by the ingredient, and then requests the full recipe details using the drink's ID.
-Bonus: After retrieving the recipe, the application displays a "Quote of the Day to think about while enjoying your drink" from an internal array, adding an element of philosophy and humor.

## Problem Statement
The application is designed to make it easier to decide which cocktail to prepare or choose based on your mood. It eliminates "choice paralysis" by offering a curated, fun, and personalized solution.

## API Selection
**API Name:** [TheCocktailDB]  
**API Documentation:** [URL(https://www.thecocktaildb.com/api.php)]  
**Why this API?** [The API provides the necessary information about cocktails and the details required for developing the application. The following API is used to fetch cocktail data, recipes, and images.]

1 Simplicity and Accessibility: The API is publicly available (no key required) and has a simple, predictable JSON response structure, making it ideal for rapid prototype development.

2 Data Completeness: It provides all the necessary fields to create a full recipe card, including an image, detailed instructions, and up to 15 "ingredient/measure" pairs.

3 Filtering Functionality: The critical Filter by Ingredient method allows us to directly link a mood to a specific alcoholic or non-alcoholic component.
Notes on Documentation and Data Quality

Error Contract: The documentation does not describe error codes. Testing revealed that when no data is found, the API consistently returns 200 OK with a value of {"drinks": null}, which must be handled in the application logic.

## Technical Implementation

API Integration: Connected to TheCocktailDB using fetch with async/await to retrieve cocktails based on user-selected moods.

Data Handling: Limited results to the first 3 cocktails; extracted and formatted ingredients, instructions, and images for display.

Error Handling: Implemented manual detection of empty API responses (drinks: null), network errors, and unexpected issues, displaying user-friendly messages while logging details to the console.

Random Quote Feature: Added an array of ironic alcohol quotes and displayed one random quote per API request.

Loading Indicator: Shows and hides dynamically while data is being fetched.

# Nuxt 4 Movie App

## Project Overview
This Nuxt 4 application fetches and displays movies from the TMDB (The Movie Database) API. Users can:  

- Browse movies with pagination  
- View details of a selected movie  
- Handle loading, error, and empty states  

State management is handled with **Pinia**, persisting movie data across routes. Environment variables configure the API base URL and API key.

---

## Tech Stack
- Nuxt 4 – main framework  
- Pinia – state management  
- Fetch API – HTTP requests  
- Tailwind CSS – styling  
- TMDB API – movie data source  

---

## Features & Decisions

### Data Fetching
- Movie data is fetched from TMDB using Axios.  
- Base URL and API key are stored in `.env` for security:  
  ```env
  TMDB_API_KEY=<your_api_key>
  TMDB_BASE_URL=https://api.themoviedb.org/3

import { defineStore } from "pinia";
import { ref } from "vue";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string | null;
  vote_average: number;
  vote_count: number;
}

export const useMovieStore = defineStore(
  "movie",
  () => {
    const movies = ref<Movie[]>([]);
    const selectedMovie = ref<Movie | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const currentPage = ref(1); 
    const totalPages = ref(0);

    const fetchMovies = async (page = currentPage.value) => {
      loading.value = true;
      error.value = null;

      try {
        const config = useRuntimeConfig();
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${config.public.TMDB_API_KEY}&language=en-US&page=${page}`;

        const response = await fetch(url);

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        movies.value = data.results || [];
        totalPages.value = data.total_pages;
        currentPage.value = data.page;

        if (!movies.value.length) error.value = "No movies found.";
      } catch (err: any) {
        error.value = err.message || "Failed to fetch movies.";
      } finally {
        loading.value = false;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        fetchMovies(currentPage.value + 1);
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        fetchMovies(currentPage.value - 1);
      }
    };

    const fetchMovieById = async (id: number) => {
      loading.value = true;
      error.value = null;
      selectedMovie.value = null;

      try {
        const config = useRuntimeConfig();
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${config.public.TMDB_API_KEY}&language=en-US`
        );

        if (!res.ok) throw new Error("Failed to fetch movie");

        selectedMovie.value = await res.json();
      } catch (err: any) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    return {
      movies,
      loading,
      selectedMovie,
      error,
      fetchMovies,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      fetchMovieById,
    };
  },
  {
    persist: {
      key: "movieStore",
      storage: {
        getItem: (key: string) => {
          const data = localStorage.getItem(key);
          if (!data) return null;
          const parsed = JSON.parse(data);
          return JSON.stringify({
            movies: parsed.movies,
            currentPage: parsed.currentPage,
          });
        },
        setItem: (key: string, value: string) => {
          localStorage.setItem(key, value);
        },
      },
    },
  }
);

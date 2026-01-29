<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Popular Movies</h1>
    <div
      v-if="movieStore.loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
    >
      <div
        v-for="n in 6"
        :key="n"
        class="bg-gray-800 p-4 rounded-lg animate-pulse"
      >
        <div class="h-64 bg-gray-200 rounded mb-4"></div>
        <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
    <div v-if="movieStore.error" class="text-red-500">
      {{ movieStore.error }}
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      v-if="!movieStore.loading && movieStore.movies.length === 0"
    >
      <div
        v-for="n in 6"
        :key="n"
        class="bg-gray-800 p-4 rounded-lg animate-pulse"
      >
        <div class="h-64 bg-gray-200 rounded mb-4"></div>
        <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <div
        @click="goToMovie(movie.id)"
        v-for="movie in movieStore.movies"
        :key="movie.id"
        class="bg-gray-800 p-4 rounded-[20px]"
      >
        <img
          v-if="movie.poster_path"
          loading="lazy"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="rounded-lg mb-2"
        />
        <h2 class="text-xl text-white font-semibold">{{ movie.title }}</h2>
        <p class="text-sm text-gray-300 truncate">{{ movie.overview }}</p>
        <p class="mt-1 text-gray-400 text-sm">
          Rating: {{ movie.vote_average }} ({{ movie.vote_count }} votes)
        </p>
      </div>
    </div>
    <div
      v-if="movieStore.movies"
      class="flex items-center justify-center gap-4 mt-6"
    >
      <button
        @click="prevPage"
        :disabled="movieStore.currentPage === 1"
        class="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Prev
      </button>
      <span class="text-gray-300">
        Page {{ movieStore.currentPage }} of {{ movieStore.totalPages }}
      </span>
      <button
        @click="nextPage"
        :disabled="movieStore.currentPage === movieStore.totalPages"
        class="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useMovieStore } from "~/stores/movieStore";
import { useRouter } from "vue-router";
const router = useRouter();
const movieStore = useMovieStore();
onMounted(() => {
  movieStore.fetchMovies(1);
});
const goToMovie = (id: number) => {
  router.push(`/movies/${id}`);
};
const nextPage = () => {
  if (movieStore.currentPage < movieStore.totalPages) {
    movieStore.fetchMovies(movieStore.currentPage + 1);
  }
};
const prevPage = () => {
  if (movieStore.currentPage > 1) {
    movieStore.fetchMovies(movieStore.currentPage - 1);
  }
};
</script>

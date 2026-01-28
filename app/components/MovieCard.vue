<template>
  <div
    class="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col items-center"
  >
    <!-- Poster -->
    <img
      v-if="movie.poster_path"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      :alt="movie.title"
      class="rounded-md mb-3 w-full object-cover"
    />
    <div v-else class="bg-gray-700 rounded-md mb-3 w-full h-64 flex items-center justify-center text-gray-400">
      No Image
    </div>

    <!-- Title -->
    <h3 class="text-white font-semibold text-lg text-center">{{ movie.title }}</h3>

    <!-- Release Date -->
    <p class="text-gray-300 text-sm mt-1">{{ movie.release_date || 'Unknown release' }}</p>

    <!-- Rating -->
    <p class="text-yellow-400 text-sm mt-1" v-if="movie.vote_average">
      ⭐ {{ movie.vote_average.toFixed(1) }} / 10
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ movie: any }>()
</script>

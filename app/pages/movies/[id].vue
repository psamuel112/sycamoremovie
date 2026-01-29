

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <button
      @click="goBack"
      class="mb-6 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
    >
      ← Back to List
    </button>

    <LoadingSpinner v-if="movieStore.loading" />

    <div v-if="movieStore.error" class="text-red-500 text-center">
      {{ movieStore.error }}
    </div>

    <div v-if="movieStore.selectedMovie && !movieStore.loading" class="flex flex-col md:flex-row gap-6">
      <img
       loading="lazy"
        v-if="movieStore.selectedMovie.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${movieStore.selectedMovie.poster_path}`"
        class="rounded shadow-md md:w-1/3"
      />

      <div class="flex-1">
        <h1 class="text-4xl font-bold mb-4">
          {{ movieStore.selectedMovie.title }}
        </h1>

        <p class="text-gray-300 mb-4">
          {{ movieStore.selectedMovie.overview }}
        </p>

        <p class="text-gray-400">
          <strong>Rating:</strong> {{ movieStore.selectedMovie.vote_average }} / 10
        </p>

        <p class="text-gray-400 mt-2">
          <strong>Votes:</strong> {{ movieStore.selectedMovie.vote_count }}
        </p>

        <p class="text-gray-400 mt-2" v-if="movieStore.selectedMovie.release_date">
          <strong>Release Date:</strong> {{ movieStore.selectedMovie.release_date }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '~/stores/movieStore'

import LoadingSpinner from '~/components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
useHead({
  title: 'Popular Movies',
})


onMounted(() => {
  const id = Number(route.params.id)
  if (!isNaN(id)) movieStore.fetchMovieById(id)
})


const goBack = () => {
  router.push({ path: '/', query: { page: movieStore.currentPage } })
}
</script>

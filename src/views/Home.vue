<script setup>
import useMovies from '@/composables/useMovies';
import HeroCard from '@/components/HeroCard.vue';
import ListFolded from '@/components/ListFolded.vue';
import Skeleton from "primevue/skeleton";

const { loading, dataPopular, dataTopRated, dataTrending, dataNowPlaying, dataUpcoming, error } = useMovies();
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <template v-if="loading">
      <div class="w-full h-64 flex items-center justify-center bg-gray-200 animate-pulse">
        <Skeleton width="100%" height="100%" animation="wave"></Skeleton>
      </div>
    </template>
    <template v-else-if="error">
      <div class="w-full h-64 flex items-center justify-center text-red-500">
        <p>Error loading data: {{ error.message }}</p>
      </div>
    </template>
    <template v-else>
      <template v-if="dataNowPlaying.length" class="hero-card">
        <HeroCard :movies="dataNowPlaying" />
      </template>
      <template v-else>
        <div class="w-full h-64 flex items-center justify-center bg-gray-200 animate-pulse">
          <Skeleton width="100%" height="100%" animation="wave" />
        </div>
      </template>
      <div class="flex flex-col gap-4" style="padding-top: .5rem; padding-bottom: 9rem;">
        <ListFolded titleList="Upcoming" category="upcoming" :movies="dataUpcoming" />
        <ListFolded titleList="Popular" category="popular" :movies="dataPopular" />
        <ListFolded titleList="Top Rated" category="top_rated" :movies="dataTopRated" />
        <ListFolded titleList="Trending" category="trending" :movies="dataTrending" />
      </div>
    </template>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .hero-card {
    padding-top: 3rem;
  }
}
</style>

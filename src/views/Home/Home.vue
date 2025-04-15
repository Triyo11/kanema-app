<script setup>
import { useMovies } from "./composable";
import HeroCard from '@/components/HeroCard.vue';
import ListMoviesFolded from '@/components/ListMoviesFolded.vue';
import Skeleton from "primevue/skeleton";

const { dataPopular, dataTopRated, dataTrending, dataNowPlaying, dataUpcoming } = useMovies();
</script>

<template>
  <div class="w-full h-screen flex flex-col items-center">
    <template v-if="dataNowPlaying.length">
      <HeroCard :movies="dataNowPlaying" />
    </template>
    <template v-else>
      <div class="w-full h-64 flex items-center justify-center bg-gray-200 animate-pulse">
        <Skeleton width="100%" height="100%" animation="wave" />
      </div>
    </template>
    <div class="flex flex-col gap-4 pt-2 pb-36">
      <ListMoviesFolded titleList="Upcoming" category="upcoming" :movies="dataUpcoming" />
      <ListMoviesFolded titleList="Popular" category="popular" :movies="dataPopular" />
      <ListMoviesFolded titleList="Top Rated" category="top_rated" :movies="dataTopRated" />
      <ListMoviesFolded titleList="Trending" category="trending" :movies="dataTrending" />
    </div>
  </div>
</template>

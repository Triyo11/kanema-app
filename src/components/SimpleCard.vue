<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  movies: {
    type: Array,
    required: true,
    default: () => [],
  }
});

const hoveredMovieId = ref(null);

const router = useRouter();

const setHoveredMovie = (id) => {
  hoveredMovieId.value = id;
};

const clearHoveredMovie = () => {
  hoveredMovieId.value = null;
};

const goToDetailMovie = (id) => {
  // to make not full-reload page
  // full-reload page can cause reset state of store pinia
  router.push(`/detail/${id}`);
  // window.location.href = `/detail/${id}`;
}
</script>

<template>
  <div v-for="movie in movies" :key="movie?.id">
    <button @click="goToDetailMovie(movie?.id)" :id="movie?.id"
      class="simple-card w-56 flex flex-col items-center relative cursor-pointer"
      @mouseover="setHoveredMovie(movie?.id)" @mouseleave="clearHoveredMovie">
      <img :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`" alt="Movie Poster"
        class="w-[350px] h-[350px] object-fill">
      <div v-if="hoveredMovieId === movie?.id"
        class="absolute w-full h-full flex flex-col justify-between bg-[var(--dark-green)]/90 opacity-0 hover:opacity-100 transition-all ease-in-out duration-300">
        <p class="overview-card text-sm text-white text-center text-pretty hyphens-auto px-2 pt-2 line-clamp-5">{{
          movie?.overview }}
        </p>
        <h2
          class="title-card text-xl font-bold bg-[var(--green)] text-[var(--black)] px-2 text-center align-middle w-full truncate">
          {{ movie?.title }}</h2>
      </div>
    </button>
  </div>
</template>
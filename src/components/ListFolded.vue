<script setup>
import { RouterLink } from 'vue-router';
import SimpleCard from '../components/SimpleCard.vue';
import { ref, watchEffect } from 'vue';

const props = defineProps({
  titleList: {
    type: String,
    required: true,
    default: () => "",
  },
  category: {
    type: String,
    required: true,
    default: () => "",
  },
  movies: {
    type: Array,
    required: true,
    default: () => [],
  }
});

const chosenMovies = ref(null);
const scrollContainer = ref(null);

watchEffect(() => {
  const filteredMovies = props.movies.filter(movie => movie.poster_path);
  chosenMovies.value = filteredMovies.splice(0, 10);
});

// onMounted(() => {
//   if (scrollContainer.value) {
//     scrollContainer.value.addEventListener("wheel", (event) => {
//       event.preventDefault();
//       scrollContainer.value.scrollLeft += event.deltaY;
//     });
//   }
// });
</script>

<template>
  <div class="flex flex-col w-[95dvw] gap-2">
    <h2 class="text-2xl sm:text-4xl font-bold text-white">{{ titleList }}</h2>
    <div ref="scrollContainer" class="flex gap-4 overflow-x-auto scroll-style scroll-smooth snap-x snap-mandatory">
      <SimpleCard :movies="chosenMovies" />
      <!-- create "load more" card -->
      <RouterLink :to="`/catalog/${category}`"
        class="flex flex-col items-center justify-center bg-[var(--black)] hover:bg-[var(--dark-green)] text-[var(--white)] transition-all duration-300 ease-in-out"
        style="padding: 2rem; border-width: .15rem; border-color: var(--dark-green);">
        <h2 class="text-white">Load More</h2>
      </RouterLink>
    </div>
  </div>
</template>
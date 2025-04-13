<script setup>
import { RouterLink } from 'vue-router';
import SimpleCard from '../components/SimpleCard.vue';
import { ref, onMounted, watchEffect } from 'vue';

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

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("wheel", (event) => {
      event.preventDefault();
      scrollContainer.value.scrollLeft += event.deltaY;
    });
  }
});
</script>

<template>
  <div class="flex flex-col w-[95dvw] gap-2">
    <div class="flex justify-between items-end">
      <h2 class="text-4xl font-bold text-white">{{ titleList }}</h2>
      <RouterLink :to="`/catalog/${category}`" class="hover:text-[var(--green)]">Load more</RouterLink>
    </div>
    <div ref="scrollContainer" class="flex gap-4 overflow-x-auto scroll-style scroll-smooth snap-x snap-mandatory">
      <SimpleCard :movies="chosenMovies" />
    </div>
  </div>
</template>
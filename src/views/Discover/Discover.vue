<script setup>
import SimpleCard from "@/components/SimpleCard.vue";
import HeaderCatalog from "@/components/HeaderCatalog.vue";
import NotFound from "../NotFound.vue";
import { useDiscoverMovies } from "./composable";
import { ref, watchEffect } from "vue";

const props = defineProps({
  filter: String,
  query: String,
  page: Number,
  title: String,
});

const moviesContainer = ref([]);
const error = ref(null);
const loading = ref(false);

watchEffect(() => {
  const { movies, error, loading } = useDiscoverMovies(props.filter, props.query, props.page);
  moviesContainer.value = movies;
  error.value = error;
  loading.value = loading;
});
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-7xl flex flex-col items-center gap-8">
      <HeaderCatalog :title="`${props.title}'s Movies`" />
      <transition name="fade" mode="out-in">
        <p v-if="loading">Loading...</p>
        <div v-else-if="error">
          <NotFound subTitle="Error while searching movies" />
        </div>
        <div v-else-if="!loading && moviesContainer.length === 0">
          <NotFound subTitle="No movies found" />
        </div>
        <div v-else-if="moviesContainer" class="w-full flex flex-wrap justify-center gap-8">
          <SimpleCard :movies="moviesContainer.value" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
import { ref, watchEffect } from "vue";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/services/api-service";

export const useCatalog = (category, page) => {
  const dataMovies = ref([]);
  const loading = ref(false);
  const error = ref(null);

  switch (category) {
    case "popular":
      fetchPopularMovies(page);
      break;
    case "top_rated":
      fetchTopRatedMovies(page);
      break;
    case "trending":
      fetchTrendingMovies(page);
      break;
    case "upcoming":
      fetchUpcomingMovies(page);
      break;
    default:
      break;
  }

  async function fetchPopularMovies(page) {
    const result = await getPopularMovies(page);
    dataMovies.value = result.data;
    error.value = result.error;
    loading.value = result.loading;
  }

  async function fetchTopRatedMovies(page) {
    const result = await getTopRatedMovies(page);
    dataMovies.value = result.data;
    error.value = result.error;
    loading.value = result.loading;
  }

  async function fetchTrendingMovies(page) {
    const result = await getTrendingMovies(page);
    dataMovies.value = result.data;
    error.value = result.error;
    loading.value = result.loading;
  }

  async function fetchUpcomingMovies(page) {
    const result = await getUpcomingMovies(page);
    dataMovies.value = result.data;
    error.value = result.error;
    loading.value = result.loading;
  }
  
  return { dataMovies, loading, error };
};

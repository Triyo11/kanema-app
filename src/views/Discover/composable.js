import { ref, watchEffect } from "vue";
import { getDiscoverMovies } from "@/services/api-service";

export function useDiscoverMovies(filter, query, page) {
  const movies = ref(null);
  const error = ref(null);
  const loading = ref(true);

  watchEffect(async () => {
    const result = await getDiscoverMovies(filter, query, page);
    movies.value = result.data;
    error.value = result.error;
    loading.value = result.loading;
  });

  return {
    movies,
    error,
    loading,
  };
}

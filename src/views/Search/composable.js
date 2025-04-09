import { ref, watchEffect } from "vue";
import { getSearchMovies } from "@/services/api-service";

export function useSearch(query) {
  const dataSearch = ref([]);
  const error = ref(null);
  const loading = ref(true);

  watchEffect(async () => {
    const result = await getSearchMovies(query, 1);
    dataSearch.value =
      result.data.results?.filter((movie) => movie.poster_path !== null) || [];
    error.value = result.error;
    loading.value = result.loading;
  });

  return { dataSearch, error, loading };
}

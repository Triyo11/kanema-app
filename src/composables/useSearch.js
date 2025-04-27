import { ref, watchEffect } from "vue";
import { getSearchMovies } from "@/services/api-service";

export default function useSearch(query, page) {
  const dataSearch = ref(null);
  const error = ref(null);
  const loading = ref(true);

  watchEffect(async () => {
    const result = await getSearchMovies(query, page);
    dataSearch.value = result.data;
    error.value = result.error;
    loading.value = result.loading;
  });

  return { dataSearch, error, loading };
}

import { ref, watch } from "vue";
import { getSearchMovies } from "@/services/api-service";
import { useRoute } from "vue-router";

export default function useSearch() {
  const route = useRoute();

  const dataSearch = ref([]);
  const error = ref(null);
  const loading = ref(true);

  watch(() => route.params.query, async (query) => {
    const result = await getSearchMovies(query, 1);
    dataSearch.value =
      result.data.results?.filter((movie) => movie.poster_path !== null) || [];
    error.value = result.error;
    loading.value = result.loading;
  }, { immediate: true });

  return { dataSearch, error, loading };
}

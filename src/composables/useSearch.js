import { ref, watchEffect } from "vue";
import { getSearchMovies } from "@/services/api-service";
import { usePaginatorStore } from "../stores/paginatorStore";

export default function useSearch(query) {
  const paginatorStore = usePaginatorStore();
  const currentPage = paginatorStore.currentPage;

  const dataSearch = ref(null);
  const error = ref(null);
  const loading = ref(true);

  watchEffect(async () => {
    const result = await getSearchMovies(query, currentPage + 1);
    dataSearch.value = result.data;
    error.value = result.error;
    loading.value = result.loading;
  });

  return { dataSearch, error, loading };
}

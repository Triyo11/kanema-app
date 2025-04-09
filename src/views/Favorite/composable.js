import { ref, watchEffect } from "vue";
import { useUserStore } from "@/stores/userStore";
import { getFavoritesByEmail } from "@/utils/useSupabase";

export function useFavorites() {
  const userStore = useUserStore();
  const favorites = ref(null);
  const error = ref(null);
  const loading = ref(true);

  watchEffect(async () => {
    const email = userStore.user?.emailAddresses[0].emailAddress;
    if (!email) return;

    const result = await getFavoritesByEmail(email);
    favorites.value = result.data;
    error.value = result.error;
    loading.value = result.loading;
  });

  return {
    favorites,
    error,
    loading,
  };
}

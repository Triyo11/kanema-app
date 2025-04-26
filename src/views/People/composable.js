import { ref, watch } from "vue";
import { getCreditsMovie, getDetailMovie } from "@/services/api-service";
import { useRoute } from "vue-router";

export function usePeopleDetails() {
  const route = useRoute();

  const casts = ref([]);
  const crews = ref([]);
  const movieInfo = ref([]);

  watch(
    () => route.params.movieId,
    async (movieId) => {
      const dataCreditsMovie = await getCreditsMovie(movieId);
      casts.value = dataCreditsMovie.data.cast;
      crews.value = dataCreditsMovie.data.crew;

      const dataDetailMovie = await getDetailMovie(movieId);
      movieInfo.value = dataDetailMovie.data;
    },
    { immediate: true }
  );

  return {
    casts,
    crews,
    movieInfo,
  };
}

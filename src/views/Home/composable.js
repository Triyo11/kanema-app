import { ref, watchEffect } from "vue";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "@/services/api-service";

export function useMovies() {
  const dataPopular = ref([]);
  const dataTopRated = ref([]);
  const dataTrending = ref([]);
  const dataNowPlaying = ref([]);
  const dataUpcoming = ref([]);

  watchEffect(async () => {
    dataPopular.value = (await getPopularMovies(1)).data.results;
    dataTopRated.value = (await getTopRatedMovies(1)).data.results;
    dataTrending.value = (await getTrendingMovies(1)).data.results;
    dataNowPlaying.value = (await getNowPlayingMovies(1)).data.results;
    dataUpcoming.value = (await getUpcomingMovies(1)).data.results;
  });

  return {
    dataPopular,
    dataTopRated,
    dataTrending,
    dataNowPlaying,
    dataUpcoming,
  };
}

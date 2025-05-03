// composables/useMovieDetails.js
import { ref, watch } from "vue";
import {
  getDetailMovie,
  getVideosMovie,
  getCreditsMovie,
  getSimilarMovies,
  getMovieSeriesDetailOmdb,
} from "@/services/api-service";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/stores/userStore";
import { useRoute } from "vue-router";


export default function useMovieDetail() {
  const route = useRoute();

  const detailMovieSeriesOmdb = ref(null);
  const detailedMovie = ref([]);
  const videosMovie = ref([]);
  const genresMovie = ref(null);
  const keyPlayedVideo = ref(null);
  const durationMovie = ref(null);
  const castsMovie = ref([]);
  const crewsMovie = ref([]);
  const similarMovies = ref([]);
  const isFavorite = ref(false);
  const userStore = useUserStore();
  
  const playVideo = (key) => {
    keyPlayedVideo.value = key;
  };

  const calculateDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if ( duration !== 0 ) {
      durationMovie.value = [hours, minutes];
    };
  };

  const checkFavoriteStatus = async () => {
    if (!userStore.user?.emailAddresses[0].emailAddress) return;
    const { data, error } = await supabase
      .from("favorites")
      .select("movie_series_id")
      .eq("email", userStore.user?.emailAddresses[0].emailAddress);

    if (error) {
      console.error("Error fetching favorite data:", error);
      return;
    }

    isFavorite.value = data.some((fav) => fav.movie_series_id.includes(route.params.id));
  };

  const toggleFavorite = async () => {
    if (!userStore.user?.emailAddresses[0].emailAddress) {
      console.error("User not logged in. Cannot toggle favorite.");
      return;
    }

    if (isFavorite.value) {
      const { data, error: fetchError } = await supabase
        .from("favorites")
        .select("movie_series_id")
        .eq("email", userStore.user?.emailAddresses[0].emailAddress)
        .single();

      if (fetchError) {
        console.error("Error fetching favorite data:", fetchError);
        return;
      }

      if (data.movie_series_id.length === 1 && data.movie_series_id[0] === route.params.id) {
        // If only one ID exists and matches id, delete the entire email record
        const { error: deleteError } = await supabase
          .from("favorites")
          .delete()
          .eq("email", userStore.user?.emailAddresses[0].emailAddress);

        if (deleteError) {
          console.error("Error removing favorite:", deleteError);
          return;
        }
      } else {
        // Otherwise, filter out the ID from the movie_series_id array
        const updatedMovieSeriesId = data.movie_series_id.filter(
          (id) => id !== route.params.id
        );
        const { error: updateError } = await supabase
          .from("favorites")
          .update({ movie_series_id: updatedMovieSeriesId })
          .eq("email", userStore.user?.emailAddresses[0].emailAddress);

        if (updateError) {
          console.error("Error updating favorite:", updateError);
          return;
        }
      }

      isFavorite.value = false;
    } else {
      const { data, error: fetchError } = await supabase
        .from("favorites")
        .select("movie_series_id")
        .eq("email", userStore.user?.emailAddresses[0].emailAddress)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 indicates no rows found
        console.error("Error fetching favorite data:", fetchError);
        return;
      }

      if (!data) {
        // Email does not exist, insert new record
        const { error: insertError } = await supabase.from("favorites").insert({
          email: userStore.user?.emailAddresses[0].emailAddress,
          movie_series_id: [route.params.id],
        });

        if (insertError) {
          console.error("Error adding favorite:", insertError);
          return;
        }
      } else {
        // Email exists, update movie_series_id
        const updatedMovieSeriesId = [
          ...new Set([...data.movie_series_id, route.params.id]),
        ]; // Ensure no duplicates
        const { error: updateError } = await supabase
          .from("favorites")
          .update({ movie_series_id: updatedMovieSeriesId })
          .eq("email", userStore.user?.emailAddresses[0].emailAddress);

        if (updateError) {
          console.error("Error updating favorite:", updateError);
          return;
        }
      }

      isFavorite.value = true;
    }
  };

  watch(() => route.params.id, async (id) => {
    const dataDetailMovie = await getDetailMovie(id);
    detailedMovie.value = dataDetailMovie.data;
    genresMovie.value = dataDetailMovie.data.genres;

    const dataDetailMovieSeriesOmdb = await getMovieSeriesDetailOmdb(detailedMovie.value.title || detailedMovie.value.name);
    detailMovieSeriesOmdb.value = dataDetailMovieSeriesOmdb;

    const dataVideosMovie = await getVideosMovie(id);
    videosMovie.value = dataVideosMovie.data.results;

    calculateDuration(detailedMovie?.value.runtime);

    const dataCreditsMovie = await getCreditsMovie(id);
    castsMovie.value = dataCreditsMovie.data.cast.slice(0, 9);
    crewsMovie.value = dataCreditsMovie.data.crew;

    const dataSimilarMovies = await getSimilarMovies(id);
    similarMovies.value = dataSimilarMovies.data.results;
  }, { immediate: true });

  watch(() => route.params.id, () => {
    checkFavoriteStatus();
  }, { immediate: true });

  return {
    detailedMovie,
    detailMovieSeriesOmdb,
    videosMovie,
    genresMovie,
    keyPlayedVideo,
    durationMovie,
    castsMovie,
    similarMovies,
    isFavorite,
    playVideo,
    toggleFavorite,
  };
}

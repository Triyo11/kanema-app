import { supabase } from "../lib/supabase";
import { getDetailMovie } from "../services/api-service";

export const getFavoritesByEmail = async (email) => {
  let loading = true;
  let data, error;

  try {
    const { data: favorites, error: fetchError } = await supabase
      .from("favorites")
      .select("movie_series_id")
      .eq("email", email);

    if (fetchError) throw fetchError;

    const movieDetails = [];
    const ids = favorites.map((favorite) => favorite.movie_series_id).flat();
    for (const id of ids) {
      try {
        const detail = await getDetailMovie(id);
        if (detail) movieDetails.push(detail.data);
      } catch (error) {
        console.error(`Error fetching details for movie ID ${id}:`, error);
      }
    }

    data = movieDetails;
  } catch (err) {
    error = err.message;
    console.error("Error fetching favorites:", err);
  } finally {
    loading = false;
  }

  return { data, error, loading };
};

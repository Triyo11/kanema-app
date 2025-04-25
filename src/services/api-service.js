const API_URL_TMDB = import.meta.env.VITE_API_URL_TMDB;
const ACCESS_TOKEN_TMDB = import.meta.env.VITE_ACCESS_TOKEN_TMDB;
const API_URL_OMDB = import.meta.env.VITE_API_URL_OMDB;
const API_KEY_OMDB = import.meta.env.VITE_API_KEY_OMDB;

const fetchDataTmdb = async (url) => {
  let data = null;
  let error = null;
  let loading = true;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN_TMDB}`,
      },
    });
    data = await response.json();
  } catch (err) {
    error = err;
  } finally {
    loading = false;
  }

  return { data, error, loading };
};

const fetchDataOmdb = async (url) => {
  let data = null;
  let error = null;
  let loading = true;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await response.json();
  } catch (err) {
    error = err;
  } finally {
    loading = false;
  }

  return { data, error, loading };
};

export const getMovieSeriesDetailOmdb = async (query) => {
  return await fetchDataOmdb(`/api/?apikey=${API_KEY_OMDB}&t=${query}`);
};

export const getPopularMovies = async (page) => {
  return await fetchDataTmdb(
    `${API_URL_TMDB}/movie/popular?language=en-US&page=${page}&region=ID`
  );
};

export const getTopRatedMovies = async (page) => {
  return await fetchDataTmdb(
    `${API_URL_TMDB}/movie/top_rated?language=en-US&page=${page}&region=ID`
  );
};

export const getTrendingMovies = async (page) => {
  return await fetchDataTmdb(
    `${API_URL_TMDB}/trending/movie/day?language=en-US&page=${page}&region=ID`
  );
};

export const getNowPlayingMovies = async (page) => {
  return await fetchDataTmdb(
    `${API_URL_TMDB}/movie/now_playing?language=en-US&page=${page}&region=ID`
  );
};

export const getUpcomingMovies = async (page) => {
  return await fetchDataTmdb(
    `${API_URL_TMDB}/movie/upcoming?language=en-US&page=${page}&region=ID`
  );
};

export const getDetailMovie = async (id) => {
  return await fetchDataTmdb(`${API_URL_TMDB}/movie/${id}?language=en-US`);
};

export const getVideosMovie = async (id) => {
  return await fetchDataTmdb(
    `${API_URL_TMDB}/movie/${id}/videos?language=en-US`
  );
};

export const getGenresMovie = async () => {
  return await fetchDataTmdb(`${API_URL_TMDB}/genre/movie/list?language=en-US`);
};

export const getCreditsMovie = async (id) => {
  return await fetchDataTmdb(
    `${API_URL_TMDB}/movie/${id}/credits?language=en-US`
  );
};

export const getSimilarMovies = async (id) => {
  return await fetchDataTmdb(
    `${API_URL_TMDB}/movie/${id}/similar?language=en-US`
  );
};

export const getSearchMovies = async (query, page) => {
  return await fetchDataTmdb(
    `${API_URL_TMDB}/search/movie?query=${query}&language=en-US&page=${page}&region=ID`
  );
};

export const getDiscoverMovies = async (filter, query, page) => {
  return await fetchDataTmdb(
    `${API_URL_TMDB}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&${filter}=${query}`
  );
};

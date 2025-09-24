import { MovieDetails, MovieResponse } from "@/types/interfaces";
import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_AUTH_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_DETAIL_URL = "https://api.themoviedb.org/3/movie/";
const TMDB_URL =
  "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc";

if (!API_TOKEN) {
  throw new Error("API token is not defined");
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_AUTH_TOKEN}`,
  },
});

export default api;

export async function searchMovies(query: string, page: number = 1) {
  if (!query) return null;

  const response = await api.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_TOKEN,
      query,
      page,
    },
  });

  return response.data;
}

export async function fetchMovies(page: number = 1): Promise<MovieResponse> {
  const safePage = Math.min(Math.max(page, 1), 500); // Ensure page is between 1 and 500 to obey TMBD limits
  const response = await api.get(TMDB_URL + `&page=${safePage}`, {
    params: { api_key: process.env.NEXT_PUBLIC_TMDB_AUTH_TOKEN },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch movies");
  }
  return response.data;
}

export async function fetchMovieDetails(movieId: string): Promise<MovieDetails> {
  const res = await fetch(
    MOVIE_DETAIL_URL + `${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to load movie details");

  return res.json();
}

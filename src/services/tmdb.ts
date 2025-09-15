import { MovieResponse } from "@/types/interfaces";
import api from "@/utils/api";

const TMDB_URL =
  "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&page=1";

export async function fetchMovies(page: number = 1): Promise<MovieResponse> {
  const response = await api.get(TMDB_URL + `&page=${page}`, {
    params: { api_key: process.env.NEXT_PUBLIC_TMDB_AUTH_TOKEN },
  });
  return response.data;
}

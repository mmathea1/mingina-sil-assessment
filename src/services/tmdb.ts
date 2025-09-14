import { Movie } from "@/types/movie";
import api from "@/utils/api";

const TMDB_URL =
  "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&page=1";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(page: number = 1): Promise<MoviesResponse> {
  const response = await api.get(TMDB_URL + `&page=${page}`);
  return response.data;
}

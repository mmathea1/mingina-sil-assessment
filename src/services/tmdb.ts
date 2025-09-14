import api from "@/utils/api";

export async function fetchMovies() {
  const response = await api.get(`https://api.themoviedb.org/3/trending/movie/week?language=en-US`);
  return response.data.results;
}

import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_AUTH_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

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

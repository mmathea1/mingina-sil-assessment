import HomeWrapper from "@/components/HomeWrapper";
import { MovieResponse } from "@/types/interfaces";
import { fetchMovies } from "@/services/api";

export default async function Home() {
  const data: MovieResponse = await fetchMovies(1);
  return <HomeWrapper initialData={data} />;
}

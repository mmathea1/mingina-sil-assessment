import { Movie } from "@/types/interfaces";
import { searchMovies } from "@/services/api";
import SearchWrapper from "@/components/SearchWrapper";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  // const searchParams = useSearchParams();
  const query = searchParams.query || "";
  let movies: Movie[] = [];

  if (query) {
    const data = await searchMovies(query);
    movies = data?.results || [];
  }

  return <SearchWrapper movies={movies} query={query} />;
}

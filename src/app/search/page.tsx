import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/interfaces";
import { searchMovies } from "@/utils/api";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  // const searchParams = useSearchParams();
  const query = searchParams.query || "";
  const movies = [];

  if (query) {
    const data = await searchMovies(query);
    movies.push(...(data?.results || []));
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-6 justify-center">
      {movies.length > 0 ? (
        movies.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <p> No Results Found </p>
      )}
    </main>
  );
}

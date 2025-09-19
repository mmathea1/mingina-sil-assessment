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
  let movies: Movie[] = [];

  if (query) {
    const data = await searchMovies(query);
    movies = data?.results || [];
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-6 justify-center">
      {movies.length > 0 ? (
        movies.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <div className="flex flex-col items-center justify-center mt-10 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m2 9H7a2 2 0 01-2-2V5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v12a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-lg font-medium"> No Results Found For: &quot; {query} &quot; </p>
        </div>
      )}
    </main>
  );
}

import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/interfaces";
import { searchMovies } from "@/utils/api";
import { FileQuestionMark } from "lucide-react";

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
          <FileQuestionMark className="w-24 h-24 text-gray-400 p-2" />
          <p className="text-lg font-medium p2"> No Results Found For: &quot; {query} &quot; </p>
        </div>
      )}
    </main>
  );
}

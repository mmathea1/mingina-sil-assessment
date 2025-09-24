"use client";

import { Movie } from "@/types/interfaces";
import { FileQuestionMark } from "lucide-react";
import MovieCard from "./MovieCard";
import MovieDetailModal from "./MovieDetailModal";
import { useEffect, useState } from "react";
import { searchMovies } from "@/services/api";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setTotalPages(1);
      return;
    }

    const fetchResults = async () => {
      const data = await searchMovies(query, currentPage);
      setMovies(data?.results || []);
      setTotalPages(data?.total_pages || 1);
    };

    fetchResults();
  }, [query, currentPage]);

  return (
    <main className="p-6">
      {movies.length > 0 && (
        <h3 className="text-xl font-medium text-gray-600 mb-6 gap-6">
          Showing Results For:
          <span className="text-blue-500"> &quot; {query} &quot; </span>
        </h3>
      )}
      <div className="flex flex-col items-center space-y-4 fixed right-4 top-1/3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-6 justify-center">
        {movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={handleOpenModal} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
            <FileQuestionMark className="w-24 h-24 text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-600">
              No results found for:
              <span className="text-blue-500"> {query}</span>
            </p>
          </div>
        )}
      </div>
      <MovieDetailModal movie={selectedMovie} isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}

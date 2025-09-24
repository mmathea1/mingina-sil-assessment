"use client";

import { Movie } from "@/types/interfaces";
import { FileQuestionMark } from "lucide-react";
import MovieCard from "./MovieCard";
import MovieDetailModal from "./MovieDetailModal";
import { useState } from "react";

export default function SearchWrapper({ movies, query }: { movies: Movie[]; query: string }) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };
  return (
    <main className="p-6">
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

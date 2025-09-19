"use client";

import MovieCard from "@/components/MovieCard";
import MovieDetailModal from "@/components/MovieDetailModal";
import Pagination from "@/components/Pagination";
import { fetchMovies } from "@/services/tmdb";
import { Movie, MovieResponse } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<MovieResponse>({
    queryKey: ["movies", currentPage],
    queryFn: () => fetchMovies(currentPage),
  });

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <main className="p-6">
      <div className="flex flex-col items-center space-y-4 fixed right-4 top-1/3">
        <Pagination
          currentPage={currentPage}
          totalPages={data?.total_pages ?? 1}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-6 justify-center">
        {data?.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={handleOpenModal} />
        ))}
      </div>

      <MovieDetailModal movie={selectedMovie} isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}

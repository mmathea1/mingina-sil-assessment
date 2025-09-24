"use client";

import MovieCard from "@/components/MovieCard";
import MovieDetailModal from "@/components/MovieDetailModal";
import Pagination from "@/components/Pagination";
import { fetchMovies } from "@/services/api";
import { Movie, MovieResponse } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function HomeWrapper({ initialData }: { initialData: MovieResponse }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialData.total_pages || 1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<MovieResponse>({
    queryKey: ["movies", currentPage],
    queryFn: () => fetchMovies(currentPage),
    initialData,
  });

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (data?.total_pages) {
      setMovies(data?.results || []);
      setTotalPages(data.total_pages);
    }

    const fetchResults = async () => {
      const data = await fetchMovies(currentPage);
      setMovies(data?.results || []);
      setTotalPages(data?.total_pages || 1);
    };

    fetchResults();
  }, [data, currentPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <main className="p-6 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-6 justify-center">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={handleOpenModal} />
        ))}
      </div>
      <div className="sticky bottom-0 flex justify-center py-4 bg-white/70 backdrop-blur-sm">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <MovieDetailModal movie={selectedMovie} isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}

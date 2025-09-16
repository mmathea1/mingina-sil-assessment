"use client";

import Pagination from "@/components/Pagination";
import { fetchMovies } from "@/services/tmdb";
import { Movie, MovieResponse } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MOVIE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery<MovieResponse>({
    queryKey: ["movies", currentPage],
    queryFn: () => fetchMovies(currentPage),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <div className="flex">
      {/* pagination sidebar */}
      <div className="flex flex-col items-center space-y-4 fixed right-4 top-1/3">
        <Pagination
          currentPage={currentPage}
          totalPages={data?.total_pages ?? 1}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.results.map((movie: Movie) => (
          <div key={movie.id} className="movie-card">
            <img src={MOVIE_POSTER_URL + `${movie.poster_path}`} alt={movie.title} />
            <div>
              <h3>{movie.title}</h3>
              <span>{movie.vote_average}</span>
            </div>
            <div>
              <h3>{movie.overview}</h3>
              <p></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

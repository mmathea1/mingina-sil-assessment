"use client";

import { fetchMovies } from "@/services/tmdb";
import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

const MOVIE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchMovies(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <div className="">
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
  );
}

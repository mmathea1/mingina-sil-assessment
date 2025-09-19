"use client";

import { Movie } from "@/types/interfaces";

const MOVIE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

type MovieCardProps = {
  movie: Movie;
  onClick?: (movie: Movie) => void;
};

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const getRatingColor = (vote: number) => {
    if (vote >= 7) return "text-green-400 bg-primary px-2 py-1 rounded font-bold";
    if (vote >= 5 && vote < 7) return "text-orange-400 bg-primary px-2 py-1 rounded font-bold";
    return "text-red-400 bg-primary px-2 py-1 rounded font-bold";
  };

  return (
    <div className="movie-card card shadow-lg relative" onClick={() => onClick?.(movie)}>
      {movie.poster_path ? (
        <img
          src={`${MOVIE_POSTER_URL}${movie.poster_path}`}
          alt={movie.title}
          className="rounded-t w-full"
        />
      ) : (
        <div className="h-80 flex items-center justify-center bg-gray-200 rounded-t">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <div className=" movie-info flex justify-between items-center px-4 py2 text-white">
        <h3 className="font-bold text-gray-700 mb-2" data-testid="movie-title">
          {movie.title}
        </h3>
        <span className={getRatingColor(movie.vote_average)} data-testid="vote_average">
          {movie.vote_average.toFixed(1)}
        </span>
      </div>

      <div className="movie-overview">
        <h3 className="font-bold text-gray-700 mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-700">{movie.overview}</p>
      </div>
    </div>
  );
}

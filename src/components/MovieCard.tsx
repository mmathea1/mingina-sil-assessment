"use client";

import { Movie } from "@/types/interfaces";

const MOVIE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const ratingColor =
    movie.vote_average >= 7
      ? "text-green-500"
      : movie.vote_average >= 5
        ? "text-yellow-500"
        : "text-red-500";
  return (
    <div className="movie-card card shadow-lg relative">
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
      <div className=" movie-info">
        <h3 className="font-bold text-gray-700 mb-2">{movie.title}</h3>
        <span className={ratingColor}>{movie.vote_average.toFixed(1)}</span>
      </div>

      <div className="movie-overview">
        <h3 className="font-bold text-gray-700 mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-700">{movie.overview}</p>
      </div>
    </div>
  );
}

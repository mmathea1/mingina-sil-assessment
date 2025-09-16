"use client";

import { Movie } from "@/types/interfaces";

const MOVIE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="movie-card card w-72 bg-secondary shadow-lg overflow-hidden relative">
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
      <div className="card-body p-4 movie-info">
        <h3 className="font-bold text-gray-700 mb-2">{movie.title}</h3>
        <span className="movie-vote-average">{movie.vote_average}</span>
        <span className="movie-vote-average">{movie.release_date}</span>
        <div className="movie-overview">
          <p className="text-sm text-gray-700">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

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
        <figure>
          <img
            src={`${MOVIE_POSTER_URL}${movie.poster_path}`}
            alt={movie.title}
            className="rounded-t"
          />
        </figure>
      ) : (
        <div className="h-80 flex items-center justify-center bg-gray-200 rounded-t">
          <span>No Image</span>
        </div>
      )}
      <div className="card-body p-4 movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div>
          <span className="movie-vote-average">{movie.vote_average}</span>
          <span className="movie-vote-average">{movie.release_date}</span>
        </div>
        <p className="movie-overview">{movie.overview}</p>
      </div>
    </div>
  );
}

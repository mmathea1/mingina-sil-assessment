"use client";

import { Movie } from "@/types/interfaces";
import { Heart, ThumbsDown, ThumbsUp, X } from "lucide-react";

const MOVIE_POSTER_URL = "https://image.tmdb.org/t/p/w500";

export type MovieModalProps = {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
};
export default function MovieDetailModal({ movie, isOpen, onClose }: MovieModalProps) {
  if (!isOpen || !movie) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl relative p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-blue-700"
        >
          <X className="w-6 h-7" />
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`${MOVIE_POSTER_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold">{movie.title}</h3>
            <p className="text-sm text-gray-600">{movie.release_date}</p>
            <p className="text-sm text-gray-500 mt-1">{movie.popularity}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 my-4">
          <button
            className="btn btn-outline flex items-center gap-2 tooltip tooltip-bottom"
            data-tip="Upvote"
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button
            className="btn btn-outline flex items-center gap-2 tooltip tooltip-bottom"
            data-tip="Downvote"
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
          <button
            className="btn btn-primary flex items-center gap-2 tooltip tooltip-bottom"
            data-tip="Favorite"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Overview */}
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Movie Overview</h4>
          <p className="text-gray-700">{movie.overview}</p>
        </div>

        {/* Extra Action */}
        <div className="mt-6 text-right">
          <button className="btn btn-secondary">View More</button>
        </div>
      </div>
    </div>
  );
}

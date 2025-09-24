"use client";

import { fetchMovieDetails } from "@/services/api";
import { Movie, MovieDetails } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import { Flame, Heart, Loader, ThumbsDown, ThumbsUp, X } from "lucide-react";
import Image from "next/image";

const MOVIE_POSTER_URL = "https://image.tmdb.org/t/p/w500";
const CDN_BASE = "https://image.tmdb.org/t/p";
const LOGO_SIZE = "/w185";

export type MovieModalProps = {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
};
export default function MovieDetailModal({ movie, isOpen, onClose }: MovieModalProps) {
  const { data, isLoading, isError } = useQuery<MovieDetails>({
    queryKey: ["movieDetails", movie?.id],
    queryFn: () => fetchMovieDetails(movie!.id.toString()),
    enabled: !!movie && isOpen,
    staleTime: 1000 * 60 * 5,
  });

  if (!isOpen || !movie) return null;

  // const movieDetails = data || {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-11/12 max-w-5xl relative p-6 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="btn btn-circle absolute top-3 right-3 text-gray-500 hover:text-blue-700 focus:outline-none focus:ring-0 border-0 shadow-none tooltip tooltip-bottom"
          data-tip="Close"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Loading / Error states */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="animate-spin w-10 h-10 text-blue-500" />
          </div>
        ) : isError || !data ? (
          <div className="text-center text-red-600">Failed to load details.</div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                {data.poster_path ? (
                  <Image
                    src={`${MOVIE_POSTER_URL}${data.poster_path}`}
                    alt={data.title}
                    width={300}
                    height={450}
                    className="rounded-lg shadow-md object-cover"
                    priority
                  />
                ) : (
                  <div className="w-[300px] h-[450px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              {/* Right column: info */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900">{data.title}</h2>
                {data.tagline ? (
                  <p className="italic text-gray-600 mt-1">“{data.tagline}”</p>
                ) : null}

                <div className="mt-2 text-md text-gray-600 space-y-1">
                  <p>Released: {new Date(data.release_date).getFullYear() || "—"}</p>
                  <p>Runtime: {typeof data.runtime === "number" ? `${data.runtime} min` : "—"}</p>
                  <p>
                    Rating:{" "}
                    {typeof data.vote_average === "number" ? data.vote_average.toFixed(1) : "—"} /
                    10
                  </p>
                  {data.genres?.length ? (
                    <p>Genres: {data.genres.map((g) => g.name).join(", ")}</p>
                  ) : null}
                </div>

                {/* Production companies */}
                {data.production_companies?.length ? (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      Production Companies
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {data.production_companies.map((c) => (
                        <div key={c.id} className="flex items-center gap-2">
                          {c.logo_path ? (
                            <Image
                              src={`${CDN_BASE}${LOGO_SIZE}${c.logo_path}`}
                              alt={c.name}
                              width={80}
                              height={40}
                              className="object-contain"
                            />
                          ) : null}
                          <span className="text-sm text-gray-700">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Actions + metrics */}
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <button
                    className="btn btn-circle btn-ghost hover:bg-green-100 focus:outline-none focus:ring-0 border-0 shadow-none tooltip tooltip-bottom"
                    data-tip="Upvote"
                    aria-label="Upvote"
                  >
                    <ThumbsUp className="w-5 h-5 text-green-500" />
                  </button>
                  <button
                    className="btn btn-circle btn-ghost hover:bg-red-100 focus:outline-none focus:ring-0 border-0 shadow-none tooltip tooltip-bottom"
                    data-tip="Downvote"
                    aria-label="Downvote"
                  >
                    <ThumbsDown className="w-5 h-5 text-red-500" />
                  </button>
                  <button
                    className="btn btn-circle btn-ghost hover:bg-blue-100 focus:outline-none focus:ring-0 border-0 shadow-none tooltip tooltip-bottom"
                    data-tip="Favorite"
                    aria-label="Favorite"
                  >
                    <Heart className="w-5 h-5 text-blue-500" />
                  </button>

                  {/* Popularity pill */}
                  <div
                    className="flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-full tooltip tooltip-bottom"
                    data-tip="Popularity"
                    aria-label="Popularity"
                  >
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-orange-700 font-semibold">
                      {Math.round(data.popularity ?? movie.popularity ?? 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-gray-700 leading-relaxed">
                {data.overview || "No overview available."}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

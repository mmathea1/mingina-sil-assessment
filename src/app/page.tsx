"use client";

import { fetchMovies } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchMovies(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <div className="">
      {data.map((movie: any) => (
        <div key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div>
            <h3>{movie.title}</h3>
            <span></span>
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

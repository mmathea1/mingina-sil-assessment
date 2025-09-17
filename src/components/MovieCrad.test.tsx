import { Movie } from "@/types/interfaces";
import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";

const mockMovie: Movie = {
  id: "2345356",
  title: "Inception",
  poster_path: "/poster.jpg",
  overview: "A mind bending thriller",
  vote_average: 8.6,
  release_date: "2010-07-16",
  rating: null,
};

describe("MovieCard", () => {
  it("renders movie title in both info and overview", () => {
    render(<MovieCard movie={mockMovie} />);
    const titles = screen.getAllByText("Inception");
    expect(titles).toHaveLength(2);
  });

  it("renders movie poster image", () => {
    render(<MovieCard movie={mockMovie} />);
    const posterElement = screen.getAllByAltText("Inception") as HTMLImageElement[];
    expect(posterElement[0].src).toContain(mockMovie.poster_path);
  });
});

import { Movie } from "@/types/interfaces";
import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";

const mockMovie: Movie = {
  id: "2345356",
  title: "Inception",
  poster_path: "/poster.jpg",
  overview: "A mind bending thriller",
  vote_average: 7.598,
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

  it("renders placeholder when no poster is available", () => {
    const movieNoPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieNoPoster} />);
    const placeholderElement = screen.getByText("No Image");
    expect(placeholderElement).toBeInTheDocument();
  });

  it("renders vote_average with one decimal point", () => {
    render(<MovieCard movie={mockMovie} />);
    const voteAverageElement = screen.getByTestId("vote_average");
    expect(voteAverageElement.textContent).toBe(mockMovie.vote_average.toFixed(1));
  });

  it("applies green color class for high rating", () => {
    const highRatedMovie = { ...mockMovie, vote_average: 8.2 };
    render(<MovieCard movie={highRatedMovie} />);
    const rating = screen.getByText("8.2");
    expect(rating).toHaveClass("text-green-400");
  });
});

jest.mock("@/utils/api", () => ({
  searchMovies: jest.fn(),
}));

import { Movie } from "@/types/interfaces";
import { searchMovies } from "@/utils/api";
import SearchResultsPage from "./page";
import { render } from "@testing-library/react";

const mockMovie: Movie = {
  id: "2345356",
  title: "Inception",
  poster_path: "/poster.jpg",
  overview: "A mind bending thriller",
  vote_average: 7.598,
  release_date: "2010-07-16",
  rating: null,
};

describe("Search Page", () => {
  it("renders search results after submitting a search query", async () => {
    (searchMovies as jest.Mock).mockResolvedValue({
      results: [{ mockMovie }],
    });

    render(<SearchResultsPage searchParams={{ query: "Inception" }} />);
  });
});

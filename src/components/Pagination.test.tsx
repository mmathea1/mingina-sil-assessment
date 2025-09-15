import { render, screen } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders pagination buttons correctly", () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});

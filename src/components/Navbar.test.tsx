import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Navbar", () => {
  it("renders brand button", () => {
    render(<Navbar />);
    expect(screen.getByText("Ming Movies")).toBeInTheDocument();
  });
});

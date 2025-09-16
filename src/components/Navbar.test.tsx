import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    prefetch: jest.fn(),
  }),
}));

describe("Navbar", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renders logo button", () => {
    render(<Navbar />);
    expect(screen.getByText("Ming Movies")).toBeInTheDocument();
  });

  it("navigates to home page when logo is clicked", async () => {
    const user = userEvent.setup();

    render(<Navbar />);
    const logo = screen.getByText("Ming Movies");

    await user.click(logo);

    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it("navigates to search page with query when search is submitted", async () => {
    render(<Navbar />);
    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "Inception" } });
    expect((input as HTMLInputElement).value).toBe("Inception");

    const form = input.closest("form");
    fireEvent.submit(form!);
    expect(pushMock).toHaveBeenCalledWith("/search?query=Inception");
  });

  it("does not navigate when search is submitted with empty query", async () => {
    render(<Navbar />);
    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "  " } });
    const form = input.closest("form");
    fireEvent.submit(form!);
    expect(pushMock).not.toHaveBeenCalled();
  });
});

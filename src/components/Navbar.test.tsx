import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Navbar", () => {
  it("renders brand button", () => {
    render(<Navbar />);
    expect(screen.getByText("Ming Movies")).toBeInTheDocument();
  });

  it("navigates to home page when logo is clicked", async () => {
    const user = userEvent.setup();
    (usePathname as jest.Mock).mockReturnValue("/search");

    render(<Navbar />);
    const logo = screen.getByText("Ming Movies");

    await user.click(logo);

    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });
});

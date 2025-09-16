import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe("Navbar", () => {
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
});

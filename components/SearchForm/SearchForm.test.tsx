import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchForm } from "./SearchForm";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("SearchForm", () => {
  const mockRouter = { push: jest.fn() };
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input and button", () => {
    render(<SearchForm />);

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("uses URL search param as initial value", () => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn().mockReturnValue("test query"),
    }));

    render(<SearchForm />);

    expect(screen.getByRole("searchbox")).toHaveValue("test query");
  });

  it("prevents submission when input contains only whitespace", () => {
    render(<SearchForm />);

    const searchInput = screen.getByRole("searchbox");
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "   " } });
    fireEvent.click(searchButton);

    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it("prevents submission when value hasn't changed", () => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn().mockReturnValue("test query"),
    }));

    render(<SearchForm />);

    const searchInput = screen.getByRole("searchbox");
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "test query" } });
    fireEvent.click(searchButton);

    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it("allows submission when value has changed", async () => {
    render(<SearchForm />);

    const searchInput = screen.getByRole("searchbox");
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "test query" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/?q=test query");
    });
  });

  it("trims whitespace from search query", async () => {
    render(<SearchForm />);

    const searchInput = screen.getByRole("searchbox");
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "  trimmed query  " } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/?q=trimmed query");
    });
  });
});

import { render, screen } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { SortableColumnHeader } from "./SortableColumnHeader";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("SortableColumnHeader", () => {
  const mockRouter = { push: jest.fn() };
  let mockSearchParams: URLSearchParams;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows correct aria-label for current sort state", () => {
    mockSearchParams.set("sort", "stars");
    mockSearchParams.set("order", "desc");

    render(<SortableColumnHeader column="stars">Stars</SortableColumnHeader>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Sort by stars: currently descending");
  });
});

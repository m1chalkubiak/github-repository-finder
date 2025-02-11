import { render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  const mockSearchParams = new URLSearchParams();
  mockSearchParams.set("q", "test");

  it("renders pagination with correct page information", () => {
    render(<Pagination currentPage={2} totalPages={5} searchParams={mockSearchParams} />);
    expect(screen.getByText("Page 2 of 5")).toBeVisible();
  });

  it("disables previous link on first page", () => {
    render(<Pagination currentPage={1} totalPages={3} searchParams={mockSearchParams} />);
    const prevLink = screen.getByRole("link", { name: /previous/i });
    expect(prevLink).toHaveAttribute("aria-disabled", "true");
    expect(prevLink).toHaveAttribute("tabindex", "-1");
  });

  it("disables next link on last page", () => {
    render(<Pagination currentPage={3} totalPages={3} searchParams={mockSearchParams} />);
    const nextLink = screen.getByRole("link", { name: /next/i });
    expect(nextLink).toHaveAttribute("aria-disabled", "true");
    expect(nextLink).toHaveAttribute("tabindex", "-1");
  });

  it("generates correct URLs for navigation", () => {
    const params = new URLSearchParams();
    params.set("q", "test");
    params.set("sort", "stars");
    params.set("order", "desc");
    params.set("page", "2");

    render(<Pagination currentPage={2} totalPages={3} searchParams={params} />);

    const prevLink = screen.getByRole("link", { name: /previous/i });
    const nextLink = screen.getByRole("link", { name: /next/i });

    expect(prevLink).toHaveAttribute("href", "/?q=test&sort=stars&order=desc&page=1");
    expect(nextLink).toHaveAttribute("href", "/?q=test&sort=stars&order=desc&page=3");
  });

  it("preserves all search parameters in navigation links", () => {
    const params = new URLSearchParams();
    params.set("q", "react");
    params.set("sort", "stars");
    params.set("order", "asc");
    params.set("page", "2");

    render(<Pagination currentPage={2} totalPages={5} searchParams={params} />);

    const nextLink = screen.getByRole("link", { name: /next/i });
    expect(nextLink).toHaveAttribute("href", "/?q=react&sort=stars&order=asc&page=3");
  });
});

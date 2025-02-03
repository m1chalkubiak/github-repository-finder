import { PaginationProps } from "./Pagination.types";
import { PaginationLink } from "./PaginationLink/";

export function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    return `/?${params.toString()}`;
  };

  return (
    <nav className="mt-4 flex items-center justify-between" aria-label="Pagination" role="navigation">
      <PaginationLink
        page={currentPage - 1}
        isDisabled={currentPage === 1}
        direction="previous"
        createUrl={createPageUrl}
      />

      <span className="text-sm text-gray-700 dark:text-gray-200" aria-current="page" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>

      <PaginationLink
        page={currentPage + 1}
        isDisabled={currentPage === totalPages}
        direction="next"
        createUrl={createPageUrl}
      />
    </nav>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "components/Button";
import { PaginationProps } from "./Pagination.types";

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = async (newPage: number) => {
    const params = new URLSearchParams(await searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <Button variant="secondary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </Button>
      <span className="text-sm text-gray-700 dark:text-gray-200">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="secondary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}

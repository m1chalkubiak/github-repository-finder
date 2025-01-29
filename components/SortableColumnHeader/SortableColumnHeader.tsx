"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { SortableColumnHeaderProps } from "./SortableColumnHeader.types";

export function SortableColumnHeader({ column, children }: SortableColumnHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");
  const currentOrder = searchParams.get("order") || "desc";

  const handleSort = async () => {
    const params = new URLSearchParams(await searchParams.toString());
    const newOrder = currentSort === column && currentOrder === "desc" ? "asc" : "desc";

    params.set("sort", column);
    params.set("order", newOrder);

    router.push(`/?${params.toString()}`);
  };

  const getSortButtonAriaLabel = () => {
    if (currentSort !== column) return `Sort by ${column}`;
    const direction = currentOrder === "asc" ? "ascending" : "descending";
    return `Sort by ${column}: currently ${direction}`;
  };

  return (
    <button
      onClick={handleSort}
      className="inline-flex items-center gap-1 hover:cursor-pointer hover:text-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:hover:text-gray-300"
      aria-label={getSortButtonAriaLabel()}
    >
      <span className="underline">{children}</span>
      {currentSort === column &&
        (currentOrder === "asc" ? (
          <ChevronUpIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
        ))}
    </button>
  );
}

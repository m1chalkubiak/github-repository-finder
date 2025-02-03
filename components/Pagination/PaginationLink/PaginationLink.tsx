import Link from "next/link";
import { PaginationLinkProps } from "./PaginationLink.types";

export function PaginationLink({ page, isDisabled, direction, createUrl }: PaginationLinkProps) {
  const label = direction === "previous" ? "Previous" : "Next";
  const rel = direction === "previous" ? "prev" : "next";

  const stateClasses = isDisabled ? "hover:cursor-not-allowed opacity-50" : "hover:bg-gray-200";

  return (
    <Link
      href={createUrl(page)}
      aria-label={`Go to ${direction} page`}
      className={`cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:ring-4 ${stateClasses}`}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      rel={rel}
    >
      {label}
    </Link>
  );
}

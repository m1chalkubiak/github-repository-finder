"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useTransition } from "react";
import { Button } from "components/Button";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentSearchQuery = searchParams.get("q") || "";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSearchQuery = formData.get("search")?.toString().trim() || "";

    if (newSearchQuery === currentSearchQuery) {
      return;
    }

    startTransition(() => {
      router.push(!newSearchQuery ? "/" : `/?q=${newSearchQuery}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <label htmlFor="default-search" className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          {isPending ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
          ) : (
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          )}
        </div>
        <input
          type="search"
          name="search"
          id="default-search"
          defaultValue={searchParams.get("q") || ""}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search repositories..."
        />
        <Button type="submit" disabled={isPending} className="absolute end-2.5 bottom-2.5">
          {isPending ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  );
}

"use server";

import { GitHubErrorResponse, OrderOption, RepositoriesResponse, SortOption } from "types/api/github";

export const getRepositories = async (
  searchTerm: string,
  page: number = 1,
  sort?: SortOption,
  order: OrderOption = "desc",
) => {
  try {
    const params = new URLSearchParams({
      q: searchTerm || "stars:>1",
      page: page.toString(),
      per_page: "10",
    });

    if (sort) {
      params.append("sort", sort);
      params.append("order", order);
    }

    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/search/repositories?${params.toString()}`, {
      headers,
      cache: "force-cache",
    });

    if (!response.ok) {
      const error = (await response.json()) as GitHubErrorResponse;
      throw new Error(`GitHub API error: ${response.status} ${error.message}`);
    }

    const data = (await response.json()) as RepositoriesResponse;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching repositories");
  }
};

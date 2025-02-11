"use server";

import { OrderOption, RepositoriesResponse, SortOption } from "types/api/github";
import { fetchFromGitHub } from "utils/fetch";

export const getRepositories = async (
  searchTerm: string,
  page: number = 1,
  sort?: SortOption,
  order: OrderOption = "desc",
): Promise<RepositoriesResponse> => {
  return fetchFromGitHub<RepositoriesResponse>("search/repositories", {
    q: searchTerm || "stars:>1",
    page: page.toString(),
    per_page: "10",
    ...(sort ? { sort, order } : {}),
  });
};

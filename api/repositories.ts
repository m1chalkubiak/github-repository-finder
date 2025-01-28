import { unstable_cache } from "next/cache";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  created_at: string;
  html_url: string;
}

interface RepositoriesResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

type SortOption = "stars";
type OrderOption = "desc" | "asc";

const GITHUB_TOKEN = process.env.API_TOKEN;

export const getRepositories = unstable_cache(
  async (searchTerm: string, page: number = 1, sort?: SortOption, order: OrderOption = "desc") => {
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

      if (GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
      }

      const response = await fetch(`https://api.github.com/search/repositories?${params.toString()}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data.items)) {
        throw new Error("Invalid response format from GitHub API");
      }

      return data as RepositoriesResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while fetching repositories");
    }
  },
  ["repositories-cache"],
  {
    revalidate: 3600,
    tags: ["repositories"],
  },
);

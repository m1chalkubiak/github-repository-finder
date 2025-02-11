export interface Repository {
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

export interface RepositoriesResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export type SortOption = "stars" | "forks" | "help-wanted-issues" | "updated";
export type OrderOption = "desc" | "asc";

export interface GitHubErrorResponse {
  message: string;
  documentation_url: string;
  status: string;
}

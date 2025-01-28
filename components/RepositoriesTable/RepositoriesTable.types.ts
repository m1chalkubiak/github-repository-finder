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

export interface RepositoriesTableProps {
  repositories: Repository[];
}

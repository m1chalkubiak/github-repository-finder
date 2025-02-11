import { GitHubErrorResponse } from "types/api/github";

export async function fetchFromGitHub<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  try {
    const urlParams = new URLSearchParams(params);
    const url = `https://api.github.com/${endpoint}?${urlParams.toString()}`;

    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const error = (await response.json()) as GitHubErrorResponse;
      throw new Error(`GitHub API error: ${response.status} ${error.message}`);
    }

    return response.json() as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching data from GitHub");
  }
}

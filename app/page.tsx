import { getRepositories } from "api/repositories";
import { RepositoriesTable } from "components/RepositoriesTable";

import { SearchForm } from "components/SearchForm";

interface SearchParams {
  q?: string;
  page?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const query = params.q || "";
  const page = Number(params.page) || 1;
  const sort = params.sort as "stars" | undefined;
  const order = params.order || "desc";

  const { items: repositories, total_count } = await getRepositories(query, page, sort, order);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">GitHub Repository Finder</h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Search through millions of GitHub repositories. Find projects by name, description, or topics.
        </p>
      </header>
      <section className="mt-8">
        <SearchForm />

        {total_count === 0 && (
          <>
            <p className="text-grey-400 mt-8 mb-4 text-center text-sm" role="status">
              Sorry, no maches!
            </p>
            <p className="text-center text-sm text-gray-500">Try different keywords</p>
          </>
        )}

        {total_count > 0 && (
          <>
            <p className="mt-8 mb-4 text-center text-sm text-gray-500" role="status">
              Found {total_count.toLocaleString()} repositories
            </p>
            <RepositoriesTable repositories={repositories} />
          </>
        )}
      </section>
    </main>
  );
}

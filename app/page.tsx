import { getRepositories } from "api/repositories";

import { SearchForm } from "components/SearchForm";

interface SearchParams {
  q?: string;
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const query = params.q || "";

  const { total_count } = await getRepositories(query);

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
      </section>
      <p className="mt-8 mb-4 text-center text-sm text-gray-500" role="status">
        Found {total_count} repositories
      </p>
    </main>
  );
}

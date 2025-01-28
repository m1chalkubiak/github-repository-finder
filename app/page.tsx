import { SearchForm } from "components/SearchForm";

export default function HomePage() {
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
    </main>
  );
}

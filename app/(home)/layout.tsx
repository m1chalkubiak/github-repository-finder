import { Metadata } from "next";
import "styles/tailwind.css";

import { SearchForm } from "components/SearchForm";

export const metadata: Metadata = {
  title: "GitHub Repository Finder",
  description:
    "Search and explore GitHub repositories. Find open source projects, view repository details, stars count and more.",
  openGraph: {
    title: "GitHub Repository Finder",
    description:
      "Search and explore GitHub repositories. Find open source projects, view repository details, stars count and more.",
    type: "website",
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
          GitHub Repository Finder
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-200">
          Search through millions of GitHub repositories. Find projects by name, description, or topics.
        </p>
      </header>
      <section className="mt-8">
        <SearchForm />

        {children}
      </section>
    </main>
  );
}

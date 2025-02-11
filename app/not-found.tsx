import Link from "next/link";

function NotFoundPage() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary-600 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl dark:text-gray-100">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>

          <Link
            href="/"
            aria-label={`Go to home page`}
            className={`cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:ring-4`}
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;

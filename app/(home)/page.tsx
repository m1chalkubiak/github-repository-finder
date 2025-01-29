import { getRepositories } from "api/repositories";
import { Pagination } from "components/Pagination/Pagination";

import { RepositoriesTable } from "./components/RepositoriesTable";

interface SearchParams {
  q?: string;
  page?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const query = params.q || "";
  const page = Number(params.page) || 1;
  const sort = params.sort as "stars" | undefined;
  const order = params.order || "desc";

  const { items: repositories, total_count } = await getRepositories(query, page, sort, order);

  const totalPages = Math.min(Math.ceil(total_count / 10), 100);

  return (
    <>
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
          <p className="mt-8 mb-4 text-center text-sm text-gray-500 dark:text-gray-200" role="status">
            Found {total_count.toLocaleString()} repositories
          </p>
          <RepositoriesTable repositories={repositories} />
          {total_count > 10 && <Pagination currentPage={page} totalPages={totalPages} />}
        </>
      )}
    </>
  );
}

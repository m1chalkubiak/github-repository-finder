import Image from "next/image";

import { SortableColumnHeader } from "components/SortableColumnHeader";

import { RepositoriesTableProps } from "./RepositoriesTable.types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function RepositoriesTable({ repositories }: RepositoriesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto max-w-7xl min-w-full table-fixed divide-y divide-gray-300">
        <colgroup>
          <col className="w-[40%]" />
          <col className="w-[25%]" />
          <col className="w-[15%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
              Owner
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
              <div className="flex justify-end">
                <SortableColumnHeader column="stars">Stars</SortableColumnHeader>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
              Created at
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {repositories.map((repo) => (
            <tr key={repo.id} className="hover:bg-gray-50 dark:hover:bg-gray-50/10">
              <td className="truncate px-6 py-4 text-left">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-blue-400 dark:hover:text-blue-500"
                >
                  {repo.name}
                </a>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end">
                  <span className="mr-2 dark:text-gray-100">{repo.owner.login}</span>
                  <Image
                    src={repo.owner.avatar_url}
                    alt={`${repo.owner.login}'s avatar`}
                    className="h-6 w-6 rounded-full"
                    width={24}
                    height={24}
                    loading="lazy"
                    aria-hidden="true"
                  />
                </div>
              </td>
              <td className="px-6 py-4 text-right tabular-nums dark:text-gray-100">
                {repo.stargazers_count.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right dark:text-gray-100">
                {dateFormatter.format(new Date(repo.created_at))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

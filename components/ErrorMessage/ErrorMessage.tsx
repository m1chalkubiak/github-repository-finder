import { XCircleIcon } from "@heroicons/react/24/solid";
import { ErrorMessageProps } from "./ErrorMessage.types";

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <aside
      className="mx-auto mt-8 max-w-2xl rounded-lg bg-red-50 p-4 dark:bg-red-900/10"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex">
        <div className="shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">{message}</p>
        </div>
      </div>
    </aside>
  );
}

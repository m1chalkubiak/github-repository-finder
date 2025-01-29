import { ButtonProps } from "./Button.types";

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const commonClasses =
    "cursor-pointer rounded-lg px-4 py-2 text-sm focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50";
  const primaryClasses =
    "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const secoundaryClasses = "border border-gray-300 bg-white font-medium text-gray-700 hover:bg-gray-200";

  return (
    <button
      className={`${commonClasses} ${variant === "secondary" ? secoundaryClasses : primaryClasses} ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

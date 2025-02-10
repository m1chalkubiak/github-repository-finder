import { Metadata } from "next";
import { DarkModeToggle } from "components/DarkModeToggle";
import { getDarkModeCookie } from "components/DarkModeToggle/actions";

import "styles/tailwind.css";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "GitHub Repository Finder",
  },
  description:
    "Search and explore GitHub repositories. Find open source projects, discover trending repositories, and explore GitHub's vast ecosystem of code.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const darkMode = await getDarkModeCookie();
  const isDarkMode = darkMode?.value === "true";

  return (
    <html lang="en" className={`${isDarkMode ? "dark" : "light"}`}>
      <body className="dark:bg-gray-900">
        <main className="container mx-auto px-4 py-8">
          <section className="flex items-center justify-end">
            <DarkModeToggle isDarkMode={isDarkMode} />
          </section>
          {children}
        </main>
      </body>
    </html>
  );
}

import { Metadata } from "next";
import "styles/tailwind.css";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "GitHub Repository Finder",
  },
  description:
    "Search and explore GitHub repositories. Find open source projects, discover trending repositories, and explore GitHub's vast ecosystem of code.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import { expect, test } from "@playwright/test";

test.describe("GitHub Repository Finder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows initial empty state correctly", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "GitHub Repository Finder", level: 1 })).toBeVisible();
    await expect(page.getByRole("searchbox")).toBeVisible();
    await expect(page.getByRole("button", { name: /search/i })).toBeEnabled();
  });

  test("shows loading states and updates UI during search", async ({ page }) => {
    await page.route("**/*", async (route) => {
      await new Promise((f) => setTimeout(f, 100));
      await route.continue();
    });

    const searchInput = page.getByRole("searchbox");
    const searchButton = page.getByRole("button", { name: "Search" });

    await searchInput.fill("react");
    await searchButton.click();

    await expect(searchButton).toHaveText("Searching...");
    await expect(searchButton).toBeDisabled();

    await expect(searchButton).toBeEnabled();
    await expect(searchButton).toHaveText("Search");

    await expect(page).toHaveURL(/.*q=react.*/);
  });
});

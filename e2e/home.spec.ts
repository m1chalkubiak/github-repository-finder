import { expect, test } from "@playwright/test";

test.describe("GitHub Repository Finder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows initial empty state correctly", async ({ page }) => {
    await expect(page).toHaveTitle("GitHub Repository Finder");
    await expect(page.getByRole("heading", { name: "GitHub Repository Finder", level: 1 })).toBeVisible();
    await expect(page.getByRole("searchbox")).toBeVisible();
    await expect(page.getByRole("button", { name: "Search" })).toBeEnabled();
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

  test("performs search and displays results", async ({ page }) => {
    await page.getByRole("searchbox").fill("react");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(/.*q=react.*/);
    await expect(page.getByRole("status").and(page.getByText("Found"))).toBeVisible();

    const table = page.getByRole("table");
    await expect(table).toBeVisible();
    await expect(table.getByRole("columnheader")).toHaveCount(4);
    await expect(table.getByRole("columnheader")).toContainText(["Name", "Owner", "Stars", "Created at"]);
  });

  test("handles empty search results", async ({ page }) => {
    await page.getByRole("searchbox").fill("thisisanonexistentrepository123456789");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(/.*q=thisisanonexistentrepository123456789.*/);
    await expect(page.getByRole("status").and(page.getByText("Sorry, no maches!"))).toBeVisible();
    await expect(page.getByRole("table")).not.toBeVisible();
  });

  test("display error message when API request fails", async ({ page }) => {
    await page.goto("/?q=react&sort=stars&order=desc&page=101");

    await expect(page.getByText("422 Unprocessable Entity")).toBeVisible();
  });
});

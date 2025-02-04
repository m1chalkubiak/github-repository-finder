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

  test("handles pagination correctly", async ({ page }) => {
    await page.getByRole("searchbox").fill("javascript");
    await page.getByRole("button", { name: /search/i }).click();

    await expect(page.getByRole("button", { name: /previous/i })).toBeDisabled();
    await expect(page.getByRole("button", { name: /next/i })).toBeEnabled();

    await page.getByRole("button", { name: /next/i }).click();
    await expect(page.getByText("Page 2")).toBeVisible();
    await expect(page.getByRole("button", { name: /previous/i })).toBeEnabled();
    await expect(page).toHaveURL(/.*page=2.*/);
  });

  test("sorts results by stars", async ({ page }) => {
    await page.getByRole("searchbox").fill("typescript");
    await page.getByRole("button", { name: /search/i }).click();

    await page.getByRole("button", { name: /sort by stars/i }).click();
    await expect(page).toHaveURL(/.*sort=stars.*/);
    await expect(page).toHaveURL(/.*order=desc.*/);

    await page.getByRole("button", { name: /sort by stars/i }).click();
    await expect(page).toHaveURL(/.*order=asc.*/);
  });

  test("preserves search parameters in URL", async ({ page }) => {
    await page.goto("/?q=vue&sort=stars&order=desc");
    await expect(page.getByRole("searchbox")).toHaveValue("vue");

    await page.getByRole("button", { name: /next/i }).click();

    await expect(page).toHaveURL(/.*q=vue.*/);
    await expect(page).toHaveURL(/.*sort=stars.*/);
    await expect(page).toHaveURL(/.*order=desc.*/);
    await expect(page).toHaveURL(/.*page=2.*/);
  });

  test("reset search parameters in URL", async ({ page }) => {
    await page.goto("/?q=vue&sort=stars&order=desc");
    await page.getByRole("searchbox").fill("");

    await page.getByRole("button", { name: /search/i }).click();

    await expect(page).toHaveURL("/");
  });
});

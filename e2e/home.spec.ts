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
});

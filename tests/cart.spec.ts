import { test, expect } from "@playwright/test";

test("should add a product to the cart after login", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  await expect(page).toHaveURL(/inventory\.html/);

  const backpack = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" });

  await backpack.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

  await page.locator(".shopping_cart_link").click();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(
    page.locator(".cart_item").filter({ hasText: "Sauce Labs Backpack" }),
  ).toBeVisible();
});

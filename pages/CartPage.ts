import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  item(name: string): Locator {
    return this.page.locator(".cart_item").filter({ hasText: name });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async expectItemVisible(name: string): Promise<void> {
    await expect(this.item(name)).toBeVisible();
  }
}

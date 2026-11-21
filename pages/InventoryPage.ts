import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText("Products", { exact: true });
    this.cartLink = page.locator(".shopping_cart_link");
  }

  product(name: string): Locator {
    return this.page.locator(".inventory_item").filter({ hasText: name });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toBeVisible();
  }

  async addProduct(name: string): Promise<void> {
    await this.product(name)
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}

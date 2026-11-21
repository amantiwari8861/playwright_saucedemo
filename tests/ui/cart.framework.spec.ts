import { test } from "../../fixtures/testFixtures";

test(
  "user can add a product to the cart",
  { tag: ["@smoke", "@regression"] },
  async ({ authenticatedInventoryPage, cartPage }) => {
    const productName = "Sauce Labs Backpack";

    await authenticatedInventoryPage.addProduct(productName);
    await authenticatedInventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectItemVisible(productName);
  },
);

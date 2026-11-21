import { test, expect } from "../../fixtures/testFixtures";
import { users } from "../../test-data/users";

test.describe("Login", () => {
  test(
    "standard user can log in",
    { tag: "@smoke" },
    async ({ loginPage, inventoryPage }) => {
      await loginPage.goto();
      await loginPage.login(users.standard.username, users.standard.password);
      await inventoryPage.expectLoaded();
    },
  );

  test(
    "locked out user sees an error",
    { tag: "@regression" },
    async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(users.lockedOut.username, users.lockedOut.password);

      await expect(loginPage.errorMessage).toContainText("locked out");
    },
  );
});

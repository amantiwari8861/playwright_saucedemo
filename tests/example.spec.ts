import { test, expect } from "@playwright/test";

/* test("launch browser", async ({ page }) => {
  await page.goto("https://saucedemo.com");

  // const uname = page.locator("#user-name");
  // const pass = page.locator("#password");
  // const loginBtn = page.getByRole("button", { name: "Login" });

  // await page.waitForTimeout(2000);
  // await uname.fill("standard_user");
  // await page.waitForTimeout(2000);
  // await pass.fill("secret_sauce");
  // await page.waitForTimeout(2000);
  // await loginBtn.click();
  // const hamburger = page.locator("#react-burger-menu-btn");
  // await hamburger.click();
  // await page.waitForTimeout(2000);
  // const closeBtn = page.locator("#react-burger-cross-btn");
  // await closeBtn.click();
  await page.waitForTimeout(2000);
  // await page.getByText("Login", { exact: true }).click();
  await page.locator("text=Login").click();
  await page.waitForTimeout(6000);
}); */

// test("should locate elements", async ({ page }) => {
//   await page.goto("https://saucedemo.com");

//   // ID
//   page.locator("#user-name");

//   // Class
//   page.locator(".login-button");

//   // Tag
//   page.locator("button");

//   // Attribute
//   page.locator("[name='username']");

//   // Multiple attributes
//   page.locator("input[type='text'][name='username']");

//   // Descendant
//   page.locator(".login-container input");

//   // Child
//   page.locator(".login-container > input");

//   // Multiple classes
//   page.locator(".btn.primary");

//   // By ID
//   page.locator("//input[@id='user-name']");

//   // By attribute
//   page.locator("//input[@name='user-name']");

//   // By text
//   page.locator("//button[text()='Login']");

//   // Contains text
//   page.locator("//button[contains(text(),'Login')]");

//   // Parent
//   page.locator("//input[@id='user-name']/..");

//   page.getByLabel("Username");

//   await page.getByRole("button", { name: "Login" }).click();

//   await page.getByPlaceholder("Enter username").fill("standard_user");

//   // <button data-testid="login-button">Login</button>
//   await page.getByTestId("login-button").click();

//   const backpack = page
//     .locator(".inventory_item")
//     .filter({ hasText: "Sauce Labs Backpack" });

//   await backpack
//     .getByRole("button", {
//       name: "Add to cart",
//     })
//     .click();
// });

/* test("should windows", async ({ context, page }) => {
  try {
    await page.goto("https://bewakoof.com");
    const tab2 = await context.newPage();
    await tab2.goto("https://iamandroid.in");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  await page.waitForTimeout(6000);
}); */

/* test("multiple tabs", async ({ page, context, browser }) => {
  // await page.goto("https://automation-testing-website-chi.vercel.app/");

  // const newPagePromise = context.waitForEvent("page");

  // await page.getByText("Click to visit our documentation").click();

  // const newPage = await newPagePromise;

  // await newPage.waitForLoadState();

  // console.log("Original:", await page.url());
  // console.log("New tab:", await newPage.url());
  // console.log("New Page Title :" + (await newPage.title()));

  // await page.waitForTimeout(6000);
  // await page.bringToFront();
  // await expect(newPage).toHaveTitle(/Google/);

  const context2 = await browser.newContext({
    viewport: {
      width: 375,
      height: 667,
    },
  });

  const page2 = await context2.newPage();

  await page2.goto("https://github.com");
  await page.waitForTimeout(6000);
  await page.bringToFront();

  console.log(await page.viewportSize());
  await context2.close();
});
 */

// test("should screenshot form tag", async ({ page }) => {
//   await page.goto("https://saucedemo.com");
//   // await page.locator("form").screenshot({
//   //   path: "screenshots/login-form.png",
//   // });
//   await expect(page.title()).toBe("Abc");
// });

// test("SauceDemo login", async ({ page }) => {
//   await page.goto("https://saucedemo.com");

//   await page.locator("#user-name").fill("standard_user");
//   await page.locator("#password").fill("secret_sauce");

//   await page.locator("#login-button").click();

//   // This assertion is intentionally wrong
//   await expect(page).toHaveURL(/wrong-page/);
// });
// import path from "path";

// test("upload file", async ({ page }) => {
//   await page.goto("http://127.0.0.1:5500/public/index.html");

//   const filePath = path.resolve("Readme.md");

//   await page.locator("#fileInp").setInputFiles(filePath);

//   await page.waitForTimeout(3000);
//   await page.getByRole("button", { name: /upload/i }).click();

//   await page.waitForTimeout(6000);
// });
/*
Page
 │
 ├── getByRole()
 ├── getByLabel()
 ├── getByText()
 ├── getByTestId()
 ├── getByPlaceholder()
 │
 └── locator()
       │
       ├── CSS
       ├── XPath
       └── chaining
              │
              └── nested element

*/

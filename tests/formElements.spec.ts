// npx playwright test tests/formElements.spec.ts --project=chromium --headed --workers=1
import { test, expect } from "@playwright/test";
import path from "path";

const URL = "https://automation-testing-website-chi.vercel.app/";

test.describe("Interactive UI Showcase", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });


test("0.upload file", async ({ page }) => {

  const filePath = path.resolve("Readme.md");
  await page.locator("#fileInp").setInputFiles(filePath);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: /upload/i }).click();
  await page.waitForTimeout(6000);
});



 /*  test("scroll to bottom", async ({ page }) => {

    await page.evaluate(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    });
    // await locator.scrollIntoViewIfNeeded();

    await page.waitForTimeout(2000);
  }); */


  // ============================================================
  // 1. RADIO BUTTONS
  // ============================================================

  test("should select radio buttons", async ({ page }) => {
    // Actual HTML:
    // name="radioButton"
    // value="radio1" -> Basic
    // value="radio2" -> Pro
    // value="radio3" -> Enterprise  -> display none

    const basic = page.locator('input[name="radioButton"][value="radio1"]');

    const pro = page.locator('input[name="radioButton"][value="radio2"]');

    const enterprise = page.locator(
      'input[name="radioButton"][value="radio3"]',
    );

    await basic.check();
    await expect(basic).toBeChecked();

    // await pro.check();
    // await expect(pro).not.toBeChecked();

    // await enterprise.check();
    // await expect(enterprise).not.toBeChecked();

    // Because these are radio buttons,
    // selecting Enterprise should uncheck Pro and Basic.

    await expect(basic).toBeChecked();
    await expect(pro).not.toBeChecked();
    await expect(enterprise).not.toBeChecked();
    await page.waitForTimeout(4000);
  });

  // ============================================================
  // 2. COUNTRY TEXT INPUT
  // ============================================================

  test("should enter country text", async ({ page }) => {
    // Actual HTML:
    // id="autocomplete"
    // placeholder="Type to Select Countries"

    const countryInput = page.locator("#autocomplete");

    await countryInput.fill("India");

    await expect(countryInput).toHaveValue("India");
  });

  // ============================================================
  // 3. NATIVE DROPDOWN
  // ============================================================

  test("should select category from dropdown", async ({ page }) => {
    // Actual HTML:
    // id="dropdown-class-example"

    const dropdown = page.locator("#dropdown-class-example");

    await dropdown.selectOption("option1");

    await expect(dropdown).toHaveValue("option1");

    // option1 = Technology
  });

  // ============================================================
  // 4. CHECKBOXES
  // ============================================================

  test("should select and unselect checkboxes", async ({ page }) => {
    const analytics = page.locator("#checkBoxOption1");
    const support = page.locator("#checkBoxOption2");
    const updates = page.locator("#checkBoxOption3");

    await analytics.check();
    await support.check();
    await updates.check();

    await expect(analytics).toBeChecked();
    await expect(support).toBeChecked();
    await expect(updates).toBeChecked();

    await analytics.uncheck();

    await expect(analytics).not.toBeChecked();
    await expect(support).toBeChecked();
    await expect(updates).toBeChecked();
  });

  // ============================================================
  // 5. DOCUMENTATION LINK -> NEW TAB
  // ============================================================

  test("should open documentation in a new tab", async ({ page, context }) => {
    // Actual HTML:
    // <a href="https://www.google.com/" target="_blank">
    //     Click to visit our documentation
    // </a>

    const newPagePromise = context.waitForEvent("page");

    await page.getByText("Click to visit our documentation").click();

    const newPage = await newPagePromise;

    await newPage.waitForLoadState();

    await expect(newPage).toHaveURL(/google\.com/);
  });

  // ============================================================
  // 6. OPEN TAB
  // ============================================================

  test("should open a new tab", async ({ page, context }) => {
    // Actual HTML:
    // id="opentab"
    // href="https://www.google.com/"
    // target="_blank"

    const newPagePromise = context.waitForEvent("page");

    await page.locator("#opentab").click();

    const newPage = await newPagePromise;

    await newPage.waitForLoadState();

    await expect(newPage).toHaveURL(/google\.com/);
  });

  // ============================================================
  // 7. OPEN WINDOW / POPUP
  // ============================================================

  test("should open popup window", async ({ page }) => {
    // Actual HTML calls:
    // onclick="openWindow()"
    //
    // openWindow() executes:
    // window.open(
    //     "https://www.saucedemo.com/",
    //     "myWin",
    //     ...
    // )

    const popupPromise = page.waitForEvent("popup");

    await page.locator("#openwindow").click();

    const popup = await popupPromise;

    await popup.waitForLoadState();

    await expect(popup).toHaveURL(/saucedemo\.com/);
  });

  // ============================================================
  // 8. ALERT
  // ============================================================

  test("should handle alert", async ({ page }) => {
    // Actual HTML:
    // input id="name"
    // input id="alertbtn"
    //
    // JavaScript:
    // alert("Hello " + value + ", here is your notification!");

    const username = page.locator("#name");
    const alertButton = page.locator("#alertbtn");

    await username.fill("Aman");

    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");

      expect(dialog.message()).toBe("Hello Aman, here is your notification!");

      await dialog.accept();
    });

    await alertButton.click();

    // JavaScript clears #name after alert
    await expect(username).toHaveValue("");
  });

  // ============================================================
  // 9. CONFIRM - ACCEPT
  // ============================================================

  test("should accept confirm dialog", async ({ page }) => {
    const username = page.locator("#name");
    const confirmButton = page.locator("#confirmbtn");

    await username.fill("Aman");

    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");

      expect(dialog.message()).toBe("Hello Aman, do you confirm this action?");

      await dialog.accept();
    });

    await confirmButton.click();

    // JavaScript clears #name
    await expect(username).toHaveValue("");
  });

  // ============================================================
  // 10. CONFIRM - DISMISS
  // ============================================================

  test("should dismiss confirm dialog", async ({ page }) => {
    const username = page.locator("#name");
    const confirmButton = page.locator("#confirmbtn");

    await username.fill("Aman");

    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");

      expect(dialog.message()).toBe("Hello Aman, do you confirm this action?");

      await dialog.dismiss();
    });

    await confirmButton.click();

    // JavaScript clears #name even after dismiss
    await expect(username).toHaveValue("");
  });

  // ============================================================
  // 11. COURSE TABLE
  // ============================================================

  test("should validate course table", async ({ page }) => {
    // IMPORTANT:
    // There are two tables with id="product".
    //
    // The course table has:
    // name="courses"
    //
    // Therefore we use the name attribute instead of #product.

    const courseTable = page.locator('table[name="courses"]');

    await expect(courseTable).toBeVisible();

    // Header + 10 courses = 11 rows inside tbody
    const rows = courseTable.locator("tbody tr");

    await expect(rows).toHaveCount(11);

    // Validate a real course from the HTML
    const aiRow = courseTable.locator("tbody tr").filter({
      hasText: "AI Agent Development",
    });

    await expect(aiRow).toContainText("Alex Johnson");
    await expect(aiRow).toContainText("AI Agent Development");
    await expect(aiRow).toContainText("$79");
  });

  // ============================================================
  // 12. EMPLOYEE TABLE
  // ============================================================

  test("should validate employee table", async ({ page }) => {
    // IMPORTANT:
    // The employee table ALSO has id="product".
    //
    // Therefore we locate it through its actual parent:
    // .tableFixHead

    const employeeTable = page.locator(".tableFixHead table");

    await expect(employeeTable).toBeVisible();

    const rows = employeeTable.locator("tbody tr");

    // Actual HTML contains 9 employees
    await expect(rows).toHaveCount(9);

    const qaRow = employeeTable.locator("tbody tr").filter({
      hasText: "George",
    });

    await expect(qaRow).toContainText("George");
    await expect(qaRow).toContainText("QA Engineer");
    await expect(qaRow).toContainText("Seattle");
    await expect(qaRow).toContainText("18");
  });

  // ============================================================
  // 13. TOTAL PROJECTS
  // ============================================================

  test("should validate total projects", async ({ page }) => {
    // Actual HTML:
    // <div class="totalAmount">
    //     Total Projects: 111
    // </div>

    const totalProjects = page.locator(".totalAmount");

    await expect(totalProjects).toHaveText("Total Projects: 111");
  });

  // ============================================================
  // 14. HIDE / SHOW ELEMENT
  // ============================================================

  test("should hide and show textbox", async ({ page }) => {
    // Actual HTML:
    // id="displayed-text"

    const textbox = page.locator("#displayed-text");

    const hideButton = page.locator("#hide-textbox");
    const showButton = page.locator("#show-textbox");

    // Initially visible
    await expect(textbox).toBeVisible();

    // Click Hide
    await hideButton.click();

    await expect(textbox).toBeHidden();

    // Click Show
    await showButton.click();

    await expect(textbox).toBeVisible();
  });

  // ============================================================
  // 15. HOVER
  // ============================================================

  test("should display hover menu", async ({ page }) => {
    // Actual HTML:
    //
    // <div class="mouse-hover">
    //     <button id="mousehover">Mouse Hover</button>
    //
    //     <div class="mouse-hover-content">
    //         <a href="#top">Top</a>
    //         <a href="">Reload</a>
    //     </div>
    // </div>

    const hoverContainer = page.locator(".mouse-hover");

    const hoverButton = page.locator("#mousehover");

    const hoverMenu = page.locator(".mouse-hover-content");

    const topLink = hoverMenu.getByText("Top");

    const reloadLink = hoverMenu.getByText("Reload");

    // Menu should initially not be visible
    await expect(hoverMenu).toBeHidden();

    // Hover over actual hover button
    await hoverButton.hover();

    // CSS displays .mouse-hover-content
    await expect(hoverMenu).toBeVisible();

    await expect(topLink).toBeVisible();
    await expect(reloadLink).toBeVisible();

    // Keep locator referenced to actual container
    await expect(hoverContainer).toBeVisible();
  });
});

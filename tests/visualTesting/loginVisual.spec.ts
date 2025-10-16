import { test, expect, Locator } from "@playwright/test";
import { loginPage } from "../pages/loginPage";

test.describe("Visual - Login Popup", () => {
  test("login modal renders correctly", async ({ page }) => {
    const login = new loginPage(page);

    await page.goto("https://onskeskyen.dk/", {
      waitUntil: "domcontentloaded",
    });

    const loginButton = page.locator("button", { hasText: "Log ind" });
    await loginButton.waitFor({ state: "visible", timeout: 15000 });
    await loginButton.click();

    await login.handleCookies();

    // Locate the login modal
    const modal = page
      .locator("div.CustomContainer__Container-sc-8ccd59a3-0")
      .first();
    await modal.waitFor({ state: "visible", timeout: 15000 });
    await page.waitForLoadState("networkidle");

    await modal.evaluate((el) => el.scrollIntoView({ block: "start" }));

    const dynamicLocators: Locator[] = [
      modal.locator('img[alt*="photo"]'),
      modal.locator('img[alt*="Partner"]'),
      modal.locator('img[src*="desktopPhones"]'),
      modal.locator('img[src*="Brands showcase"]'),
      modal.locator('img[src*="LeftCloud"]'),
      modal.locator('img[src*="RightCloud"]'),
      modal.locator('img[src*="extension"]'),
      modal.locator(".dynamic-banner"),
      modal.locator(".cookie-banner"),
      modal.locator(".popup-ad"),
    ];

    const box = await modal.boundingBox();
    if (!box) throw new Error("Modal not visible or has zero size");

    await page.screenshot({
      path: "homepage-initial.png",
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
      mask: dynamicLocators,
      animations: "disabled",
    });
  });
});

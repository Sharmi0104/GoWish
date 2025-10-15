import { test, expect } from "@playwright/test";
import { loginPage } from "../pages/loginPage";

test("login displays correctly", async ({ page }) => {
  test.setTimeout(120000);

  const login = new loginPage(page);
  await login.goto();

  await login.fillEmail("test_GoWish@mailinator.com");
  await login.fillPassword("Gowish123");

  // Submit the form
  await login.submit();
  await login.assertUserName("Sharmila Panyam");
});

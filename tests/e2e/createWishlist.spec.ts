import { test, expect } from "@playwright/test";
import { createWishlistPage } from "../pages/createWishlistPage";
import { loginPage } from "../pages/loginPage";

test("Create Wishlist", async ({ page }) => {
  test.setTimeout(120000);

  const createWishlist = new createWishlistPage(page);
  const login = new loginPage(page);

  await login.goto();
  await login.fillEmail("test_GoWish@mailinator.com");
  await login.fillPassword("Gowish123");
  await login.submit();
  await login.assertUserName("Sharmila Panyam");
  //await createWishlist.checkUsername("Sharmila Panyam");
  await createWishlist.clickcreateWishlistBtn();
  await createWishlist.getHeaderText("Create wishlist");
  await createWishlist.enterTitle("Wanted list");
  await createWishlist.clickCreateButton();
  await createWishlist.checkwishlistPresent("Wanted list");
});

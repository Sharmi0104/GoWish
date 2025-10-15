import { test as base } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { createWishlistPage } from "../pages/createWishlistPage";

type MyFixtures = {
  login: loginPage;
  CreateWishlist: createWishlistPage;
};

export const test = base.extend<MyFixtures>({
  login: async ({ page }, use) => {
    const login = new loginPage(page);
    await login.goto();
    await use(login);
  },

 /* CreateWishlist: async ({ page }, use) => {
    const Createwishlist = new createWishlistPage(page);
    await use(Createwishlist);
  },*/
});

export { expect } from "@playwright/test";

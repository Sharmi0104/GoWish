import { test as base } from "@playwright/test";
import { signUpPage } from "../pages/signUpPage";

type MyFixtures = {
  signUp: signUpPage;
};

export const test = base.extend<MyFixtures>({
  signUp: async ({ page }, use) => {
    const signup = new signUpPage(page);
    await signup.goto();
    //  await signup.changelanguage();
    await use(signup);
  },
});

export { expect } from "@playwright/test";

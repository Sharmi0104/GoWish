import { test as base } from '@playwright/test';
import { loginPage } from '../pages/loginPage';

type MyFixtures = {
    login: loginPage;
};

export const test = base.extend<MyFixtures>({
    login: async ({ page }, use) => {
        const login = new loginPage(page);
        await login.goto();
        await use(login);
    },
});

export { expect } from '@playwright/test';
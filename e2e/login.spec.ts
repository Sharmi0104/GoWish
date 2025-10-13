import { test, expect } from '@playwright/test';

test('login page displays correctly', async ({ page }) => {
  await page.goto('https://onskeskyen.dk/');
  await expect(page.getByTestId('navBar')).toBeVisible();
});
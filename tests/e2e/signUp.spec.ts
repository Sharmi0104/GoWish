import { test, expect } from '../fixture/signUp';
import { Page } from '@playwright/test';

test('signup test', async ({ signUp }) => {
  test.setTimeout(120000);
  
  await signUp.goto();
//  await signUp.clickContinueWithEmail();
  await signUp.changelanguage();  
  await expect(signUp.page.getByText('Land og sprog', { exact: true })).toBeVisible();
  //await expect(signUp.page).toHaveTitle('Continue with e-mail');
  await signUp.selectLanguage();
  await signUp.clickContinueWithEmail();
  await signUp.fillForm('sp73_GoWish@mailinator.com','Gowish123');
  await signUp.clickNextBtn();
 const emailLocator = await signUp.createAccount();
//await expect(emailLocator).toHaveText('sp71_GoWish@mailinator.com');
await signUp.createaccountForm('Sharmila','Panyam')
await signUp.expectDobErrorVisible();
await expect(signUp.dobErrorMessage).toHaveText('Please enter a valid date of birth');
await signUp.dob();
await signUp.genderSelect();
await signUp.createProfileButton();
});

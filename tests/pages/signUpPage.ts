import { Page } from '@playwright/test';
export class signUpPage{
readonly page: Page; // now accessible outside
  constructor(page: Page) {
    this.page = page;
  }
 async handleCookies() {
  const cookieBanner = this.page.locator('#cookie-information-template-wrapper');
  const acceptCookies = this.page.getByRole('button', { name: /accepter alle/i });

  // Only interact if the banner actually exists
  if (await cookieBanner.isVisible({ timeout: 5000 }).catch(() => false)) {
    if (await acceptCookies.isVisible()) {
      await acceptCookies.click({ force: true });
    }
    // Wait for the banner to disappear fully
    await cookieBanner.waitFor({ state: 'hidden', timeout: 10000 });
  } else {
    // Log that the banner wasn't shown, to confirm behavior
    console.log('✅ No cookie banner detected');
  }
}
async goto() {
  await this.page.goto('https://onskeskyen.dk/');

  await this.handleCookies();
  

  // Click sign up button
    const signUpButton = this.page.locator('button.Button__Container-sc-74e86c1a-0.fuqvGR');
    await signUpButton.waitFor({ state: 'visible' });   
    await signUpButton.click();

  await this.handleCookies();
    const signUppage = this.page.getByRole('dialog').getByText('Opret en profil', { exact: true });
  await signUppage.waitFor({ state: 'visible', timeout: 60000 });

  // Change the language
  
}
/*async changelanguage(){
    await this.handleCookies();
    const languageDialog = this.page.getByRole('dialog').filter({ hasText: 'Land og sprog' });
  if (!(await languageDialog.isVisible())) {
    const dkButton = this.page.getByRole('button', { name: 'DK' });
    await dkButton.waitFor({ state: 'visible' });
    await this.handleCookies();
    await this.page.locator('#cookie-information-template-wrapper').waitFor({ state: 'hidden', timeout: 10000 });

    await dkButton.click();
    await languageDialog.waitFor({ state: 'visible', timeout: 10000 });
  }
 await this.page.locator('.ant-select-selection-item').nth(1).click();
  await this.page.locator('.ant-select-item-option', { hasText: 'English' }).click();
  this.page.getByRole('button', { name: 'Gem' }).click();}*/
  // Select English and save
  /*const englishOption = this.page.getByRole('option', { name: 'English' });
  await englishOption.waitFor({ state: 'visible' });
  await englishOption.click();
  await this.page.getByRole('button', { name: 'Gem' }).click();*/
   /* const dkButton = this.page.getByRole('button', { name: 'DK' });
  await dkButton.waitFor({ state: 'visible' });  
  await dkButton.click({ force: true });
  await this.handleCookies();
    //const language = this.page.locator('div.RegisterStepTitle__PageTitle-sc-a498cb37-0.hlRPPz');
     const languageDialog = this.page.getByRole('dialog', { name: /Land og sprog/i });
  //await expect(languageDialog).toBeVisible({ timeout: 10000 });
    //const language =this.page.getByText('Land og sprog', { exact: true })
    await languageDialog.waitFor({ state: 'visible',timeout: 60000  }); 
    await this.handleCookies();
    const englishOption = this.page.getByRole('option', { name: 'English' });
  await englishOption.click();
  this.page.getByRole('button', { name: 'Gem' }).click();*/
  //}
/*async selectLanguage() {
  await this.handleCookies();
  await this.page.locator('.ant-select-selection-item').nth(1).click();
  await this.page.locator('.ant-select-item-option', { hasText: 'English' }).click();
  this.page.getByRole('button', { name: 'Gem' }).click();
  
}*/
//Click continue With Email Button
 get continueWithEmailButton() {
    //return this.page.getByRole('button', { name: 'Continue with e-mail' });
    return this.page.getByRole('button', { name: 'Fortsæt med e-mail' });

  }

  
  async clickContinueWithEmail() {
   await this.handleCookies();
   const dismissOverlay = async () => {
    const cookieBanner = this.page.getByRole('button', { name: 'Accepter alle' }).first();
    if (await cookieBanner.isVisible()) await cookieBanner.click();

    const modalClose = this.page.locator('button', { hasText: 'Close' }).first();
    if (await modalClose.isVisible()) await modalClose.click();

    const renewConsent = this.page.locator('button', { hasText: 'renew consent' });
    if (await renewConsent.isVisible()) await renewConsent.click();
  };
    await this.continueWithEmailButton.waitFor({ state: 'visible' });
    await this.continueWithEmailButton.click({force: true });
    await this.handleCookies();
  }
// Fill email and password
  get emailInput() {
    return this.page.locator('input[data-cy="signupEmailInput"]');
  }

  get passwordInput() {
    return this.page.locator('input[data-cy="signupPasswordInput"]');
  }
  async fillForm(email: string, password: string) {
    await this.handleCookies();
    const dismissOverlay = async () => {
    const cookieBanner = this.page.getByRole('button', { name: 'Accepter alle' }).first();
    if (await cookieBanner.isVisible()) await cookieBanner.click();

    const modalClose = this.page.locator('button', { hasText: 'Close' }).first();
    if (await modalClose.isVisible()) await modalClose.click();

    const renewConsent = this.page.locator('button', { hasText: 'renew consent' });
    if (await renewConsent.isVisible()) await renewConsent.click();
  };
    await this.emailInput.waitFor({ state: 'visible', timeout: 60000 });
    await this.emailInput.fill(email);
    await this.passwordInput.waitFor({ state: 'visible', timeout: 60000 });
    await this.passwordInput.fill(password);
    
  }
  async clickNextBtn(){
    await this.handleCookies();
    const dismissOverlay = async () => {
    const cookieBanner = this.page.getByRole('button', { name: 'Accepter alle' }).first();
    if (await cookieBanner.isVisible()) await cookieBanner.click();

    const modalClose = this.page.locator('button', { hasText: 'Close' }).first();
    if (await modalClose.isVisible()) await modalClose.click();

    const renewConsent = this.page.locator('button', { hasText: 'renew consent' });
    if (await renewConsent.isVisible()) await renewConsent.click();
  };
    const nextButton = this.page.getByRole('button', { name: 'Næste' });
  await nextButton.waitFor({ state: 'visible' ,timeout:60000  });  
  await nextButton.click({ force: true });
  }
// Create Account form
  async createAccount(){
  await this.handleCookies();
  const dismissOverlay = async () => {
    const cookieBanner = this.page.getByRole('button', { name: 'Accepter alle' }).first();
    if (await cookieBanner.isVisible()) await cookieBanner.click();

    const modalClose = this.page.locator('button', { hasText: 'Close' }).first();
    if (await modalClose.isVisible()) await modalClose.click();

    const renewConsent = this.page.locator('button', { hasText: 'renew consent' });
    if (await renewConsent.isVisible()) await renewConsent.click();
  };
  await this.page.waitForLoadState('networkidle');
  //const emailLocator = this.page.locator('div.RegisterSteps__EmailLabelText-sc-b3f99676-2');  
  const emailLocator = this.page.getByLabel('Email');
  await emailLocator.waitFor({ state: 'visible' ,timeout:60000 });  
  
   return emailLocator;
  }

   get firstNameInput() {
    return this.page.locator('input[data-cy="registerFirstNameInput"]');
  }

  get lastNameInput() {
    return this.page.locator('input[data-cy="registerLastNameInput"]');
  }
  async createaccountForm(firstName: string, lastName: string) {
    await this.handleCookies();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  const createProfileButton = this.page.getByRole('button', { name: 'Create profile' });
  await createProfileButton.waitFor({ state: 'visible' });  
  await createProfileButton.click({ force: true });
    
  }
  // Validation error message dispaly
  get dobErrorMessage() {
    return this.page.locator('p.InputErrorMessage__Message-sc-d574cf36-0.kbVtbK', {
        hasText: 'Please enter a valid date of birth'
    });
}

async expectDobErrorVisible() {
    await this.dobErrorMessage.waitFor({ state: 'visible' });
    
}
 // Dob select 
  get daySelectInput() {
    return this.page.locator('input[id="registerSelectDay"]');
  }

  get monthSelectInput() {
    return this.page.locator('input[id="registerSelectMonth"]');
  }
   get yearSelectInput() {
    return this.page.locator('input[id="registerSelectYear"]');
  }
async dob(){
  await this.handleCookies();
  await this.page.locator('input[id="registerSelectDay"]').click()
  await this.page.locator('.ant-select-item-option-content', { hasText: '1' }).click();
  await this.page.locator('input[id="registerSelectMonth"]').click()
  await this.page.locator('.ant-select-item-option-content', { hasText: 'Apr' }).click();
   const yearOption = this.page.locator('#registerSelectYear');
   await yearOption.click();
   await this.page.mouse.wheel(0, 1000);
  const yearOpt= this.page.locator('.ant-select-item-option-content', { hasText: '2007' });
  
  await yearOpt.waitFor({ state: 'visible', timeout: 10000 });
  await yearOpt.click();

  //await this.page.locator('.ant-select-item-option-content', { hasText: '1983' }).click();
  /*await this.monthSelectInput()
  await this,this.yearSelectInput()
    await this.page.locator('.ant-select-item-option', { hasText: 'English' }).click();*/
}
// Gender-dropdown
async genderSelect(){
await this.handleCookies();
 // await this.page.getByRole('combobox', { name: 'Gender' }).click()
 //await this.page.locator('ant-select-arrow').click();
// const genderDropdown = this.page.locator('div[role="combobox"]:has-text("Select gender")');
const genderDropdown = this.page.locator('text=Gender').locator('..').locator('[role="combobox"]'); 
  await genderDropdown.waitFor({ state: 'visible' });
  await genderDropdown.click();
 // await this.page.locator('.ant-select-item-option-content', { hasText: 'Female' }).click();
 const femaleOption = this.page.locator('.ant-select-item-option-content', { hasText: 'Female' });
  await femaleOption.waitFor({ state: 'visible' });
  await femaleOption.click();
  }
  async createProfileButton(){
    await this.handleCookies();
  //await this.page.locator('input[data-cy="registerNameNextButton"]').click()
  const createProfileBtn=this.page.getByRole('button', { name: 'Create profile' });
  await createProfileBtn.waitFor({ state: 'visible' });  
  await createProfileBtn.click({ force: true });

  }

/*
  async submit() {
    await this.page.click('button[type="submit"]');
  }

  async assertSignupSuccess() {
    await this.page.waitForSelector('text=Welcome');
  }*/
}
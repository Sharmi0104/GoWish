import { Page } from '@playwright/test';
export class signUpPage{
readonly page: Page; // now accessible outside
  constructor(page: Page) {
    this.page = page;
  }
  async handleCookies() {
  const cookieBanner = this.page.locator('#cookie-information-template-wrapper');
  const acceptCookies = this.page.getByRole('button', { name: 'Accepter alle' });

  if (await acceptCookies.isVisible()) {
    await acceptCookies.click({ force: true });
  }

  // Always wait for detachment to ensure it doesn’t block clicks
  await cookieBanner.waitFor({ state: 'hidden', timeout: 10000 });
}
async goto() {
  await this.page.goto('https://onskeskyen.dk/');

  await this.handleCookies();
  

  // Click sign up button
    const signUpButton = this.page.locator('button.Button__Container-sc-74e86c1a-0.fuqvGR');
    await signUpButton.waitFor({ state: 'visible' });   
    await signUpButton.click();

    const signUppage = this.page.getByRole('dialog').getByText('Opret en profil', { exact: true });
  await signUppage.waitFor({ state: 'visible', timeout: 10000 });

  // Change the language
  
}
async changelanguage(){
    await this.handleCookies();
    const dkButton = this.page.getByRole('button', { name: 'DK' });
  await dkButton.waitFor({ state: 'visible' });  
  await dkButton.click({ force: true });
  await this.handleCookies();
    //const language = this.page.locator('div.RegisterStepTitle__PageTitle-sc-a498cb37-0.hlRPPz');
    const language =this.page.getByText('Land og sprog', { exact: true })
    await language.waitFor({ state: 'visible',timeout: 10000  });   
  }
async selectLanguage() {
  await this.handleCookies();
  await this.page.locator('.ant-select-selection-item').nth(1).click();
  await this.page.locator('.ant-select-item-option', { hasText: 'English' }).click();
  this.page.getByRole('button', { name: 'Gem' }).click();
  
}
//Click continue With Email Button
 get continueWithEmailButton() {
    return this.page.getByRole('button', { name: 'Continue with e-mail' });
  }

  
  async clickContinueWithEmail() {
    await this.handleCookies();
    await this.continueWithEmailButton.waitFor({ state: 'visible' });
    await this.continueWithEmailButton.click({force: true });
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
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    
  }
  async clickNextBtn(){
    await this.handleCookies();
    const nextButton = this.page.getByRole('button', { name: 'Next' });
  await nextButton.waitFor({ state: 'visible' });  
  await nextButton.click({ force: true });
  }
// Create Account form
  async createAccount(){
  await this.handleCookies();
  const emailLocator = this.page.locator('div.RegisterSteps__EmailLabelText-sc-b3f99676-2');  
  await emailLocator.waitFor({ state: 'visible' });  
  
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
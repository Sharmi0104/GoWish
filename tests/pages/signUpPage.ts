import { Page } from "@playwright/test";
export class signUpPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async handleCookies() {
    const buttonNames = [
      /accepter alle/i,
      /accept all/i,
      /allow all/i,
      /accept/i,
    ];

    const dismissOverlay = async () => {
      for (const name of buttonNames) {
        const button = this.page.getByRole("button", { name }).first();
        if (await button.isVisible({ timeout: 1000 }).catch(() => false)) {
          await button.click({ force: true }).catch(() => {});
        }
      }

      const modalClose = this.page
        .locator("button", { hasText: /close|luk/i })
        .first();
      if (await modalClose.isVisible().catch(() => false))
        await modalClose.click({ force: true }).catch(() => {});

      const renewConsent = this.page
        .locator("button", { hasText: /renew consent/i })
        .first();
      if (await renewConsent.isVisible().catch(() => false))
        await renewConsent.click({ force: true }).catch(() => {});
    };

    for (let i = 0; i < 3; i++) {
      await dismissOverlay();
      await this.page.waitForTimeout(1000);
    }
    await this.page.evaluate(() => {
      const overlays = ["#cookie-information-template-wrapper", "#coiOverlay"];
      for (const sel of overlays) {
        const el = document.querySelector(sel);
        if (el) el.remove();
      }
    });
  }
  async goto() {
    await this.page.goto("https://onskeskyen.dk/");

    await this.handleCookies();

    // Click sign up button
    const signUpButton = this.page.locator(
      "button.Button__Container-sc-74e86c1a-0.fuqvGR"
    );
    await signUpButton.waitFor({ state: "visible" });
    await signUpButton.click();

    const signUppage = this.page
      .getByRole("dialog")
      .getByText("Opret en profil", { exact: true });
    await signUppage.waitFor({ state: "visible", timeout: 60000 });
  }
  // Change the language
  async changelanguage() {
    await this.handleCookies();
    const dkButton = this.page.getByRole("button", { name: "DK" });
    await dkButton.waitFor({ state: "visible" });
    await dkButton.click({ force: true });
    await this.handleCookies();
    const language = this.page.getByText("Land og sprog", { exact: true });
    await language.waitFor({ state: "visible", timeout: 60000 });
  }
  async selectLanguage() {
    await this.handleCookies();
    await this.page.locator(".ant-select-selection-item").nth(1).click();
    await this.page
      .locator(".ant-select-item-option", { hasText: "English" })
      .click();
    const saveButton = this.page.getByRole("button", { name: /gem|save/i });
    await saveButton.waitFor({ state: "visible" });
    await saveButton.click();

    await this.page
      .getByRole("dialog", { name: /country & language/i })
      .waitFor({ state: "hidden" });
  }
  //Click continue With Email Button
  get continueWithEmailButton() {
    return this.page.getByRole("button", { name: "Continue with e-mail" });
  }
  async clickContinueWithEmail() {
    await this.handleCookies();
    await this.continueWithEmailButton.waitFor({ state: "visible" });
    await this.continueWithEmailButton.click({ force: true });
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
    await this.emailInput.waitFor({ state: "visible", timeout: 60000 });
    await this.emailInput.fill(email);
    await this.passwordInput.waitFor({ state: "visible", timeout: 60000 });
    await this.passwordInput.fill(password);
  }
  async clickNextBtn() {
    await this.handleCookies();
    const nextButton = this.page.getByRole("button", { name: "Next" });
    await nextButton.waitFor({ state: "visible", timeout: 60000 });
    await nextButton.click({ force: true });
  }
  // Create Account form
  async createAccount() {
    await this.handleCookies();

    const emailLocator = this.page.locator(
      "div.RegisterSteps__EmailLabelText-sc-b3f99676-2"
    );
    await emailLocator.waitFor({ state: "visible", timeout: 60000 });

    //return emailLocator;
  }

  get firstNameInput() {
    return this.page.locator('input[data-cy="registerFirstNameInput"]');
  }

  get lastNameInput() {
    return this.page.locator('input[data-cy="registerLastNameInput"]');
  }
  async createaccountForm(firstName: string, lastName: string) {
    await this.handleCookies();
    await this.firstNameInput.waitFor({ state: "visible", timeout: 60000 });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.waitFor({ state: "visible", timeout: 60000 });
    await this.lastNameInput.fill(lastName);
    const createProfileButton = this.page.getByRole("button", {
      name: "Create profile",
    });
    await createProfileButton.waitFor({ state: "visible" });
    await createProfileButton.click({ force: true });
  }
  // Validation error message dispaly
  get dobErrorMessage() {
    return this.page.locator(
      "p.InputErrorMessage__Message-sc-d574cf36-0.kbVtbK",
      {
        hasText: "Please enter a valid date of birth",
      }
    );
  }

  async expectDobErrorVisible() {
    await this.dobErrorMessage.waitFor({ state: "visible" });
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
  async dob() {
    await this.handleCookies();
    await this.page.locator('input[id="registerSelectDay"]').click();
    await this.page
      .locator(".ant-select-item-option-content", { hasText: "1" })
      .click();
    await this.page.locator('input[id="registerSelectMonth"]').click();
    await this.page
      .locator(".ant-select-item-option-content", { hasText: "Apr" })
      .click();
    const yearOption = this.page.locator("#registerSelectYear");
    await yearOption.click();
    await this.page.mouse.wheel(0, 1000);
    const yearOpt = this.page.locator(".ant-select-item-option-content", {
      hasText: "2007",
    });

    await yearOpt.waitFor({ state: "visible", timeout: 10000 });
    await yearOpt.click();
  }
  // Gender-dropdown
  async genderSelect() {
    await this.handleCookies();
    const genderDropdown = this.page
      .locator("text=Gender")
      .locator("..")
      .locator('[role="combobox"]');
    await genderDropdown.waitFor({ state: "visible" });
    await genderDropdown.click();
    const femaleOption = this.page.locator(".ant-select-item-option-content", {
      hasText: "Female",
    });
    await femaleOption.waitFor({ state: "visible" });
    await femaleOption.click();
  }
  async createProfileButton() {
    await this.handleCookies();
    const createProfileBtn = this.page.getByRole("button", {
      name: "Create profile",
    });
    await createProfileBtn.waitFor({ state: "visible" });
    await createProfileBtn.click({ force: true });
  }
}

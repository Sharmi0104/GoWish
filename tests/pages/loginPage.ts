import { Page, expect, Locator } from "@playwright/test";
export class loginPage {
  readonly page: Page; 
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly userActionsContainer: Locator;
  readonly userName: Locator;
  readonly createUserButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.locator('input[data-cy="signupEmailInput"]');
    this.passwordInput = this.page.locator(
      'input[data-testid="loginPasswordInput"]'
    );
    this.loginButton = this.page.locator(
      'button[data-cy="registerNameNextButton"]'
    );
    this.userActionsContainer = page.locator(
      "div.UserHeader__UserActionsContainer-sc-6440e44-5"
    );
    this.userName = this.userActionsContainer.locator(
      "div.UserHeader__Name-sc-6440e44-2"
    );
    this.createUserButton = page.locator("button", { hasText: "Opret bruger" });
  }
  /*async handleCookies() {
    const dismissOverlay = async () => {
      const cookieBanner = this.page
        .getByRole("button", { name: "Accepter alle" })
        .first();
      if (await cookieBanner.isVisible()) await cookieBanner.click();

      const modalClose = this.page
        .locator("button", { hasText: "Close" })
        .first();
      if (await modalClose.isVisible()) await modalClose.click();

      const renewConsent = this.page.locator("button", {
        hasText: "renew consent",
      });
      if (await renewConsent.isVisible()) await renewConsent.click();
    };

    // Retry dismissing overlays until stable
    for (let i = 0; i < 3; i++) {
      await dismissOverlay();
      await this.page.waitForTimeout(500);
    }
     
  }*/
 
///
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

    const modalClose = this.page.locator("button", { hasText: /close|luk/i }).first();
    if (await modalClose.isVisible().catch(() => false)) await modalClose.click({ force: true }).catch(() => {});

    const renewConsent = this.page.locator("button", { hasText: /renew consent/i }).first();
    if (await renewConsent.isVisible().catch(() => false)) await renewConsent.click({ force: true }).catch(() => {});
  };

  for (let i = 0; i < 3; i++) {
    await dismissOverlay();
    await this.page.waitForTimeout(1000);
  }

  // Fallback: force remove overlay if still visible
  await this.page.evaluate(() => {
    const overlays = ['#cookie-information-template-wrapper', '#coiOverlay'];
    for (const sel of overlays) {
      const el = document.querySelector(sel);
      if (el) el.remove();
    }
  });
}

///
  async goto() {
    await this.page.goto("https://onskeskyen.dk/", {
      waitUntil: "domcontentloaded",
    });

    // Click login up button
    const loginButton = this.page.locator("button", { hasText: "Log ind" }); // this.page.locator('div.PublicMenu__LoginButtonWrapper-sc-56d3b660-2 button.Button__Container-sc-74e86c1a-0')
    await loginButton.waitFor({ state: "visible", timeout: 15000 });
    await loginButton.click();
    await this.handleCookies();

    const container = this.page.locator(
      "div.CustomContainer__Container-sc-8ccd59a3-0"
    );
    const continueWithEmail = container.locator("div", {
      hasText: "Fortsæt med e-mail",
    });
    await continueWithEmail.click();

    await this.handleCookies();
    const formContainer = this.page.locator("div", {
      hasText: "Fortsæt med e-mail",
    });
    const pageTitle = formContainer.locator(
      "div.RegisterStepTitle__PageTitle-sc-a498cb37-0"
    );
    await expect(pageTitle).toHaveText("Fortsæt med e-mail");

    //await this.handleCookies();
  }
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
    await this.handleCookies();
  }

  // Fill password
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    await this.handleCookies();
  }

  // Click login
  async submit() {
    await this.loginButton.click({ force: true });
    //await this.loginButton.waitForNavigation({ waitUntil: 'networkidle' });
    await this.handleCookies();
    /*const cookieBanner = this.page.getByRole('button', { name: 'Accepter alle' }).first();
        if (await cookieBanner.isVisible()) {
            await cookieBanner.click();
        }*/
       
  }

  async assertUserName(expectedName: string) {
    // Dismiss cookie banner if visible
    await this.handleCookies();

    const userNameLocator = this.page.locator(
      "div.UserHeader__UserActionsContainer-sc-6440e44-5 div.UserHeader__Name-sc-6440e44-2"
    );
    await expect(userNameLocator).toBeVisible({ timeout: 15000 });

    // Assert username text
    await expect(userNameLocator).toHaveText(expectedName);
  }
}

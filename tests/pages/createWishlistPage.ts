import { Page, expect, Locator } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
export class createWishlistPage {
 readonly page: Page;
  readonly login: loginPage;
  readonly header: Locator;
  readonly titleInput: Locator;
  readonly createButton:Locator;

  constructor(page: Page) {
    this.page = page;
    this.login = new loginPage(page); 
    this.header = this.page.getByRole('heading', { name: 'Create wishlist', level: 1 });;
    this.titleInput = page.locator('input[data-testid="create-wishlist-title-input"]');
    this.createButton = page.locator('[data-testid="createWishlistSubmitButton"]');
  }
  
async clickcreateWishlistBtn(){
   const plusButton = this.page.locator(
    'div.CreateWishlistButton__PlusContainer-sc-61f1046e-0[data-testid="plus-button"]'
  );
  await plusButton.click();

}

async getHeaderText(expectedText: string){
     await expect(this.header).toBeVisible({ timeout: 15000 });
     await expect(this.header).toHaveText(expectedText);
  }

async enterTitle(title: string) {
    await expect(this.titleInput).toBeVisible({ timeout: 15000 });
    await this.titleInput.fill(title);
  }

   async clickCreateButton() {
    await expect(this.createButton).toBeVisible({ timeout: 5000 });
    await this.createButton.click();
  }
//Check wishlist card
 wishlistCard(title: string): Locator {
    return this.page.locator(`[data-cy="wishlistTitle-${title}"]`).first();
  }
async checkwishlistPresent(title: string) {
    const card = this.wishlistCard(title);
    await card.click();
    
    await expect(card).toBeVisible({ timeout: 5000 });
  }
}


    


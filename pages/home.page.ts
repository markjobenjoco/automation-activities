import { test, expect, type Locator, type Page } from '@playwright/test'
import { step } from '../base'

export class HomePage {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Clicks the menu button to open the navigation menu
   */
  @step('Click menu button')
  async clickMenuButton() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click()
  }

  /**
   * Clicks the logout button to log the user out
   */
  @step('Click logout button')
  async clickLogoutButton() {
    await this.page.getByRole('link', { name: 'Logout' }).click()
  }

  /**
   * Add or remove an item from the cart
   *
   * @param itemName - The name of the item to add or remove
   * @param addToCart - A boolean indicating whether to add (true) or remove (false) the item
   */
  async addItemToCart({ itemName, addToCart }: { itemName: string; addToCart: boolean }) {
    const buttonLabel = addToCart ? 'Add to cart' : 'Remove'
    await test.step(`Click ${buttonLabel} button for item: ${itemName}`, async () => {
      await this.page
        .getByTestId('inventory-item')
        .filter({ hasText: itemName })
        .getByRole('button', { name: buttonLabel })
        .click()
    })
  }

  /**
   * Opens the cart by clicking the cart icon
   */
  @step('Open cart')
  async openCart() {
    await this.cartIcon.click()
  }

  /**
   * Retrieves the inventory container element from the Home page
   *
   * @returns The locator for the inventory container
   */
  get productInventory(): Locator {
    return this.page.getByTestId('inventory-container')
  }

  /**
   * Retrieves the cart icon element from the Home page
   *
   * @returns The locator for the cart icon
   */
  get cartIcon(): Locator {
    return this.page.getByTestId('shopping-cart-link')
  }
}

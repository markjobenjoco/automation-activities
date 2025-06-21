import { test, expect, type Locator, type Page } from '@playwright/test'
import { type TestOptions } from '../config/types/test.type'
import { normalizeTestOptions } from '../utils/evaluate'
import { UserDetails } from '../config/types/data'
import { step } from '../base'

export class CheckoutPage {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Removes an item from the cart
   *
   * @param {string} itemName - The name of the item to remove
   * @param {TestOptions} [opts] - Optional parameters for the test
   */
  async removeItemFromCart(itemName: string, opts?: TestOptions) {
    opts = normalizeTestOptions(opts)
    await test.step(`Remove item from cart: ${itemName}`, async () => {
      await this.cartItems.filter({ hasText: itemName }).getByRole('button', { name: 'Remove' }).click()
      if (opts?.toValidate) {
        await expect.soft(this.cartItems.filter({ hasText: itemName })).not.toBeVisible()
      }
    })
  }

  /**
   * Clicks the checkout button
   */
  @step('Click checkout button')
  async clickCheckoutButton() {
    await this.page.getByRole('button', { name: 'Checkout' }).click()
  }

  /**
   * Fills out the checkout form with provided user details and continues
   *
   * @param UserDetails - The user details including first name, last name, and postal code
   */
  @step('Fill checkout form')
  async fillCheckoutForm({ firstName, lastName, postalCode }: UserDetails) {
    await this.page.getByPlaceholder('First Name').fill(firstName)
    await this.page.getByPlaceholder('Last Name').fill(lastName)
    await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode)
    await this.page.getByRole('button', { name: 'Continue' }).click()
  }

  /**
   * Clicks the finish button to complete the checkout
   */
  @step('Click finish button')
  async clickFinishButton() {
    await this.page.getByRole('button', { name: 'Finish' }).click()
  }

  /**
   * Calculates the total price from the cart by summing up individual item prices
   *
   * @returns {Promise<number>} The total price of the items in the cart
   */
  async calculateTotalPriceFromCart(): Promise<number> {
    const priceTexts = await this.page.getByTestId('inventory-item-price').allTextContents()
    const totalPrice = priceTexts.reduce((acc, priceText) => acc + parseFloat(priceText.replace('$', '').trim()), 0)
    return totalPrice
  }

  /**
   * Gets the locator for the cart items
   *
   * @returns {Locator} The Locator instance for cart items
   */
  get cartItems(): Locator {
    return this.page.getByTestId('inventory-item')
  }

  /**
   * Gets the locator for the order summary container
   *
   * @returns {Locator} The Locator instance for the order summary
   */
  get orderSummary(): Locator {
    return this.page.getByTestId('checkout-summary-container')
  }

  /**
   * Gets the locator for the subtotal (item total price)
   *
   * @returns {Locator} The Locator instance for the subtotal label
   */
  get itemTotalPrice(): Locator {
    return this.page.getByTestId('subtotal-label')
  }

  /**
   * Gets the locator for the complete checkout container
   *
   * @returns {Locator} The Locator instance for the checkout complete container
   */
  get completeCheckoutContainer(): Locator {
    return this.page.getByTestId('checkout-complete-container')
  }

  /**
   * Gets the locator for the successful order message
   *
   * @returns {Locator} The Locator instance for the order success message
   */
  get successfulOrderMessage(): Locator {
    return this.page.getByText('THANK YOU FOR YOUR ORDER')
  }
}

import { test, expect } from '../../base.ts'
import { faker } from '@faker-js/faker'
import { FlowHelper } from '../../automation/helpers/flow'
import userData from '../../config/data/users.json'
import productData from '../../config/data/products.json'

test.describe('Sauce Demo checkout test - e2e', () => {
  test('user purchases item', async ({ page, loginPage, homePage, checkoutPage }) => {
    // Set user details for checkout
    const userDetails = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode('####')
    }

    // Login user
    await loginPage.goto()
    await FlowHelper.executeLogin(page, userData.standardUser)

    // Add items to cart
    await test.step('Validate product page displayed', async () => {
      await expect(homePage.productInventory).toBeVisible()
    })
    for await (const product of productData) {
      await homePage.addItemToCart({ itemName: product.name, addToCart: product.addToCart })
    }

    // Open cart
    await test.step(`Validate cart icon displays ${productData.length} items`, async () => {
      await expect(homePage.cartIcon).toHaveText(productData.length.toString())
    })
    await homePage.openCart()

    // Remove an item from cart
    const productToRemoveInCart = productData[productData.findIndex((p) => p.toRemove)].name
    await checkoutPage.removeItemFromCart(productToRemoveInCart, {
      toValidate: true
    })

    // Retrieve total price from cart and proceed to checkout
    const calculatedTotal = await checkoutPage.calculateTotalPriceFromCart()
    await checkoutPage.clickCheckoutButton()
    await checkoutPage.fillCheckoutForm({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      postalCode: userDetails.postalCode
    })

    // Validate checkout order summary
    await test.step('Validate checkout order summary', async () => {
      await expect(checkoutPage.orderSummary).toBeVisible()
      await expect(checkoutPage.itemTotalPrice, {
        message: `Check item total price is correct: ${calculatedTotal.toFixed(2)}`
      }).toHaveText(`Item total: $${calculatedTotal.toFixed(2)}`)
    })
    await checkoutPage.clickFinishButton()
    await test.step('Validate order confirmation page', async () => {
      await expect(checkoutPage.completeCheckoutContainer).toBeVisible()
      await expect(checkoutPage.successfulOrderMessage).toBeVisible()
    })

    // Logout user
    await FlowHelper.executeLogout(page)
    await test.step('Validate user successfully logs out', async () => {
      await expect(loginPage.loginForm).toBeVisible()
    })
  })
})

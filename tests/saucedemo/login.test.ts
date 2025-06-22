import { test, expect } from '../../base.ts'
import { faker } from '@faker-js/faker'
import { FlowHelper } from '../../automation/helpers/flow'
import { ERROR_MESSAGES } from '../../automation/data/constants'
import userData from '../../config/data/users.json'

test.describe('Sauce Demo login test', () => {
  test('validate error message displayed for missing username', async ({ loginPage }) => {
    // Attempt to login with missing username
    await loginPage.goto()
    await loginPage.enterUsername('')
    await loginPage.clickLoginButton()
    await test.step('Validate error message displayed: username', async () => {
      await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.USERNAME_REQUIRED)
    })
  })

  test('validate error message displayed for missing password', async ({ loginPage }) => {
    // Generate fake username
    const fakeUsername = faker.internet.email()

    // Attempt to login with missing password
    await loginPage.goto()
    await loginPage.enterUsername(fakeUsername)
    await loginPage.clickLoginButton()
    await test.step('Validate error message displayed: password', async () => {
      await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.PASSWORD_REQUIRED)
    })
  })

  test('validate error message displayed for invalid credentials', async ({ loginPage }) => {
    // Generate fake credentials
    const fakeCredentials = { username: faker.internet.email(), password: faker.internet.password({ length: 8 }) }

    // Attempt to login with fake credentials
    await loginPage.goto()
    await FlowHelper.executeLogin(loginPage, fakeCredentials)
    await test.step('Validate error message displayed: password', async () => {
      await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.INVALID_CREDENTIALS)
    })
  })

  test('user successful login', async ({ loginPage, homePage }) => {
    // Login user
    await loginPage.goto()
    await FlowHelper.executeLogin(loginPage, userData.standardUser)
    // Validate user is logged in
    await test.step('Validate product page displayed', async () => {
      await expect(homePage.productInventory).toBeVisible()
    })
  })

  test('user successful logout', async ({ loginPage, homePage }) => {
    // Login user
    await loginPage.goto()
    await FlowHelper.executeLogin( loginPage, userData.standardUser)

    // Validate user is logged in
    await test.step('Validate product page displayed', async () => {
      await expect(homePage.productInventory).toBeVisible()
    })

    // Logout user
    await FlowHelper.executeLogout(homePage)
    await test.step('Validate user successfully logs out', async () => {
      await expect(loginPage.loginForm).toBeVisible()
    })
  })
})

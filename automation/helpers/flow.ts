import { Page, test } from '@playwright/test'
import { UserCredentials } from '../../config/types/data'
import { LoginPage } from '../../pages/login.page'
import { HomePage } from '../../pages/home.page'

export class FlowHelper {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Executes the login flow using provided user credentials.
   *
   * @param {Page} page - The Playwright Page object.
   * @param {UserCredentials} param1 - The user credentials containing username and password.
   * @returns {Promise<void>} A promise that resolves when the login steps complete.
   */
  static async executeLogin(page: Page, { username, password }: UserCredentials): Promise<void> {
    const loginPage = new LoginPage(page)
    await test.step('Fill up login form', async () => {
      await loginPage.enterUsername(username)
      await loginPage.enterPassword(password)
      await loginPage.clickLoginButton()
    })
  }

  /**
   * Executes the logout flow.
   *
   * @param {Page} page - The Playwright Page object.
   * @returns {Promise<void>} A promise that resolves when the logout steps complete.
   */
  static async executeLogout(page: Page): Promise<void> {
    const homePage = new HomePage(page)
    await test.step('Logout user', async () => {
      await homePage.clickMenuButton()
      await homePage.clickLogoutButton()
    })
  }
}

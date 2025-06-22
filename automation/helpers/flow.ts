import { test } from '../../base.ts'
import { UserCredentials } from '../../config/types/data'
import { LoginPage } from '../../pages/login.page'
import { HomePage } from '../../pages/home.page'

export class FlowHelper {
  /**
   * Executes the login flow using the provided user credentials.
   *
   * @param {LoginPage} loginPage - The instance of the LoginPage.
   * @param {UserCredentials} credentials - The user credentials object containing `username` and `password`.
   * @returns {Promise<void>} A promise that resolves when the login steps are completed.
   */
  static async executeLogin(loginPage: LoginPage, { username, password }: UserCredentials): Promise<void> {
    await test.step('Fill up login form', async () => {
      await loginPage.enterUsername(username)
      await loginPage.enterPassword(password)
      await loginPage.clickLoginButton()
    })
  }

  /**
   * Executes the logout flow for the current user.
   *
   * @param {HomePage} homePage - The instance of the HomePage.
   * @returns {Promise<void>} A promise that resolves when the logout steps are completed.
   */
  static async executeLogout(homePage: HomePage): Promise<void> {
    await test.step('Logout user', async () => {
      await homePage.clickMenuButton()
      await homePage.clickLogoutButton()
    })
  }
}
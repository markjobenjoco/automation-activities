import { test, expect, type Locator, type Page } from '@playwright/test'
import config from '../playwright.config'
import { type TestOptions } from '../config/types/test.type'
import { normalizeTestOptions } from '../utils/evaluate'
import { step } from '../base'

export class LoginPage {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Navigates to the baseUrl
   */
  @step(`Navigate to: ${config.use?.baseURL}`)
  async goto() {
    await this.page.goto('/')
    await expect.soft(this.loginForm).toBeVisible()
  }

  /**
   * Enters the username into the username field on the login page
   *
   * @param username - The username to enter
   * @param opts - Optional test options, including validation
   */
  @step(`Enter username`)
  async enterUsername(username: string, opts?: TestOptions) {
    opts = normalizeTestOptions(opts)
    const usernameField: Locator = this.page.getByPlaceholder('Username')
    await usernameField.fill(username)
    if (opts?.toValidate) {
      await expect.soft(usernameField).toHaveValue(username)
    }
  }

  /**
   * Enters the username into the username field on the login page
   *
   * @param password - The password to enter
   * @param opts - Optional test options, including validation
   */
  @step(`Enter password`)
  async enterPassword(password: string, opts?: TestOptions) {
    opts = normalizeTestOptions(opts)

    const passwordField: Locator = this.page.getByPlaceholder('Password')
    await passwordField.fill(password)

    if (opts?.toValidate) {
      await expect.soft(passwordField, { message: 'check password is mask' }).toHaveAttribute('type', 'password')
      await expect.soft(passwordField).toHaveAttribute('value', password)
    }
  }

  /**
   * Clicks the login button on the login page
   */
  @step(`Click login button`)
  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Login' }).click()
  }

  /**
   * Retrieves the error message displayed on the login page
   */
  get errorMessage(): Locator {
    return this.page.getByTestId('error')
  }

  /**
   * Retrieves the login form element on the login page
   */
  get loginForm(): Locator {
    return this.page.locator('div#login_button_container')
  }
}

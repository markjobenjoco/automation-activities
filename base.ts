import { test as base } from '@playwright/test'
import { LoginPage } from './pages/login.page'
import { HomePage } from './pages/home.page'
import { CheckoutPage } from './pages/checkout.page'

type MyFixtures = {
  loginPage: LoginPage
  homePage: HomePage
  checkoutPage: CheckoutPage
}

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  }
})

export { expect } from '@playwright/test'

/**
 * Decorator function for wrapping POM methods in a test.step.
 *
 * Use it without a step name `@step()`.
 *
 * Or with a step name `@step("Search something")`.
 *
 * @param stepName - The name of the test step.
 * @returns A decorator function that can be used to decorate test methods.
 */
export function step(stepName?: string) {
  return function decorator(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(...args: any) {
      const name = stepName || `${this.constructor.name}.${context.name as string}`
      return test.step(name, async () => {
        return await target.call(this, ...args)
      })
    }
  }
}

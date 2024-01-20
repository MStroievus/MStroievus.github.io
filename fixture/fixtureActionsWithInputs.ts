import { Application } from '../app/pages/PageManager'
import { test } from './fixtureBase';

export const userOnFormInputs = test.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    await app.homePage.formsDropDown.click()
    await app.homePage.formsInputsCategory.click()
    await use(app);

  }
})


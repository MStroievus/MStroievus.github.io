import { Application } from '../app/pages/PageManager'
import { mainTest } from './fixtureBase';

export const userOnFormInputs = mainTest.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    await app.homePage.formsDropDown.click()
    await app.homePage.formsInputsCategory.click()
    await use(app);

  }
})


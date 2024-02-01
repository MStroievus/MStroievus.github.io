import { Application } from '../app/pages/PageManager'
import { mainTest } from './fixtureBase';

export const userOnFormInputs = mainTest.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    await app.onHomePage.formsDropDown.click()
    await app.onHomePage.formsInputsCategory.click()
    await use(app);

  }
})


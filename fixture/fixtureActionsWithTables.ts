import { Application } from '../app/pages/PageManager'
import { mainTest } from './fixtureBase';

export const userOnTables = mainTest.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    await app.homePage.tablesDataDropDown.click()
    await app.homePage.smartTableCategory.click()


    await use(app);

  }
})


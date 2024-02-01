import { Application } from '../app/pages/PageManager'
import { mainTest } from './fixtureBase';

export const userOnTables = mainTest.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    await app.onHomePage.tablesDataDropDown.click()
    await app.onHomePage.smartTableCategory.click()


    await use(app);

  }
})


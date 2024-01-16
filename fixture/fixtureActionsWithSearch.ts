import { Application } from '../app/pages/PageManager'
import { test } from './fixtureBase';

export const userOnSearch = test.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    await app.homePage.header.searchButton.click()
    await use(app);

  }
})


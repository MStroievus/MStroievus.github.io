import { ConsoleMessage, test as base } from '@playwright/test'
import { Application } from '../app/pages/PageManager'

export const mainTest = base.extend<{ app: Application }>({
  page: async ({ page }, use) => {
    page.on('console', async (msg: ConsoleMessage) => {
      if (msg.type() === 'error') {
        throw new Error('Error')
      }
    })
    //Some new logic that not implemented now 
    await use(page)
    //Some new logic that will be responsible for cleanup
  },
  app: async ({ page }, use) => {
    const app = new Application(page);
    await app.onHomePage.navigateTo()

    await use(app);

    await page.close()
  }
})




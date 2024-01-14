import { ConsoleMessage, test as base } from '@playwright/test'

export const test = base.extend({
  page: async ({ page }, use) => {
    page.on('console', async (msg: ConsoleMessage) => {
      if (msg.type() === 'error') {
        throw new Error('Error')
      }
    })

    //Some new logic that not implemented now 

    await use(page)

    //Some new logic that will be responsible for cleanup
  }

})
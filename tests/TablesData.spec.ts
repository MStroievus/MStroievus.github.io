import { test } from '@playwright/test';
import { userOnTables } from '../fixture/fixtureActionsWithTables';

test.describe('Smart Table functionality', () => {


  userOnTables.only('Check filters on the "Smart Table" table', async ({ app }) => {
    await app.smartTablePage.checkFilters()
  })

})
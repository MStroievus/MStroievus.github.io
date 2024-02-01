import { test } from '@playwright/test';
import { userOnTables } from '../fixture/fixtureActionsWithTables';

test.describe('Smart Table functionality', () => {

  userOnTables('Check sorting for ID column on the "Smart Table" table by ASC @Regression @Smoke', async ({ app }) => {
    await app.smartTablePage.iDTitle.click()//ця  дія включить сортинг по "ASC"
    await app.smartTablePage.checkSortingInColumn(2)
  })

  userOnTables('Check sorting for ID column on the "Smart Table" table by DESC @Regression @Smoke', async ({ app }) => {
    await app.smartTablePage.iDTitle.click()
    await app.smartTablePage.iDTitle.click()//ця  дія включить сортинг по "DESC"
    //?await app.smartTablePage.iDTitle.click({ clickCount: 2 })//не буде працювати тут
    //?await app.smartTablePage.iDTitle.dblclick({ force: true })//не буде працювати тут
    await app.smartTablePage.checkSortingInColumn(2)
  })

  userOnTables('Check sorting for FirstName column on the "Smart Table" table by ASC @Regression', async ({ app }) => {
    await app.smartTablePage.firstNameTitle.click()
    await app.smartTablePage.checkSortingInColumn(3)
  })

  userOnTables('Check sorting for FirstName column on the "Smart Table" table by DESC @Regression', async ({ app }) => {
    await app.smartTablePage.firstNameTitle.click()
    await app.smartTablePage.firstNameTitle.click()
    await app.smartTablePage.checkSortingInColumn(3)
  })

  userOnTables('Check sorting for Last Name column on the "Smart Table" table by ASC @Regression', async ({ app }) => {
    await app.smartTablePage.lastNameTitle.click()
    await app.smartTablePage.checkSortingInColumn(4)
  })

  userOnTables('Check sorting for Last Name column on the "Smart Table" table by DESC @Regression', async ({ app }) => {
    await app.smartTablePage.lastNameTitle.click()
    await app.smartTablePage.lastNameTitle.click()
    await app.smartTablePage.checkSortingInColumn(4)
  })

  userOnTables('Check sorting for Username column on the "Smart Table" table by ASC @Regression', async ({ app }) => {
    await app.smartTablePage.usernameTitle.click()
    await app.smartTablePage.checkSortingInColumn(5)
  })

  userOnTables('Check sorting for Username column on the "Smart Table" table by DESC @Regression', async ({ app }) => {
    await app.smartTablePage.iDTitle.click()
    await app.smartTablePage.iDTitle.click()
    await app.smartTablePage.checkSortingInColumn(5)
  })

  userOnTables('Check sorting for E-mail column on the "Smart Table" table by ASC @Regression', async ({ app }) => {
    await app.smartTablePage.emailTitle.click()
    await app.smartTablePage.checkSortingInColumn(6)
  })

  userOnTables('Check sorting for E-mail column on the "Smart Table" table by DESC @Regression', async ({ app }) => {
    await app.smartTablePage.emailTitle.click()
    await app.smartTablePage.emailTitle.click()
    await app.smartTablePage.checkSortingInColumn(6)
  })

  userOnTables('Check sorting for Age column on the "Smart Table" table by ASC @Regression', async ({ app }) => {
    await app.smartTablePage.ageTitle.click()
    await app.smartTablePage.checkSortingInColumn(7)
  })

  userOnTables.only('Check sorting for Age column on the "Smart Table" table by DESC @Regression', async ({ app }) => {
    await app.smartTablePage.ageTitle.click()
    await app.smartTablePage.ageTitle.click()
    await app.smartTablePage.checkSortingInColumn(7)
  })
})
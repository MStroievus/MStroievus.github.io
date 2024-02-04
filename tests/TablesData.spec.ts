import { expect, test } from '@playwright/test';
import { userOnTables } from '../fixture/fixtureActionsWithTables';
import { newTableRowData } from '../app/model/SmartTabelModel/SmartTabelModel';

test.describe('Smart Table functionality', () => {


  test.describe('Smart Table functionality - sorting', () => {
    userOnTables('Check sorting for ID column on the "Smart Table" table by ASC @Regression @Smoke', async ({ app }) => {
      await app.onSmartTablePage.iDTitle.click()//ця  дія включить сортинг по "ASC"
      await app.onSmartTablePage.checkSortingInColumn(2)
    })

    userOnTables('Check sorting for ID column on the "Smart Table" table by DESC @Regression @Smoke', async ({ app }) => {
      await app.onSmartTablePage.iDTitle.click()
      await app.onSmartTablePage.iDTitle.click()//ця  дія включить сортинг по "DESC"
      //?await app.smartTablePage.iDTitle.click({ clickCount: 2 })//не буде працювати тут
      //?await app.smartTablePage.iDTitle.dblclick({ force: true })//не буде працювати тут
      await app.onSmartTablePage.checkSortingInColumn(2)
    })

    userOnTables('Check sorting for FirstName column on the "Smart Table" table by ASC @Regression', async ({ app }) => {
      await app.onSmartTablePage.firstNameTitle.click()
      await app.onSmartTablePage.checkSortingInColumn(3)
    })

    userOnTables('Check sorting for FirstName column on the "Smart Table" table by DESC @Regression', async ({ app }) => {
      await app.onSmartTablePage.firstNameTitle.click()
      await app.onSmartTablePage.firstNameTitle.click()
      await app.onSmartTablePage.checkSortingInColumn(3)
    })

    userOnTables('Check sorting for Last Name column on the "Smart Table" table by ASC @Regression', async ({ app }) => {
      await app.onSmartTablePage.lastNameTitle.click()
      await app.onSmartTablePage.checkSortingInColumn(4)
    })

    userOnTables('Check sorting for Last Name column on the "Smart Table" table by DESC @Regression', async ({ app }) => {
      await app.onSmartTablePage.lastNameTitle.click()
      await app.onSmartTablePage.lastNameTitle.click()
      await app.onSmartTablePage.checkSortingInColumn(4)
    })

    userOnTables('Check sorting for Username column on the "Smart Table" table by ASC @Regression', async ({ app }) => {
      await app.onSmartTablePage.usernameTitle.click()
      await app.onSmartTablePage.checkSortingInColumn(5)
    })

    userOnTables('Check sorting for Username column on the "Smart Table" table by DESC @Regression', async ({ app }) => {
      await app.onSmartTablePage.iDTitle.click()
      await app.onSmartTablePage.iDTitle.click()
      await app.onSmartTablePage.checkSortingInColumn(5)
    })

    userOnTables('Check sorting for E-mail column on the "Smart Table" table by ASC @Regression', async ({ app }) => {
      await app.onSmartTablePage.emailTitle.click()
      await app.onSmartTablePage.checkSortingInColumn(6)
    })

    userOnTables('Check sorting for E-mail column on the "Smart Table" table by DESC @Regression', async ({ app }) => {
      await app.onSmartTablePage.emailTitle.click()
      await app.onSmartTablePage.emailTitle.click()
      await app.onSmartTablePage.checkSortingInColumn(6)
    })

    userOnTables('Check sorting for Age column on the "Smart Table" table by ASC @Regression', async ({ app }) => {
      await app.onSmartTablePage.ageTitle.click()
      await app.onSmartTablePage.checkSortingInColumn(7)
    })

    userOnTables('Check sorting for Age column on the "Smart Table" table by DESC @Regression', async ({ app }) => {
      await app.onSmartTablePage.ageTitle.click()
      await app.onSmartTablePage.ageTitle.click()
      await app.onSmartTablePage.checkSortingInColumn(7)
    })
  })

  test.describe('Smart Table functionality - filtering', () => {
    userOnTables('Check filtering with invalid data for column on the "Smart Table" table @Regression @Smoke', async ({ app }) => {
      await app.onSmartTablePage.filterLastNamePlaceholder.pressSequentially('Pan_Banyak', { delay: 500 })
      await expect(app.onSmartTablePage.notFoundMessage).toContainText(/ No data found /)
      await expect(app.onSmartTablePage.notFoundMessage).toBeVisible()
    })

    userOnTables('Check filtering with valid data for ID column on the "Smart Table" table  @Regression @Smoke', async ({ app }) => {
      await app.onSmartTablePage.filterIDPlaceholder.pressSequentially('11', { delay: 300 })
      await app.onSmartTablePage.checkFilteringInColumn(2, '11')
    })

    userOnTables('Check filtering with valid data for First Name column on the "Smart Table" table @Regression @Smoke', async ({ app }) => {
      await app.onSmartTablePage.filterFirstNamePlaceholder.pressSequentially('John', { delay: 300 })
      await app.onSmartTablePage.checkFilteringInColumn(3, 'John')
    })

    userOnTables('Check filtering with valid data for Last Name column on the "Smart Table" table  @Regression @Smoke', async ({ app }) => {
      await app.onSmartTablePage.filterLastNamePlaceholder.pressSequentially('otto', { delay: 300 })
      await app.onSmartTablePage.checkFilteringInColumn(4, 'otto')
    })

    userOnTables('Check filtering with valid data for Username column on the "Smart Table" table  @Regression ', async ({ app }) => {
      await app.onSmartTablePage.filterUsernamePlaceholder.pressSequentially('@f', { delay: 300 })
      await app.onSmartTablePage.checkFilteringInColumn(5, '@f')
    })

    userOnTables('Check filtering with valid data for E-mail column on the "Smart Table" table @Regression ', async ({ app }) => {
      await app.onSmartTablePage.filterEmailPlaceholder.pressSequentially('@gmail', { delay: 1000 })
      await app.onSmartTablePage.checkFilteringInColumn(6, '@gmail')
    })

    userOnTables('Check filtering with valid data for Age column on the "Smart Table" table  @Regression ', async ({ app }) => {
      await app.onSmartTablePage.filterAgePlaceholder.pressSequentially('20', { delay: 300 })
      await app.onSmartTablePage.checkFilteringInColumn(7, '20')
    })
  })

  userOnTables('Check the addition of a new column in the table', async ({ app }) => {
    await app.onSmartTablePage.plusButton.click()
    await app.onSmartTablePage.fillFieldsInNewTableRow(newTableRowData)
    await app.onSmartTablePage.checkmarkButton.click()
    await app.onSmartTablePage.checkNewDataInRow(1, newTableRowData)
  })

  userOnTables('Check the editing of a new column in the table', async ({ app }) => {
    await app.onSmartTablePage.getEditButtonByNumber(1)
    await app.onSmartTablePage.fillFieldsInNewTableRow(newTableRowData)
    await app.onSmartTablePage.checkmarkButton.click()
    await app.onSmartTablePage.checkNewDataInRow(1, newTableRowData)
  })

  userOnTables.only('delete', async ({ app }) => {
    await app.onSmartTablePage.getDeletedButtonByNumber(4)
    await app.onSmartTablePage.plusButton.click()

  })

})


import { Locator, expect } from "@playwright/test";
import { BasePage } from "./abstractClasses/BasePage";
import { SmartTableModel } from "../model/SmartTabelModel/SmartTabelModel";

export class SmartTablePage extends BasePage {
  public pagePath: string = '/tables/smart-table'

  //Table
  protected smartTableTable: Locator = this.page.locator('nb-card').filter({ hasText: "Smart Table" })
  //Titles
  readonly iDTitle: Locator = this.page.getByRole('link', { name: 'ID ', exact: true })
  readonly firstNameTitle: Locator = this.page.getByRole('link', { name: " First Name " })
  readonly lastNameTitle: Locator = this.page.getByRole('link', { name: " Last Name " })
  readonly usernameTitle: Locator = this.page.getByRole('link', { name: " Username " })
  readonly emailTitle: Locator = this.page.getByRole('link', { name: " E-mail " })
  readonly ageTitle: Locator = this.page.getByRole('link', { name: " Age " })
  readonly ascChapter: Locator = this.page.locator('[class="ng2-smart-sort-link sort ng-star-inserted asc"]')
  readonly descChapter: Locator = this.page.locator('[class="ng2-smart-sort-link sort ng-star-inserted desc"]')

  //Interactive rows
  readonly plusButton: Locator = this.page.locator('[class="nb-plus"]')
  readonly inputFilters: Locator = this.page.getByRole('textbox')
  readonly filterIDPlaceholder: Locator = this.page.getByPlaceholder('ID')
  readonly filterFirstNamePlaceholder: Locator = this.page.getByPlaceholder('First Name')
  readonly filterLastNamePlaceholder: Locator = this.page.getByPlaceholder('Last Name')
  readonly filterUsernamePlaceholder: Locator = this.page.getByPlaceholder('Username')
  readonly filterEmailPlaceholder: Locator = this.page.getByPlaceholder('E-mail')
  readonly filterAgePlaceholder: Locator = this.page.getByPlaceholder('Age')

  //Interactive columns
  readonly dataOnPage: Locator = this.page.locator('tbody').locator('td:nth-of-type(1n + 2)')
  readonly notFoundMessage: Locator = this.page.locator('tbody tr td')
  readonly checkmarkButton: Locator = this.page.locator('.nb-checkmark')
  readonly closeButton: Locator = this.page.locator('.nb-close')
  readonly idPlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('ID')
  readonly firstNamePlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('First Name')
  readonly lastNamePlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('Last Name')
  readonly userNamePlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('Username')
  readonly emailPlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('E-mail')
  readonly agePlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('Age')
  readonly editButtons: Locator = this.page.locator('[class="nb-edit"]')
  readonly deletedButtons: Locator = this.page.locator('[class="nb-trash"]')

  //Pagination's elements
  readonly paginationControl: Locator = this.page.locator('[class="ng2-smart-pagination-nav ng-star-inserted"]')
  readonly paginationPagesWithNumber: Locator = this.paginationControl.locator('[class$="ng-star-inserted"]')
  readonly moveToFirstPageListItem = this.paginationControl.locator('li').filter({ hasText: '«First' })
  readonly moveToLastPageListItem = this.paginationControl.locator('li').filter({ hasText: '»Last' })
  readonly selectedPageListItem = this.paginationControl.locator('li').filter({ hasText: '(current)' })


  async checkSortingInColumn(columnNumber: number) {
    const textInColumnsBeforeActions = await this.checkDataOnColumns(columnNumber);
    if (await this.ascChapter.isVisible()) {
      textInColumnsBeforeActions.sort((a, b) => parseInt(a) - parseInt(b)); // Sorting in ascending order
    } else if (await this.descChapter.isVisible()) {
      textInColumnsBeforeActions.sort((a, b) => parseInt(b) - parseInt(a)); // Sorting in descending order
    } else {
      throw new Error("Sorting order not detected. but you can donate for Ukraine");
    }
    const textOnColumnsAfterActions = await this.checkDataOnColumns(columnNumber)
    expect(textOnColumnsAfterActions).toEqual(textInColumnsBeforeActions)
  }

  async checkFilteringInColumn(columnNumber: number, keyword: string) {
    const currentFilterInput = this.inputFilters.nth(columnNumber - 2)
    await expect(currentFilterInput).toHaveValue(keyword)
    const textInColumns = await this.checkDataOnColumns(columnNumber);
    if (textInColumns.length > 0) {
      textInColumns.forEach(async (word) => {
        const lowercaseWord = word.toLocaleLowerCase();
        expect(lowercaseWord).toContain(keyword.toLocaleLowerCase());
      });
    } else {
      throw new Error("Filtering order not detected. but you can donate for Ukraine");
    }
  }

  async fillFieldsInNewTableRow(usersData: SmartTableModel) {
    await this.idPlaceholder.fill(usersData.ID)
    await this.firstNamePlaceholder.fill(usersData.firstName)
    await this.lastNamePlaceholder.fill(usersData.lastName)
    await this.userNamePlaceholder.fill(usersData.userName)
    await this.emailPlaceholder.fill(usersData.email)
    await this.agePlaceholder.fill(usersData.age.toString())
  }

  async checkNewDataInRow(rowNumber: number, usersData: SmartTableModel) {
    const modelProperties = Object.keys(usersData);
    for (let i = 0; i < modelProperties.length; i++) {
      const propertyName = modelProperties[i];
      const columnValue = usersData[propertyName];
      const columnNewAddedRow = this.page.locator('tbody').locator(`tr:nth-child(${rowNumber})`).locator('td div[class="ng-star-inserted"]').nth(i);
      await expect(columnNewAddedRow).toHaveText(columnValue.toString());
    }
  }

  //Іншу способи не працюють в цій апці
  async doubleClickOnTitle(columnTitle: Locator) {
    await columnTitle.click()
    await columnTitle.click()
  }

  async getEditButtonByNumber(buttonsNumber: number) {
    await this.editButtons.nth(buttonsNumber - 1).click()
  }

  async deletedRow(buttonsNumber: number) {
    const dataBeforeActions = await this.checkDataOnRows(buttonsNumber)
    await this.acceptAlertDialog()
    await this.deletedButtons.nth(buttonsNumber - 1).click()
    const dataAfterActions = await this.checkDataOnRows(buttonsNumber)
    expect(dataBeforeActions).not.toEqual(dataAfterActions)
  }

  async changePageNumberOnNumber(numberPage: number) {
    const chosenPage = this.paginationPagesWithNumber.filter({ hasText: new RegExp(`^${numberPage}$`) }).first();
    if (chosenPage) {
      await this.paginationControl.waitFor({ state: "visible" })
      const isVisible = await chosenPage.isVisible({ timeout: 3000 });
      if (isVisible) {
        await chosenPage.click();
      } else {
        throw new Error("Please select a page that is visible on the pagination control.");
      }
    }
  }

  async checkDataOnTable() {
    return await this.dataOnPage.allInnerTexts()
  }

  async checkIfSelectedPageIsLastInPaginationControl() {
    const lastPageInPaginationControl = this.paginationPagesWithNumber.last()
    await expect(lastPageInPaginationControl).toContainText("(current)")
  }

  async checkIfSelectedPageIsFirstInPaginationControl() {
    const lastPageInPaginationControl = this.paginationPagesWithNumber.first()
    await expect(lastPageInPaginationControl).toContainText("(current)")
  }

  private async checkDataOnRows(rowNumber: number) {
    const dataInRows = await this.page.locator('nb-layout-column').locator(`tr:nth-child(${rowNumber})`).locator('td:nth-of-type(1n+2)').allInnerTexts()
    return dataInRows;
  }

  //Перший варіант
  private async checkDataOnColumns(columnNumber: number) {
    return await this.page.locator('nb-layout-column').locator(`td:nth-child(${columnNumber})`).allInnerTexts();
  }


  /**
   * 
   * @param columnNumber це номер стовбчика в таблиці,  для кращого розуміння можна  було б добавити енам, щоб люди розуміти назву але  я не  люблю енеми тому буде так, можливо в майбутньому я інплементую це так, щоб можна воно зупинялося на функції щось наприклад коунт до моменту поки (if не дорівнює !приклад назва заголовку)
   * Це другий варіант якще можна це зробити 
   * 
   */
  private async checkDataOnColumns1(columnNumber: number) {
    const dataInColumns = this.page.locator('nb-layout-column').locator(`td:nth-child(${columnNumber})`);
    let dataInArray: string[] = [];
    for (let element of await dataInColumns.all()) {
      if (await element.isVisible()) {  // Ця умова щоб працював філтер, для прикладу можете закоментувавти її і спробувати один тест із фільтром
        const textInElement = await element.innerText();
        dataInArray.push(textInElement);
      }
    }
    return dataInArray
  }




  private async acceptAlertDialog() {
    this.page.on('dialog', dialog => {
      dialog.accept()
    })
  }
}
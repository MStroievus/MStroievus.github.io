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
  readonly notFoundMessage: Locator = this.page.locator('tbody tr td')
  readonly checkmarkButton: Locator = this.page.locator('.nb-checkmark')
  readonly closeButton: Locator = this.page.locator('.nb-close')
  readonly idPlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('ID')
  readonly firstNamePlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('First Name')
  readonly lastNamePlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('Last Name')
  readonly userNamePlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('Username')
  readonly emailPlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('E-mail')
  readonly agePlaceholder: Locator = this.page.locator('input-editor').getByPlaceholder('Age')



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
    const currentFilterInput = this.inputFilters.nth(columnNumber - 2) // чому -2 тому що  така різниця між тим с  селектор і тим який шукає по колонкам, нажаль на данний момент я лише так  можу задизайнити, проте тести будуть працювати я добав ще декілька провірок щоб впенитися що все ок 
    await expect(currentFilterInput).toHaveValue(keyword)
    const textInColumns = await this.checkDataOnColumns(columnNumber); // це  функція створить  аррей із колонок де буде працювати фільтр
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

  async checkNewlyAddedRowAddedAndHasCorrectValues() {

  }








  /**
   * 
   * @param columnNumber - // це номер стовбчика в таблиці,  для кращого розуміння можна  було б добавити енам, щоб люди розуміти назву але  я не  люблю енеми тому буде так, можливо в майбутньому я інплементую це так, щоб можна воно зупинялося на функції щось наприклад коунт до моменту поки (if не дорівнює !приклад назва заголовку)
   * 
   */
  private async checkDataOnColumns(columnNumber: number) {
    const elements = this.page.locator('nb-layout-column').locator(`td:nth-child(${columnNumber})`);
    const elementsInArray: string[] = [];
    for (let element of await elements.all()) {
      if (await element.isVisible()) {  // Ця умова щоб працював філтер, для прикладу можете закоментувавти її і спробувати один тест із фільтром
        const textInElement = await element.innerText();
        elementsInArray.push(textInElement);
      }
    }
    return elementsInArray
  }
}
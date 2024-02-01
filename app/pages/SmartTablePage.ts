import { Locator, expect } from "@playwright/test";
import { BasePage } from "./abstractClasses/BasePage";

export class SmartTablePage extends BasePage {
  public pagePath: string = '/tables/smart-table'

  protected smartTableTable: Locator = this.page.locator('nb-card').filter({ hasText: "Smart Table" })
  readonly iDTitle: Locator = this.page.getByRole('link', { name: 'ID ', exact: true })
  readonly firstNameTitle: Locator = this.page.getByRole('link', { name: " First Name " })
  readonly lastNameTitle: Locator = this.page.getByRole('link', { name: " Last Name " })
  readonly usernameTitle: Locator = this.page.getByRole('link', { name: " Username " })
  readonly emailTitle: Locator = this.page.getByRole('link', { name: " E-mail " })
  readonly ageTitle: Locator = this.page.getByRole('link', { name: " Age " })
  readonly ascChapter: Locator = this.page.locator('[class="ng2-smart-sort-link sort ng-star-inserted asc"]')
  readonly descChapter: Locator = this.page.locator('[class="ng2-smart-sort-link sort ng-star-inserted desc"]')
  protected plusButton: Locator = this.page.locator('ng2-st-add-button')
  protected iDPlaceholder: Locator = this.page.getByPlaceholder('ID')
  protected firstNamePlaceholder: Locator = this.page.getByPlaceholder('First Name')
  protected lastNamePlaceholder: Locator = this.page.getByPlaceholder('Last Name')
  protected usernamePlaceholder: Locator = this.page.getByPlaceholder('Username')
  protected emailPlaceholder: Locator = this.page.getByPlaceholder('E-mail')
  protected agePlaceholder: Locator = this.page.getByPlaceholder('Age')


  /**
   * 
   * @param columnNumber - // це номер стовбчика в таблиці,  для кращого розуміння можна  було б добавити енам, щоб люди розуміти назву але  я не  люблю енеми тому буде так, можливо в майбутньому я інплементую це так, щоб можна воно зупинялося на функції щось наприклад коунт до моменту поки (if не дорівнює !приклад назва заголовку)
   * 
   */
  async checkDataOnColumns(columnNumber: number) {
    const elements = this.page.locator('nb-layout-column').locator(`td:nth-child(${columnNumber})`);
    const elementsInArray: string[] = [];
    for (let element of await elements.all()) {
      const textInElement = await element.innerText();
      elementsInArray.push(textInElement);
    }
    return elementsInArray
  }

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







}
import { Locator } from "@playwright/test";
import { BasePage } from "./abstractClasses/BasePage";

export class SmartTablePage extends BasePage {
  public pagePath: string = '/tables/smart-table'

  protected smartTableTable: Locator = this.page.locator('nb-card').filter({ hasText: "Smart Table" })
  protected iDTitle: Locator = this.page.getByRole('link', { name: " ID " })
  protected firstNameTitle: Locator = this.page.getByRole('link', { name: " First Name " })
  protected lastNameTitle: Locator = this.page.getByRole('link', { name: " Last Name " })
  protected usernameTitle: Locator = this.page.getByRole('link', { name: " Username " })
  protected emailTitle: Locator = this.page.getByRole('link', { name: " E-mail " })
  protected ageTitle: Locator = this.page.getByRole('link', { name: " Age " })
  protected plusButton: Locator = this.page.locator('ng2-st-add-button')
  protected iDPlaceholder: Locator = this.page.getByPlaceholder('ID')
  protected firstNamePlaceholder: Locator = this.page.getByPlaceholder('First Name')
  protected lastNamePlaceholder: Locator = this.page.getByPlaceholder('Last Name')
  protected usernamePlaceholder: Locator = this.page.getByPlaceholder('Username')
  protected emailPlaceholder: Locator = this.page.getByPlaceholder('E-mail')
  protected agePlaceholder: Locator = this.page.getByPlaceholder('Age')



  private async checkDataByColumns(columnNumber: number) {
    const elements = this.page.locator('nb-layout-column').locator(`td:nth-child(${columnNumber})`);
    const elementsInArray: string[] = [];

    for (let element of await elements.all()) {
      const textInElement = await element.innerText();
      elementsInArray.push(textInElement);
    }
  }

}
import { Locator } from "@playwright/test";
import { BasePage } from "./abstractClasses/BasePage";

export class FormInputsPage extends BasePage {
  public pagePath: string = '/tables/smart-table'

  protected smartTableTable: Locator = this.page.locator('nb-card').filter({ hasText: "Smart Table" })
}
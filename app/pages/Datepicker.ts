import { Locator } from "@playwright/test";
import { BasePage } from "./abstractClasses/BasePage";


export class Datepicker extends BasePage {
  public pagePath: string = '/forms/datepicker';

  //Cards
  public commonDatepicker: Locator = this.page.locator('nb-card nb-card-header').filter({ hasText: "Common Datepicker" })
  public formPickerPlaceholder: Locator = this.page.getByPlaceholder('Form Picker')



  async kek() {
    const date = new Date()
    await this.formPickerPlaceholder.pressSequentially(date.toString())
  }

  private async selectDateInTheCalendar() {

  }

}
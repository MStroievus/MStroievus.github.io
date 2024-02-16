import { Locator } from "@playwright/test";
import { BasePage } from "./abstractClasses/BasePage";


export class DatepickerPage extends BasePage {
  public pagePath: string = '/forms/datepicker';

  //Cards
  public commonDatepicker: Locator = this.page.locator('nb-card nb-card-header').filter({ hasText: "Common Datepicker" })
  public formPickerPlaceholder: Locator = this.page.getByPlaceholder('Form Picker')



  async kek(dayAfterToday: string) {
    const date = await this.changeDateFormatToVAlid()
    await this.formPickerPlaceholder.pressSequentially(date.toString(), { delay: 500 })
  }


  private async changeDateFormatToVAlid() {
    let date = new Date()
    const dateWithCorrectFormat = date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })
    return dateWithCorrectFormat
  }

  private async selectDateInTheCalendar() {

  }

}
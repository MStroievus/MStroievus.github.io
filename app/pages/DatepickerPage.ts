import { Locator, expect } from "@playwright/test";
import { BasePage } from "./abstractClasses/BasePage";
import exp from "constants";


export class DatepickerPage extends BasePage {
  public pagePath: string = '/forms/datepicker';

  //Cards
  public commonDatepicker: Locator = this.page.locator('nb-card nb-card-header').filter({ hasText: "Common Datepicker" })
  public formPickerPlaceholder: Locator = this.page.getByPlaceholder('Form Picker')



  async selectDateFromToday(numberOfDaysFromToday: number) {
    const date = await this.changeDateFormatToValid(numberOfDaysFromToday)
    await this.formPickerPlaceholder.fill(date.toString())
    await this.page.keyboard.press('Enter')
  }

  async checkDateInCommonDatepicker(numberOfDaysFromToday: number) {
    let expectedDate: Date;
    let regexPattern: RegExp;

    switch (numberOfDaysFromToday) {
      case -365:
        const previousYear = new Date().getFullYear() - 1;
        regexPattern = new RegExp(previousYear.toString());
        break;
      case -31:
        expectedDate = new Date();
        expectedDate.setMonth(expectedDate.getMonth() - 1);
        regexPattern = new RegExp(expectedDate.toLocaleString('en-US', { month: 'short' }));
        break;
      case -1:
        expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - 1);
        regexPattern = new RegExp(expectedDate.toLocaleDateString('en-US', { day: 'numeric' }));
        break;
      case 0:
        expectedDate = new Date();
        regexPattern = new RegExp(expectedDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
        break;
      case 1:
        expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + 1);
        regexPattern = new RegExp(expectedDate.toLocaleDateString('en-US', { day: 'numeric' }));
        break;
      case 31:
        expectedDate = new Date();
        expectedDate.setMonth(expectedDate.getMonth() + 1);
        regexPattern = new RegExp(expectedDate.toLocaleString('en-US', { month: 'short' }));
        break;
      case 365:
        const nextYear = new Date().getFullYear() + 1;
        regexPattern = new RegExp(nextYear.toString());
        break;
      default:
        throw new Error("Invalid number of days provided.");
    }

    await expect(this.formPickerPlaceholder).toHaveValue(regexPattern);
  }





  private async changeDateFormatToValid(numberOfDaysFromToday: number) {
    let date = new Date()
    date.setDate(date.getDate() + numberOfDaysFromToday)
    const dateWithCorrectFormat = date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })
    return dateWithCorrectFormat
  }

  private async selectDateInTheCalendar() {

  }

}


import { Locator, expect } from "@playwright/test";
import { BasePage } from "./abstractClasses/BasePage";
export class DatepickerPage extends BasePage {
  public pagePath: string = '/forms/datepicker';

  //Cards
  public commonDatepicker: Locator = this.page.locator('nb-card nb-card-header').filter({ hasText: "Common Datepicker" })
  public formPickerPlaceholder: Locator = this.page.getByPlaceholder('Form Picker')
  public datepickerWithRange: Locator = this.page.locator('nb-card nb-card-header').filter({ hasText: "Datepicker With Range" })
  public rangePickerPlaceholder: Locator = this.page.getByPlaceholder('Range Picker')




  async selectDateFromTodayInCommonDatepicker(numberOfDaysFromToday: number) {
    const date = await this.changeDateFormatToValid(numberOfDaysFromToday)
    await this.formPickerPlaceholder.fill(date.toString())
  }

  async selectDateFromTodayInDatepickerWithRange(startRangeAfterToday: number, finishRangeAfterToday: number) {
    const date = await this.changeDateFormatToValidWithRange(startRangeAfterToday, finishRangeAfterToday)
    await this.rangePickerPlaceholder.pressSequentially(date.toString(), { delay: 500 })
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

  async checkSelectedDateFromTodayInDatepickerWithRange(startRangeAfterToday: number, finishRangeAfterToday: number) {
    const date = await this.changeDateFormatToValidWithRange(startRangeAfterToday, finishRangeAfterToday)
    await expect(this.rangePickerPlaceholder).toHaveValue(date.toString())
  }





  private async changeDateFormatToValid(numberOfDaysFromToday: number) {
    let date = new Date()
    date.setDate(date.getDate() + numberOfDaysFromToday)
    const dateWithCorrectFormat = date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })
    return dateWithCorrectFormat
  }

  private async changeDateFormatToValidWithRange(startDay: number, endDay: number) {
    let firstDate = new Date()
    let firstTime = firstDate.setDate(firstDate.getDate() + startDay)
    const firstDateWithCorrectFormat = firstDate.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })
    console.log(firstDateWithCorrectFormat)
    let secondDate = new Date()
    let secondTime = secondDate.setDate(firstDate.getDate() + endDay)
    const secondDateWithCorrectFormat = secondDate.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })
    console.log(secondDateWithCorrectFormat)
    if (firstTime < secondTime) {
      return `${firstDateWithCorrectFormat} - ${secondDateWithCorrectFormat}`
    } else {
      throw new Error('Dude there should be range')
    }
  }
}


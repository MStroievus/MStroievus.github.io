import { Locator, expect } from "@playwright/test";
import { BasePage } from "./abstractClasses/BasePage";
import { DefaultInputsFormModel } from "../model/DefaultInputsModel";
import { waitForDebugger } from "inspector";


export class FormInputsPage extends BasePage {
  public pagePath: string = '/forms/inputs';
  protected projectInput: Locator = this.page.getByPlaceholder("Project")
  protected nickInput: Locator = this.page.getByPlaceholder("Nick")
  protected lastNameInput: Locator = this.page.getByPlaceholder("Last Name")
  protected passwordInput: Locator = this.page.getByPlaceholder("Password")
  protected rectangleBorderInput: Locator = this.page.getByPlaceholder("Rectangle border")
  protected semiRoundBorderInput: Locator = this.page.getByPlaceholder("Semi-round border")
  protected roundedBorderInput: Locator = this.page.getByPlaceholder("Rounded border")
  protected disabledInputInput: Locator = this.page.getByPlaceholder("Disabled input")
  protected textAreaInput: Locator = this.page.getByPlaceholder("Text Area")
  protected smallInputInput: Locator = this.page.getByPlaceholder("Small Input")
  protected mediumInputInput: Locator = this.page.getByPlaceholder("Medium Input")
  protected largeInputInput: Locator = this.page.getByPlaceholder("Large Input")
  protected optionsDropDown: Locator = this.page.locator('nb-card').filter({ hasText: 'Select' }).locator('nb-select')
  protected optionValue: Locator = this.page.locator('nb-option-list').locator('nb-option')



  async fillDefaultInputsForm(usersData: DefaultInputsFormModel) {
    await this.projectInput.fill(usersData.project)
    await this.nickInput.fill(usersData.nick)
    await this.lastNameInput.fill(usersData.lastName)
    await this.passwordInput.pressSequentially(usersData.password)
    await this.rectangleBorderInput.fill(usersData.rectangleBorder)
    await this.semiRoundBorderInput.fill(usersData.semiRoundBorder)
    await this.roundedBorderInput.fill(usersData.roundedBorder)
    this.enableInput()
    await this.disabledInputInput.fill(usersData.disabled)
    await this.textAreaInput.fill(usersData.textArea)
    await this.smallInputInput.fill(usersData.smallInput)
    await this.mediumInputInput.fill(usersData.mediumInput)
    await this.largeInputInput.fill(usersData.largeInput)
  }

  private async enableInput() {
    await this.page.evaluate(() => {
      const selector: any = document.querySelector("input[placeholder$='Disabled input']");
      selector.removeAttribute('disabled',);
    });
  }

  async checkFormInputDataEntered(usersData: DefaultInputsFormModel) {
    await expect(this.projectInput).toHaveValue(usersData.project)
    await expect(this.nickInput).toHaveValue(usersData.nick)
    await expect(this.lastNameInput).toHaveValue(usersData.lastName)
    await expect(this.passwordInput).toHaveValue(usersData.password)
    await expect(this.rectangleBorderInput).toHaveValue(usersData.rectangleBorder)
    await expect(this.semiRoundBorderInput).toHaveValue(usersData.semiRoundBorder)
    await expect(this.roundedBorderInput).toHaveValue(usersData.roundedBorder)
    await expect(this.disabledInputInput).toHaveValue(usersData.disabled)
    await expect(this.textAreaInput).toHaveValue(usersData.textArea)
    await expect(this.smallInputInput).toHaveValue(usersData.smallInput)
    await expect(this.mediumInputInput).toHaveValue(usersData.mediumInput)
    await expect(this.largeInputInput).toHaveValue(usersData.largeInput)
  }


  async selectAllOptionsFromDropDown() {
    for (const option of await this.optionValue.all()) {
      await this.optionsDropDown.click()
      await option.click()
      expect(option).toBeVisible()
      expect(option).toHaveCSS('class', 'selected')
    }
    await this.optionsDropDown.click()
    await this.optionsDropDown.click()

  }
}
import { Locator, expect } from "@playwright/test";
import { BasePage } from "./abstractClasses/BasePage";
import { DefaultInputsFormModel } from "../model/FormsInputsModels/DefaultInputsModel";
import { ValidationStatesModel } from "../model/FormsInputsModels/ValidationStatesModel";
import { checkboxesForValidationStates } from "../model/FormsInputsModels/ValidationStatesModel"

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
  protected optionsList: Locator = this.page.locator('nb-option-list')
  protected optionValue: Locator = this.page.locator('nb-option-list').locator('nb-option')
  protected validationStatesForm: Locator = this.page.locator('nb-card').filter({ hasText: 'Validation States' })
  protected inputWithInfoInput: Locator = this.page.getByPlaceholder('Input with Info')
  protected warningInputInput: Locator = this.page.getByPlaceholder('Warning Input')
  protected dangerInputYellowInput: Locator = this.page.getByPlaceholder('Danger Input').nth(0)
  protected dangerInputRedInput: Locator = this.page.getByPlaceholder('Danger Input').nth(1)
  protected inputWithPrimaryInput: Locator = this.page.getByPlaceholder('Input with Primary')
  protected validationCheckboxes: Locator = this.page.locator('nb-card').filter({ hasText: 'Validation States' }).getByRole('checkbox')
  protected successCheckbox: Locator = this.page.getByRole('checkbox', { name: "Success Checkbox" })
  protected warningCheckbox: Locator = this.page.getByRole('checkbox', { name: "Warning Checkbox" })
  protected dangerCheckbox: Locator = this.page.getByRole('checkbox', { name: "Danger Checkbox" })



  async fillDefaultInputsForm(usersData: DefaultInputsFormModel) {
    await this.projectInput.fill(usersData.project)
    await this.nickInput.fill(usersData.nick)
    await this.lastNameInput.fill(usersData.lastName)
    await this.passwordInput.pressSequentially(usersData.password,)// { delay: 1000, } Просто  уявіть що хтось  хто помаленько  друкую свій пароль xD
    await this.rectangleBorderInput.fill(usersData.rectangleBorderComment)
    await this.semiRoundBorderInput.fill(usersData.semiRoundBorderComment)
    await this.roundedBorderInput.fill(usersData.roundedBorderComment)
    await this.enableInput("input[placeholder$='Disabled input']")
    await this.disabledInputInput.fill(usersData.disabledComment)
    await this.textAreaInput.fill(usersData.textAreaComment)
    await this.smallInputInput.fill(usersData.smallInputComment)
    await this.mediumInputInput.fill(usersData.mediumInputComment)
    await this.largeInputInput.fill(usersData.largeInputComment)

  }

  private async enableInput(querySelector: string) {
    await this.page.evaluate(() => {
      const selector: any = document.querySelector(querySelector);
      selector.removeAttribute('disabled',);
    });
  }

  async checkDefaultInputFormDataEntered(usersData: DefaultInputsFormModel) {
    await expect(this.projectInput).toHaveValue(usersData.project)
    await expect(this.nickInput).toHaveValue(usersData.nick)
    await expect(this.lastNameInput).toHaveValue(usersData.lastName)
    await expect(this.passwordInput).toHaveValue(usersData.password)
    await expect(this.rectangleBorderInput).toHaveValue(usersData.rectangleBorderComment)
    await expect(this.semiRoundBorderInput).toHaveValue(usersData.semiRoundBorderComment)
    await expect(this.roundedBorderInput).toHaveValue(usersData.roundedBorderComment)
    await expect(this.disabledInputInput).toHaveValue(usersData.disabledComment)
    await expect(this.textAreaInput).toHaveValue(usersData.textAreaComment)
    await expect(this.smallInputInput).toHaveValue(usersData.smallInputComment)
    await expect(this.mediumInputInput).toHaveValue(usersData.mediumInputComment)
    await expect(this.largeInputInput).toHaveValue(usersData.largeInputComment)
  }

  async selectAllOptionsFromDropDown() {
    await this.optionsDropDown.click()
    const options = await this.optionValue.all()
    for (let option of options) {
      const list = await this.optionsList.isVisible()
      if (list) {
        await option.click()
      } else {
        await this.optionsDropDown.click()
        await option.click()
      }
    }
  }

  async fillInputsForValidationStatesForm(usersData: ValidationStatesModel) {
    await this.inputWithInfoInput.fill(usersData.inputWithInfoComment)
    await this.warningInputInput.fill(usersData.warningInputComment)
    await this.dangerInputYellowInput.fill(usersData.dangerInputYellowComment)
    await this.dangerInputRedInput.pressSequentially(usersData.dangerInputRedComment)
    await this.inputWithPrimaryInput.fill(usersData.inputWithPrimaryComment)
  }

  async changeCheckboxesState() {
    for (const checkbox of await this.validationCheckboxes.all()) {
      await checkbox.check({ force: true })
    }
  }
  //Давайте, що після внесення валідних значеннь у нас міняється  бекграунд поля і нам потрібно його провірити
  async checkValidationStatesFormDataEnteredAndFormBackground(usersData: ValidationStatesModel) {
    await expect(this.inputWithInfoInput).toHaveValue(usersData.inputWithInfoComment)
    await expect(this.inputWithInfoInput).toHaveCSS("border-color", 'rgb(0, 149, 255)')
    await expect(this.warningInputInput).toHaveValue(usersData.warningInputComment)
    await expect(this.warningInputInput).toHaveCSS("border-color", "rgb(0, 214, 143)")
    await expect(this.dangerInputYellowInput).toHaveValue(usersData.dangerInputYellowComment)
    await expect(this.dangerInputYellowInput).toHaveCSS("border-color", "rgb(255, 170, 0)")
    await expect(this.dangerInputRedInput).toHaveValue(usersData.dangerInputRedComment)
    await expect(this.dangerInputRedInput).toHaveCSS("border-color", "rgb(255, 61, 113)")
    await expect(this.inputWithPrimaryInput).toHaveValue(usersData.inputWithPrimaryComment)
    await expect(this.inputWithPrimaryInput).toHaveCSS("border-color", "rgb(51, 102, 255)")
  }

  async checkCheckBoxesState() {
    for (const checkbox in await this.validationCheckboxes.all()) {
      await expect(checkbox).
    }
  }
}
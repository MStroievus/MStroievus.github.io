import { test } from '@playwright/test';
import { userOnDatepicker, userOnFormInputs } from '../fixture/fixtureActionsWithInputs';
import { validDataForDefaultInputsForm } from "../app/model/FormsInputsModels/DefaultInputsModel"
import { validDataForValidationStates } from '../app/model/FormsInputsModels/ValidationStatesModel';
import { setOfDateForCommonDatepicker } from '../app/Data/Datepicker/Datepicker';

test.describe('Form inputs functionality', () => {


  userOnFormInputs('Fill out Default Inputs form  @Regression @Smoke', async ({ app }) => {
    await app.onFormInputsPage.fillDefaultInputsForm(validDataForDefaultInputsForm)
    await app.onFormInputsPage.checkDefaultInputFormDataEntered(validDataForDefaultInputsForm)
  });


  userOnFormInputs('Check that the user can select all options in the selection form @Regression @Smoke', async ({ app }) => {
    await app.onFormInputsPage.selectAllOptionsFromDropDown()
  });


  userOnFormInputs('Fill ou Validation States @Regression @Smoke', async ({ app }) => {
    await app.onFormInputsPage.fillInputsForValidationStatesForm(validDataForValidationStates)
    await app.onFormInputsPage.changeCheckboxesStateInValidationStatesFrom()
    await app.onFormInputsPage.checkValidationStatesFormDataEnteredAndFormBackground(validDataForValidationStates)
    await app.onFormInputsPage.checkCheckBoxesStateInValidationStatesFrom()
  });

  userOnFormInputs('Fill ou Validation States only inputs @Smoke', async ({ app }) => {
    await app.onFormInputsPage.fillInputsForValidationStatesForm(validDataForValidationStates)
    await app.onFormInputsPage.changeCheckboxesStateInValidationStatesFrom()
    await app.onFormInputsPage.checkValidationStatesFormDataEnteredAndFormBackground(validDataForValidationStates)
    await app.onFormInputsPage.checkCheckBoxesStateInValidationStatesFrom()
  })

  userOnFormInputs('Check checkboxes in CheckBox form @Smoke', async ({ app }) => {
    await app.onFormInputsPage.checkAllCheckboxesUncheckedInCheckboxesForm()
    await app.onFormInputsPage.checkAllCheckboxesCheckedInCheckboxesForm()
    // або ми можемо зробити це з меншим дублюванням але ускладнивши нашу функцію
    await app.onFormInputsPage.checkAllCheckboxesInCheckBoxForm(false)
    await app.onFormInputsPage.checkAllCheckboxesInCheckBoxForm(true)
  });

  test.describe('Datepicker functionality', () => {
    const testData = setOfDateForCommonDatepicker

    for (const { nameOfDate, numberOfDaysFromToday } of testData) {
      userOnDatepicker(`Check Common Datepicker functionality with time ${nameOfDate}`, async ({ app }) => {
        await app.onDatepickerPage.selectDateFromTodayInCommonDatepicker(numberOfDaysFromToday)
        await app.onDatepickerPage.checkDateInCommonDatepicker(numberOfDaysFromToday)
      })
    }

    userOnDatepicker("Check Datepicker With Range functionality", async ({ app }) => {
      await app.onDatepickerPage.selectDateFromTodayInDatepickerWithRange(0, 19)
      await app.onDatepickerPage.checkSelectedDateFromTodayInDatepickerWithRange(0, 19)
      await app.onDatepickerPage.selectDateFromTodayInCommonDatepicker(1)
    })
  })
})
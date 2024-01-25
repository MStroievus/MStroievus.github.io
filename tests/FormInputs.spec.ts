import { test } from '@playwright/test';
import { userOnFormInputs } from '../fixture/fixtureActionsWithInputs';
import { validDataForDefaultInputsForm } from "../app/model/FormsInputsModels/DefaultInputsModel"
import { validDataForValidationStates } from '../app/model/FormsInputsModels/ValidationStatesModel';

test.describe('Form inputs functionality', () => {


  userOnFormInputs('Fill out Default Inputs form  @Regression @Smoke', async ({ app }) => {
    await app.formInputsPage.fillDefaultInputsForm(validDataForDefaultInputsForm)
    await app.formInputsPage.checkDefaultInputFormDataEntered(validDataForDefaultInputsForm)
  });


  userOnFormInputs('Check that the user can select all options in the selection form @Regression @Smoke', async ({ app }) => {
    await app.formInputsPage.selectAllOptionsFromDropDown()
  });


  userOnFormInputs('Fill ou Validation States @Regression @Smoke', async ({ app }) => {
    await app.formInputsPage.fillInputsForValidationStatesForm(validDataForValidationStates)
    await app.formInputsPage.changeCheckboxesStateInValidationStatesFrom()
    await app.formInputsPage.checkValidationStatesFormDataEnteredAndFormBackground(validDataForValidationStates)
    await app.formInputsPage.checkCheckBoxesStateInValidationStatesFrom()
  });

  userOnFormInputs('Fill ou Validation States only inputs @Smoke', async ({ app }) => {
    await app.formInputsPage.fillInputsForValidationStatesForm(validDataForValidationStates)
    await app.formInputsPage.changeCheckboxesStateInValidationStatesFrom()
    await app.formInputsPage.checkValidationStatesFormDataEnteredAndFormBackground(validDataForValidationStates)
    await app.formInputsPage.checkCheckBoxesStateInValidationStatesFrom()
  });

  userOnFormInputs('Check checkboxes in CheckBox form @Smoke', async ({ app }) => {
    await app.formInputsPage.checkAllCheckboxesUncheckedInCheckboxesForm()
    await app.formInputsPage.checkAllCheckboxesCheckedInCheckboxesForm()
    // або ми можемо зробити це з меншим дублюванням але ускладнивши нашу функцію
    await app.formInputsPage.checkAllCheckboxesInCheckBoxForm(false)
    await app.formInputsPage.checkAllCheckboxesInCheckBoxForm(true)
  });

})
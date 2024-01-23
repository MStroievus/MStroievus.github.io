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


  userOnFormInputs.only('Check  @Regression @Smoke', async ({ app }) => {
    //await app.formInputsPage.fillInputsForValidationStatesForm(validDataForValidationStates)
    await app.formInputsPage.changeCheckboxesState()
    //await app.formInputsPage.checkValidationStatesFormDataEnteredAndFormBackground(validDataForValidationStates)
    await app.formInputsPage.checkCheckBoxesState()
  });
})
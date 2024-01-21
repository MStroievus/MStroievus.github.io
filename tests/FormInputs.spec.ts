import { test } from '@playwright/test';
import { userOnFormInputs } from '../fixture/fixtureActionsWithInputs';
import { validDataForDefaultInputsForm } from "../app/model/DefaultInputsModel"
import { validDataForValidationStates } from '../app/model/ValidationStatesModel';

test.describe('Form inputs functionality', () => {


  userOnFormInputs('Fill out Default Inputs form  @Regression @Smoke', async ({ app }) => {
    await app.formInputsPage.fillDefaultInputsForm(validDataForDefaultInputsForm)
    await app.formInputsPage.checkDefaultInputFormDataEntered(validDataForDefaultInputsForm)
  });


  userOnFormInputs.only('Check that the user can select all options in the selection form @Regression @Smoke', async ({ app }) => {
    await app.formInputsPage.selectAllOptionsFromDropDown()
  });


  userOnFormInputs('Check  @Regression @Smoke', async ({ app }) => {
    await app.formInputsPage.fillInputsForValidationStatesForm(validDataForValidationStates)
    await app.formInputsPage.checkCheckboxes()
    await app.formInputsPage.checkValidationStatesFormDataEnteredAndFormBackground(validDataForValidationStates)
  });
})
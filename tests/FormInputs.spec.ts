import { test, expect } from '@playwright/test';
import { validDataForDefaultInputsForm } from "../app/model/DefaultInputsModel"
import { userOnFormInputs } from '../fixture/fixtureActionsWithInputs';

test.describe('Form inputs functionality', () => {


  userOnFormInputs('Fill out Default Inputs form  @Regression @Smoke', async ({ app }) => {
    await app.formInputsPage.fillDefaultInputsForm(validDataForDefaultInputsForm)
    await app.formInputsPage.checkFormInputDataEntered(validDataForDefaultInputsForm)
  });


  userOnFormInputs.only('Fasd', async ({ app }) => {
    await app.formInputsPage.selectAllOptionsFromDropDown()
  });
})
import { faker } from '@faker-js/faker';

export class ValidationStatesModel {
  constructor(
    public inputWithInfoComment: string,
    public warningInputComment: string,
    public dangerInputYellowComment: string,
    public dangerInputRedComment: string,
    public inputWithPrimaryComment: string,
  ) { }
}

export const validDataForValidationStates = new ValidationStatesModel(
  faker.lorem.sentence(),
  faker.lorem.sentence(),
  faker.lorem.sentence(),
  faker.lorem.sentence(),
  faker.lorem.sentence(),

);


export const checkboxesForValidationStates = {
  'Success Checkbox': {
    "border-color": 'rgb(0, 214, 143)',
    "background-color": 'rgb(0, 214, 143)'
  },
  'Warning Checkbox': {
    'border-color': "rgb(255, 170, 0)",
    'background-color': "rgb(255, 170, 0)"
  },
  'Danger Checkbox': {
    'border-color': "rgb(219, 44, 102)",
    'background-color': "rgb(219, 44, 102)"
  }

}
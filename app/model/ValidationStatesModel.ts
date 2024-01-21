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

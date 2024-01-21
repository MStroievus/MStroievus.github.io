import { faker } from '@faker-js/faker';

export class DefaultInputsFormModel {
  constructor(
    public project: string,
    public nick: string,
    public lastName: string,
    public password: string,
    public rectangleBorderComment: string,
    public semiRoundBorderComment: string,
    public roundedBorderComment: string,
    public disabledComment: string,
    public textAreaComment: string,
    public smallInputComment: string,
    public mediumInputComment: string,
    public largeInputComment: string,
  ) { }
}

export const validDataForDefaultInputsForm = new DefaultInputsFormModel(
  faker.company.name(),
  faker.person.firstName('female'),
  faker.person.lastName(),
  faker.finance.bitcoinAddress(),
  faker.lorem.sentence(),
  faker.lorem.sentence(),
  faker.lorem.sentence(),
  faker.lorem.sentence(),
  faker.lorem.paragraphs(),
  faker.lorem.sentence(),
  faker.lorem.sentence(),
  faker.lorem.sentence()
);

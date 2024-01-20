import { faker } from '@faker-js/faker';

export class DefaultInputsFormModel {
  constructor(
    public project: string,
    public nick: string,
    public lastName: string,
    public password: string,
    public rectangleBorder: string,
    public semiRoundBorder: string,
    public roundedBorder: string,
    public disabled: string,
    public textArea: string,
    public smallInput: string,
    public mediumInput: string,
    public largeInput: string,
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

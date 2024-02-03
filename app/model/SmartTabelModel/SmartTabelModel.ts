import { faker } from '@faker-js/faker';

export class SmartTableModel {
  constructor(
    public ID: string,
    public firstName: string,
    public lastName: string,
    public userName: string,
    public email: string,
    public age: number

  ) { }
}

export const newTableRowData = new SmartTableModel(
  faker.number.int({ min: 200, max: 500 }).toString(),
  faker.person.firstName(),
  faker.person.lastName('male'),
  faker.person.jobDescriptor(),
  faker.internet.email({ allowSpecialCharacters: true, provider: '@slava.Ukraine.com' }),
  faker.number.int({ min: 21, max: 100 }) // для  прикладу тут добавляю і такий варіант 
);

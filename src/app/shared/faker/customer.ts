import { faker } from '@faker-js/faker';

export function generateFakeCustomer(rows: number) {
  const customers = [];
  for (let i = 0; i < rows; i++) {
    customers.push(createFakeCustomer());
  }
  return customers;
}

function createFakeCustomer() {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });

  return {
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    idCard: faker.string.numeric(12),
    firstName,
    lastName,
    email,
    sex,
    phoneNumber: faker.phone.number(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
    company: faker.company.name(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
}

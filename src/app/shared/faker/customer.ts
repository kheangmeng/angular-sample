import { faker } from '@faker-js/faker';

export function generateFakeCustomer(rows: number) {
  const customers = [];
  for (let i = 0; i < rows; i++) {
    customers.push(createFakeCustomer());
  }
  return customers;
}
export function generateFakeCountry(rows: number) {
  const countries = [];
  for (let i = 0; i < rows; i++) {
    countries.push(createCountry());
  }
  return countries;
}
export function generateFakeCity(rows: number) {
  const cities = [];
  for (let i = 0; i < rows; i++) {
    cities.push(createCity());
  }
  return cities;
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
      country: faker.location.country(),
      city: faker.location.city(),
      buildingNumber: faker.location.buildingNumber(),
      zipCode: faker.location.zipCode(),
      street: faker.location.streetAddress(),
    },
    company: faker.company.name(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
}

function createCountry() {
  return {
    id: faker.number.int({ min: 1, max: 10 }),
    name: faker.location.country(),
    code: faker.location.countryCode(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }
}

function createCity() {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    name: faker.location.city(),
    countryId: faker.number.int({ min: 1, max: 10 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }
}

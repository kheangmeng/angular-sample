import { faker } from '@faker-js/faker';

export function generateFakeProduct(rows: number) {
  const customers = [];
  for (let i = 0; i < rows; i++) {
    customers.push(createFakeProduct());
  }
  return customers;
}

export function generateFakeOptionType(rows: number) {
  const optionTypes = [];
  for (let i = 0; i < rows; i++) {
    optionTypes.push(createOptionType());
  }
  return optionTypes;
}

export function generateFakeOptionValue(rows: number) {
  const optionValues = [];
  for (let i = 0; i < rows; i++) {
    optionValues.push(createOptionValue());
  }
  return optionValues;
}

function createFakeProduct() {
  return {
    id: faker.string.uuid(),
    basePrice: faker.commerce.price({ min: 120, max: 3250, dec: 0 }),
    name: faker.commerce.productName(),
    slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    brand: faker.company.name(),
    isActive: faker.datatype.boolean(0.8),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
}

function createOptionType() {
  return {
    id: faker.number.int({ min: 1, max: 10 }),
    name: faker.commerce.productMaterial(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }
}

function createOptionValue() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productMaterial(),
    optionTypeId: faker.number.int({ min: 1, max: 10 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }
}

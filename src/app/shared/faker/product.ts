import { faker } from '@faker-js/faker';

export function generateFakeProduct(rows: number) {
  const products = [];
  for (let i = 0; i < rows; i++) {
    products.push(createFakeProduct());
  }
  return products;
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
    category: createFakeCategory(),
    brand: faker.company.name(),
    variants: [createFakeProductVariant(), createFakeProductVariant()],
    isActive: faker.datatype.boolean(0.8),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
}

function createFakeProductVariant() {
  return {
    id: faker.string.uuid(),
    productId: faker.number.int({ min: 1, max: 10 }),
    sku: faker.string.alphanumeric(10),
    price: faker.commerce.price({ min: 120, max: 3250, dec: 0 }),
    stockQuantity: faker.number.int({ min: 1, max: 100 }),
    weight: faker.number.int({ min: 1, max: 100 }),
    isActive: faker.datatype.boolean(0.8),
    image: faker.image.url(),
    optionTypeId: faker.number.int({ min: 1, max: 5 }),
    optionValueId: faker.number.int({ min: 1, max: 10 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }
}

function createFakeCategory() {
  return {
    id: faker.number.int({ min: 1, max: 5 }),
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    isActive: faker.datatype.boolean(0.8),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }
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

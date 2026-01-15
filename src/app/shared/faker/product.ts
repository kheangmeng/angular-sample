import { faker } from '@faker-js/faker';

export function generateFakeProduct(rows: number) {
  const customers = [];
  for (let i = 0; i < rows; i++) {
    customers.push(createFakeProduct());
  }
  return customers;
}

function createFakeProduct() {
  return {
    id: faker.string.uuid(),
    basePrice: faker.commerce.price({ min: 20, max: 250, dec: 0, symbol: '$' }),
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

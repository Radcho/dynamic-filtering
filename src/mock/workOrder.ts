import { faker } from '@faker-js/faker';
import { WorkOrder } from '../types';

// When first used, we create a new seed for faker-js so that results are consistent throughout the lifecycle of the app
const stableSeed = Date.now();

export const generateWorkOrders = (count = 10, seed = stableSeed) => {
  faker.seed(seed);
  const today = new Date();
  return Array(count)
    .fill(null)
    .map<WorkOrder>(() => {
      const startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        faker.number.int({ min: 5, max: 21 }),
        0,
        0,
        0,
      );
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startDate.getHours() + faker.number.int({ min: 1, max: 3 }),
        0,
        0,
        0,
      );

      return {
        id: faker.string.uuid(),
        name: `WO-${faker.string.numeric(6)}`,
        color: faker.helpers.arrayElement(['Blue', 'Purple', 'Black']),
        description: faker.lorem.sentence(),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: faker.helpers.arrayElement(['Open', 'In Progress', 'Closed']),
        type: faker.helpers.arrayElement(['Installation', 'Maintenance', 'Failure']),
        client: {
          name: faker.company.name(),
          address: faker.location.streetAddress(),
        },
        contract: 'Full Service 24/7',
        installation: 'Suntech 245Wp-2151',
        note: faker.lorem.sentence({ min: 1, max: 3 }),
      };
    });
};

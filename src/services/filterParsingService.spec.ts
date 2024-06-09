import invalidFormat from '@/assets/testFilters/invalidFormat.json';
import withUserInput from '@/assets/testFilters/withUserInput.json';
import withoutUserInput from '@/assets/testFilters/withoutUserInput.json';
import { WorkOrder } from '@/types';
import { describe, expect, it } from 'vitest';
import { FiltersFile, filterParsingService } from './filterParsingService';

describe('filterParsingService', () => {
  it('should parse filters successfully', () => {
    const result = filterParsingService.withFilters(withUserInput as FiltersFile).getFilterNames();
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('Open Orders by Type');
    expect(result[1]).toBe('Advanced');
  });

  it('should throw an error if the entered file is invalid', () => {
    expect(() =>
      filterParsingService.withFilters(invalidFormat as FiltersFile).getFilterNames(),
    ).toThrowError();
  });

  it('should parse the filters and return the correct required user inputs', () => {
    const service = filterParsingService.withFilters(withUserInput as FiltersFile);
    expect(service.getFilter('Open Orders by Type').requiredFields).toEqual(['type']);
    expect(service.getFilter('Advanced').requiredFields.sort()).toEqual(
      ['type', 'status', 'startDate'].sort(),
    );
  });

  it('should parse the filters and see that no user inputs are required', () => {
    const service = filterParsingService.withFilters(withoutUserInput as FiltersFile);
    service.getFilterNames().forEach((name) => {
      expect(service.getFilter(name).requiredFields).toEqual([]);
    });
  });

  it('should filter work orders to only have ones that are open and installation', () => {
    const service = filterParsingService.withFilters(withoutUserInput as FiltersFile);
    const openOrders = workOrders.filter((order) => service.getFilter('Open Orders').filter(order));
    expect(openOrders).toHaveLength(3);
  });

  it('should filter work orders to only have ones that are open and installation', () => {
    const service = filterParsingService.withFilters(withUserInput as FiltersFile);
    const openOrders = workOrders.filter((order) =>
      service.getFilter('Open Orders by Type').filter(order, { type: 'Installation' }),
    );
    expect(openOrders).toHaveLength(1);
    expect(openOrders[0].type).toBe('Installation');
  });
});

/**
 * Previously generated work orders for testing purposes
 */
const workOrders: WorkOrder[] = [
  {
    id: 'e5b478a9-4b1f-450d-ace3-038062096653',
    name: 'WO-343379',
    color: 'Black',
    description: 'Theca vespillo cado vitium expedita nostrum defessus veritas.',
    startDate: '2024-06-08T04:00:00.000Z',
    endDate: '2024-06-08T06:00:00.000Z',
    status: 'Closed',
    type: 'Maintenance',
    client: {
      name: 'Kemmer - Gislason',
      address: '6278 Treutel Camp',
    },
    contract: 'Full Service 24/7',
    installation: 'Suntech 245Wp-2151',
    note: 'Verto.',
  },
  {
    id: '77bded2a-a08b-41de-92e4-d8bafed1fe6d',
    name: 'WO-233491',
    color: 'Black',
    description: 'Claustrum clam cariosus validus iure commemoro coadunatio.',
    startDate: '2024-06-08T19:00:00.000Z',
    endDate: '2024-06-08T22:00:00.000Z',
    status: 'Open',
    type: 'Failure',
    client: {
      name: 'McLaughlin, Schultz and Grant',
      address: "405 O'Kon Ports",
    },
    contract: 'Full Service 24/7',
    installation: 'Suntech 245Wp-2151',
    note: 'Et tondeo advoco.',
  },
  {
    id: 'b1c6816b-da59-42c2-b604-3cc54f63082f',
    name: 'WO-557899',
    color: 'Blue',
    description: 'Argentum aestas tergiversatio confido ara.',
    startDate: '2024-06-08T11:00:00.000Z',
    endDate: '2024-06-08T14:00:00.000Z',
    status: 'Open',
    type: 'Installation',
    client: {
      name: "Terry, O'Hara and Romaguera",
      address: '1372 The Causeway',
    },
    contract: 'Full Service 24/7',
    installation: 'Suntech 245Wp-2151',
    note: 'Incidunt laborum solum.',
  },
  {
    id: 'c6e62667-e087-4bb6-9b7a-ecd54abf4008',
    name: 'WO-085136',
    color: 'Black',
    description: 'Voluptas vel alius desparatus iusto.',
    startDate: '2024-06-08T17:00:00.000Z',
    endDate: '2024-06-08T20:00:00.000Z',
    status: 'Open',
    type: 'Maintenance',
    client: {
      name: 'Jacobson Group',
      address: '975 Wellington Road',
    },
    contract: 'Full Service 24/7',
    installation: 'Suntech 245Wp-2151',
    note: 'Annus aduro aggero.',
  },
  {
    id: '4bdfd29e-94c3-4915-b6e1-463d6f2e83f7',
    name: 'WO-186811',
    color: 'Purple',
    description: 'Varietas debilito torrens verumtamen nemo.',
    startDate: '2024-06-08T03:00:00.000Z',
    endDate: '2024-06-08T05:00:00.000Z',
    status: 'Closed',
    type: 'Maintenance',
    client: {
      name: 'Ratke - Daugherty',
      address: '7809 Alfred Street',
    },
    contract: 'Full Service 24/7',
    installation: 'Suntech 245Wp-2151',
    note: 'Curia.',
  },
];

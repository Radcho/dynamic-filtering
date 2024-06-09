import filters1 from '@/assets/filters1.json';
import { FilterFunction, Filters, WorkOrderFilterableFields } from '@/types';

type FilterField = {
  field: WorkOrderFilterableFields;
  value: string;
};

type FilterMultiQuery = {
  operator: 'AND' | 'OR';
  parameters: (FilterQuery | FilterField)[];
};

type FilterQuery = FilterMultiQuery | FilterField;

type Filter = {
  name: string;
  query: FilterQuery;
};

/**
 * Shape of the filters JSON file
 */
export type FiltersFile = {
  filters: Filter[];
};

type ParsedQuery = [FilterFunction, WorkOrderFilterableFields[]];

// Change this to test out a different filter file
const ACTIVE_FILTER_FILE = filters1 as FiltersFile;

// Created a service to handle the actual filtering, since Redux doesn't allow complex data types in its store.
// Since the filters are static files that don't change at runtime, we can access the filtering functions like this.
// If this was a real application, we would want to put these in some sort of context or a more robust service that is compatible with redux.
class FilterParsingService {
  private filters: Filters = {};

  constructor(filtersObject = ACTIVE_FILTER_FILE) {
    filtersObject.filters.forEach(({ name, query }) => {
      const [filterFunction, requiredFields] = this.parseQuery(query);
      this.filters[name] = { name, filter: filterFunction, requiredFields };
    });
  }

  /**
   * Creates a new instance of the service with the given filters, used for unit testing
   */
  public withFilters = (filtersObject: FiltersFile): FilterParsingService => {
    return new FilterParsingService(filtersObject);
  };

  public getFilterNames = () => {
    return Object.keys(this.filters);
  };

  public getFilter = (name: string) => {
    return this.filters[name];
  };

  /**
   * This parses the most atomic part of the json file, which are the field/value pairs
   */
  private parseFieldQuery = ({ field, value }: FilterField): ParsedQuery => {
    if (!value || !field) {
      throw new Error('Invalid field filter configuration');
    }

    if (value === 'AskUser') {
      const filterFunction: FilterFunction = (workOrder, userInputs) => {
        return workOrder[field] === userInputs?.[field];
      };

      return [filterFunction, [field]] as const;
    }

    const filterFunction: FilterFunction = (workOrder) => {
      return workOrder[field] === value;
    };

    return [filterFunction, []] as const;
  };

  /**
   * Recursive method for traversing and parsing the filter query
   */
  private parseQuery = (query: FilterQuery): ParsedQuery => {
    if ('field' in query) {
      return this.parseFieldQuery(query);
    }

    const { operator, parameters } = query;

    if (!operator || !parameters || !Array.isArray(parameters)) {
      throw new Error('Invalid multi query filter configuration');
    }

    const filterFunctions: FilterFunction[] = [];
    const requiredFields: WorkOrderFilterableFields[] = [];

    parameters.forEach((parameter) => {
      const [parameterFunc, parameterFields] = this.parseQuery(parameter);
      filterFunctions.push(parameterFunc);
      requiredFields.push(...parameterFields);
    });

    if (operator === 'AND') {
      const filterFunction: FilterFunction = (workOrder, userInputs) => {
        return filterFunctions.every((filterFunction) => filterFunction(workOrder, userInputs));
      };

      return [filterFunction, requiredFields] as const;
    }

    const filterFunction: FilterFunction = (workOrder, userInputs) => {
      return filterFunctions.some((filterFunction) => filterFunction(workOrder, userInputs));
    };

    return [filterFunction, requiredFields] as const;
  };
}

export const filterParsingService = new FilterParsingService();

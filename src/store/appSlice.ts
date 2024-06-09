import { generateWorkOrders } from '@/mock/workOrder';
import { filterParsingService } from '@/services/filterParsingService';
import { FilterInput, WorkOrder, WorkOrderFilterableFields } from '@/types';
import { dedupeArray } from '@/utils/array';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  workOrders: generateWorkOrders(),
  filters: filterParsingService.getFilterNames(),
  activeFilters: {} as Record<string, FilterInput>,
};

type AppStoreState = typeof initialState;

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    enableFilter: (state, action: PayloadAction<{ name: string; parameters?: FilterInput }>) => {
      state.activeFilters[action.payload.name] = action.payload.parameters ?? {};
    },
    disableFilter: (state, action: PayloadAction<{ name: string }>) => {
      if (action.payload.name in state.activeFilters) {
        delete state.activeFilters[action.payload.name];
      }
    },
  },
  selectors: {
    // This is a memoized selector that returns the unique values for each field in the work orders.
    // I tried restricting the types here, but since the component is generic, the resulting `WorkOrder[Property]` value ends up as a string anyway.
    // I kept the selector as I wrote it initially anyway, just to showcase it, even though it is very much overengineered for this purpose.
    workOrderUniqueValues: createSelector(
      [
        (state: AppStoreState) => state.workOrders,
        <T extends WorkOrderFilterableFields>(_: AppStoreState, fields: T[]) => fields,
      ],
      <T extends WorkOrderFilterableFields>(workOrders: WorkOrder[], fields: T[]) => {
        const uniqueFor = <Property extends T>(key: Property): WorkOrder[Property][] => {
          return dedupeArray(workOrders.map((workOrder) => workOrder[key]));
        };

        const result = {} as { [Property in T]: WorkOrder[Property][] };

        fields.forEach((field) => {
          result[field] = uniqueFor(field);
        });

        return result;
      },
    ),
  },
});

export const { enableFilter, disableFilter } = appSlice.actions;
export const { workOrderUniqueValues } = appSlice.selectors;

export default appSlice.reducer;

type WorkOrderStatus = 'Open' | 'In Progress' | 'Closed';
type WorkOrderType = 'Installation' | 'Maintenance' | 'Failure';
type WorkOrderColor = 'Blue' | 'Purple' | 'Black';

export type WorkOrder = {
  id: string;
  name: string;
  status: WorkOrderStatus;
  type: WorkOrderType;
  color: WorkOrderColor;
  startDate: string;
  endDate: string;
  description: string;
  client: {
    name: string;
    address: string;
  };
  installation: string;
  contract: string;
  note: string;
};

// `client` is a nested object in WorkOrder, so we ignore it for the purposes of this assignment
export type WorkOrderFilterableFields = Exclude<keyof WorkOrder, 'client'>;

export type FilterInput<T extends WorkOrderFilterableFields = WorkOrderFilterableFields> = Partial<
  Record<T, WorkOrder[T]>
>;

export type FilterFunction = (workOrder: WorkOrder, userInputs?: FilterInput) => boolean;

export type Filter = {
  name: string;
  filter: FilterFunction;
  requiredFields: WorkOrderFilterableFields[];
};

export type Filters = Record<string, Filter>;

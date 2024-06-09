import { WorkOrder } from '@/components/WorkOrder';
import { filterParsingService } from '@/services/filterParsingService';
import { useAppSelector } from '@/store';
import style from './WorkOrderList.style.module.css';

export const WorkOrderList = () => {
  const workOrders = useAppSelector((state) => state.app.workOrders);
  const activeFilters = useAppSelector((state) => state.app.activeFilters);

  const displayedWorkOrders = workOrders.filter((workOrder) => {
    return Object.entries(activeFilters).every(([filterName, filterInput]) => {
      return filterParsingService.getFilter(filterName).filter(workOrder, filterInput);
    });
  });

  return (
    <div className={style.workOrderList}>
      {displayedWorkOrders.map((workOrder) => (
        <WorkOrder key={workOrder.id} workOrder={workOrder} />
      ))}
    </div>
  );
};

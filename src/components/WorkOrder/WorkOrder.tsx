import { WorkOrder as WorkOrderType } from '@/types';
import { mergeClasses } from '@/utils/css';
import { formatDate } from '@/utils/date';
import { OrderSection } from './OrderSection';
import style from './WorkOrder.style.module.css';

type WorkOrderProps = {
  workOrder: WorkOrderType;
};

// Tried making the work order components close to the mock-up design.
// So while the assignment mentioned ignoring other fields, I included them with very minimal styling to get closer to the design.
export const WorkOrder = ({ workOrder }: WorkOrderProps) => {
  const getColorClass = () => {
    switch (workOrder.color) {
      case 'Blue':
        return style.blue;
      case 'Purple':
        return style.purple;
      case 'Black':
        return style.black;
      default:
        return '';
    }
  };

  return (
    <div className={mergeClasses(style.workOrder, getColorClass())}>
      <div className={style.header}>
        <div className={style.dates}>
          <span>{formatDate(workOrder.startDate)}</span> -{' '}
          <span>{formatDate(workOrder.endDate)}</span>
        </div>
        <div>{workOrder.name}</div>
        <div>{workOrder.type}</div>
        <div className={style.alignRight}>{workOrder.status}</div>
      </div>
      <div className={style.content}>
        <div className={style.contentColumn}>
          <OrderSection label="Client" text={[workOrder.client.name, workOrder.client.address]} />
        </div>
        <div className={style.contentColumn}>
          <OrderSection label="Installation" text={workOrder.installation} />
          <OrderSection label="Contract" text={workOrder.contract} />
        </div>
        <div className={mergeClasses(style.contentColumn, style.double)}>
          <OrderSection label="Note" text={workOrder.note} />
          <OrderSection label="Description" text={workOrder.description} />
        </div>
      </div>
    </div>
  );
};

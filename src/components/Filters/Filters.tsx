import { useAppSelector } from '@/store';
import { Filter } from './Filter';
import style from './Filters.style.module.css';

export const Filters = () => {
  const filters = useAppSelector((state) => state.app.filters);

  return (
    <div className={style.filtersContainer}>
      {filters.map((filter) => (
        <Filter key={filter} name={filter} />
      ))}
    </div>
  );
};

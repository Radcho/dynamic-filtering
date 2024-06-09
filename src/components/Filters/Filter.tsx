import { filterParsingService } from '@/services/filterParsingService';
import { useAppDispatch, useAppSelector } from '@/store';
import { disableFilter, enableFilter } from '@/store/appSlice';
import { mergeClasses } from '@/utils/css';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import style from './Filters.style.module.css';
import { FilterPrompt } from './FilterPrompt';

type FilterProps = {
  name: string;
};

export const Filter = ({ name }: FilterProps) => {
  const dispatch = useAppDispatch();
  const isFilterActive = useAppSelector((state) => !!state.app.activeFilters[name]);
  const [popupContainer, setPopupContainer] = useState(false);
  const filterButtonRef = useRef<HTMLDivElement>(null);

  const filter = filterParsingService.getFilter(name);

  const onFilterClick = () => {
    if (filter.requiredFields.length === 0) {
      dispatch(isFilterActive ? disableFilter({ name }) : enableFilter({ name }));
      return;
    }

    setPopupContainer(!popupContainer);
  };

  return (
    <>
      <div
        ref={filterButtonRef}
        className={mergeClasses(style.filter, isFilterActive && style.active)}
        onClick={onFilterClick}
      >
        {filter.name}
      </div>
      {popupContainer &&
        filterButtonRef.current &&
        createPortal(
          <FilterPrompt
            name={name}
            bounds={filterButtonRef.current.getBoundingClientRect()}
            onApply={(filterInputs) => {
              setPopupContainer(false);
              dispatch(enableFilter({ name, parameters: filterInputs }));
            }}
            onReset={() => {
              setPopupContainer(false);
              dispatch(disableFilter({ name }));
            }}
            onCancel={() => setPopupContainer(false)}
          />,
          document.body,
        )}
    </>
  );
};

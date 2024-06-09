import { filterParsingService } from '@/services/filterParsingService';
import { useAppSelector } from '@/store';
import { workOrderUniqueValues } from '@/store/appSlice';
import { FilterInput } from '@/types';
import { formatDate } from '@/utils/date';
import { toKebabCase, toTitleCase } from '@/utils/string';
import { useEffect, useState } from 'react';
import style from './Filters.style.module.css';

type FilterPromptProps = {
  bounds: DOMRect;
  name: string;
  onApply: (inputs: FilterInput) => void;
  onCancel: () => void;
  onReset: () => void;
};

// In the interest of time, I kept the FilterPrompt component fairly basic.
// In a real application, this component would be more complex, supporting scenarios such asi multiple value queries or other inputs than just a dropdown.
export const FilterPrompt = ({ bounds, name, onApply, onCancel, onReset }: FilterPromptProps) => {
  const { requiredFields } = filterParsingService.getFilter(name);
  const fieldOptions = useAppSelector((state) => workOrderUniqueValues(state, requiredFields));
  const activeInput = useAppSelector((state) => state.app.activeFilters[name]);
  const isFilterActive = !!activeInput;

  const getActiveFilterInputs = (activeInput: FilterInput) => {
    if (activeInput) {
      return { ...activeInput };
    }

    const state: FilterInput = {};
    requiredFields.forEach((field) => {
      state[field] = fieldOptions[field][0];
    });
    return state;
  };

  const [filterInputs, setFilterInputs] = useState(getActiveFilterInputs(activeInput));

  useEffect(() => {
    setFilterInputs(getActiveFilterInputs(activeInput));
  }, [activeInput]);

  return (
    <div className={style.filterPrompt} style={{ left: bounds.left, top: bounds.bottom }}>
      {requiredFields.map((field) => (
        <div className={style.filterInput} key={field}>
          <label htmlFor={`select-${toKebabCase(name)}-${field}`}>{toTitleCase(field)}</label>
          <select
            id={`select-${toKebabCase(name)}-${field}`}
            name={`select-${toKebabCase(name)}-${field}`}
            value={filterInputs[field]}
            onChange={(e) => setFilterInputs({ ...filterInputs, [field]: e.target.value })}
          >
            {fieldOptions[field].map((option) => (
              <option key={option} value={option}>
                {field === 'startDate' || field === 'endDate' ? formatDate(option) : option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className={style.actions}>
        <button id={`button-${toKebabCase(name)}-apply`} onClick={() => onApply(filterInputs)}>
          Apply
        </button>
        <button
          id={`button-${toKebabCase(name)}-reset`}
          disabled={!isFilterActive}
          onClick={() => isFilterActive && onReset()}
        >
          Reset
        </button>
        <button id={`button-${toKebabCase(name)}-cancel`} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

'use client';

import { UseFormRegister } from 'react-hook-form';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

const FormSelect = <T,>({
  label,
  optionsObj,
  name,
  register,
  defaultValue,
  displayAll = false,
  onSelect,
}: {
  label: string;
  optionsObj: Record<string, string>; //key-value pairs for options
  name: string; //for registering input with React Hook Form
  register?: UseFormRegister<any>; //for registering input with React Hook Form
  defaultValue: string; //for controlled input
  setStateValue?: Dispatch<SetStateAction<T>>; //for controlled input
  displayAll: boolean; //for displaying "All" option
  onSelect?: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const selectProps =
    register && name
      ? { ...register(name) }
      : {
          defaultValue,
          onChange: onSelect,
          name,
        };

  return (
    <label className='select'>
      <span className='label'>{label}</span>

      <select {...selectProps} className='select'>
        {displayAll && <option value={`all`}>All</option>}

        {Object.entries(optionsObj).map(([key, val]) => (
          <option key={key} value={key}>
            {val}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FormSelect;

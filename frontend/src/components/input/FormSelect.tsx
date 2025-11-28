import { UseFormRegister } from 'react-hook-form';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

const FormSelect = <T,>({
  label,
  optionsObj,
  name,
  register,
  setStateValue,
  value = '',
  displayAll = false,
}: {
  label: string;
  optionsObj: Record<string, string>; //key-value pairs for options
  name?: string; //for registering input with React Hook Form
  register?: UseFormRegister<any>; //for registering input with React Hook Form
  value?: string; //for controlled input
  setStateValue?: Dispatch<SetStateAction<T>>; //for controlled input
  displayAll?: boolean; //for displaying "All" option
}) => {
  const selectProps =
    register && name
      ? { ...register(name) }
      : {
          value: value,
          onChange: (e: ChangeEvent<HTMLSelectElement>) => {
            console.log(e.target.value);
            setStateValue && setStateValue(e.target.value as T);
          },
        };

  return (
    <label className='select'>
      <span className='label'>{label}</span>

      <select {...selectProps} className='select'>
        <option value={``} disabled>
          {`Select ${label}`}
        </option>

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

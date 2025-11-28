import { UseFormRegister } from 'react-hook-form';

type CheckboxGroupProps = {
  legend: string;
  optionsObj: {};
  name: string;
  required?: boolean;
  register?: UseFormRegister<any>;
  stateValue?: string[];
  setterFunction?: (value: string) => void;
  checked?: boolean;
};

//These components can work with both react-hook-form and controlled components, but are tightly coupled to the setterFunction prop for controlled components.
//If you want to use these components with react-hook-form, pass the register prop and the name of the field.
//If you want to use these components as controlled components, pass the stateValue and setterFunction props.

const CheckboxGroup = ({
  legend,
  required = false,
  optionsObj,
  register,
  name,
  stateValue = [],
  setterFunction,
}: CheckboxGroupProps) => {
  return (
    <fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4  w-full'>
      <legend className='fieldset-legend text-base'>
        {legend}
        {required && (
          <span className='text-gray-500 text-sm font-normal'>(required)</span>
        )}
      </legend>

      {Object.entries(optionsObj).map(([key, val]): React.ReactNode => {
        return (
          <label key={key} className='label text-sm mb-1'>
            <input
              type='checkbox'
              value={key}
              className='checkbox-xs checkbox checkbox-primary mr-1'
              {...(register
                ? { ...register(name) }
                : {
                    name: name,
                    checked: stateValue.includes(key),
                    onChange: (e) => {
                      if (setterFunction) setterFunction(e.target.value);
                    },
                  })}
            />
            {val as string}
          </label>
        );
        {
          /* {error && <p className='text-red-500 text-sm'>{}</p>} */
        }
      })}
    </fieldset>
  );
};

export default CheckboxGroup;

import { UseFormRegister } from 'react-hook-form';

//if this component is to be used with react-hook-form, the register prop is required
const LabelText = ({
  label,
  required,
  type,
  name,
  register,
  extraProps = {},
}: {
  label: String;
  required: Boolean;
  type: 'input' | 'textarea';
  name: string;
  register?: UseFormRegister<any>;

  extraProps?: {};
}) => {
  const inputProps = register && name ? { ...register(name) } : {};
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm'>
        {label}{' '}
        <span className='text-gray-500'>
          {required ? '(required)' : '(optional)'}
        </span>
      </label>

      {type === 'input' && (
        <input
          type='text'
          className='input w-full'
          {...inputProps}
          {...extraProps}
        />
      )}

      {type === 'textarea' && (
        <textarea className='textarea w-full min-h-40' {...inputProps} />
      )}
    </div>
  );
};

export default LabelText;

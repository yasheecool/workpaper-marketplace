'use client';

import FormSelect from '@/components/input/FormSelect';
import Form from 'next/form';
import { useRef } from 'react';

const Filters = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form action={''} ref={formRef}>
      <div className='flex items-center gap-4'>
        <p>Filters:</p>
        <FormSelect
          label='Status'
          name='status'
          defaultValue='installed'
          optionsObj={{ installed: 'Installed', requested: 'Requested' }}
          displayAll={false}
          onSelect={() => formRef.current?.requestSubmit()}
        />
      </div>
    </Form>
  );
};
export default Filters;

'use client';

import FormSelect from '@/components/input/FormSelect';
import { listingTypeOptions } from '@/types/domain/listing';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const Filters = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formRef.current?.requestSubmit();
    // updateSearchParams(e.target.name, e.target.value);
  };

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
          onSelect={handleChange}
        />
        {/* <FormSelect
          label='Listing Type'
          name='content-type'
          defaultValue='all'
          optionsObj={listingTypeOptions}
          displayAll={true}
          onSelect={handleChange}
        /> */}
      </div>
    </Form>
  );
};
export default Filters;

'use client';

import CheckboxGroup from '@/components/input/CheckboxGroup';
import {
  workpaperTypeOptions,
  listingTypeOptions,
  entityTypeOptions,
} from '@/types/domain/listing';
import Form from 'next/form';
import { useRouter, useSearchParams } from 'next/navigation';

function useSelectedValues(param: string) {
  const searchParams = useSearchParams();
  return searchParams.getAll(param); // supports multi-select
}

const SearchFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const contentSelected = useSelectedValues('content-type');
  const workpaperSelected = useSelectedValues('workpaper-type');
  const entitySelected = useSelectedValues('entity-type');

  const toggleValue = (param: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const current = next.getAll(param);
    const exists = current.includes(value);

    const updated = exists
      ? current.filter((v) => v !== value)
      : [...current, value];

    next.delete(param);
    updated.forEach((v) => next.append(param, v));

    router.replace(`?${next.toString()}`, { scroll: false });
  };

  return (
    <div className='flex-col gap-4 hidden min-[992px]:flex min-[992px]:row-start-2 min-[992px]:col-start-1 justify-start'>
      <Form action=''>
        <CheckboxGroup
          legend='Content Type'
          optionsObj={listingTypeOptions}
          name='content-type'
          selectedValues={contentSelected}
          onToggle={toggleValue}
        />

        <CheckboxGroup
          legend='Workpaper Type'
          optionsObj={workpaperTypeOptions}
          name='workpaper-type'
          selectedValues={workpaperSelected}
          onToggle={toggleValue}
        />

        <CheckboxGroup
          legend='Entity Type'
          optionsObj={entityTypeOptions}
          name='entity-type'
          selectedValues={entitySelected}
          onToggle={toggleValue}
        />
      </Form>
    </div>
  );
};

export default SearchFilters;

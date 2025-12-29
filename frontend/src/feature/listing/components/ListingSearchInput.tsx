'use client';

import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const ListingSearchInput = () => {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('search') || '';
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);
  const router = useRouter();

  const updateSearchTermInURL = (term: string) => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    if (term) {
      urlSearchParams.set('search', term);
    } else {
      urlSearchParams.delete('search');
    }

    urlSearchParams.delete('page'); // Reset to first page on new search

    router.replace(`?${urlSearchParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    updateSearchTermInURL(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <input
      type='search'
      required
      placeholder='Search'
      defaultValue={initialSearchTerm}
      onChange={(e) => {
        setLocalSearchTerm(e.target.value);
      }}
    />
  );
};
export default ListingSearchInput;

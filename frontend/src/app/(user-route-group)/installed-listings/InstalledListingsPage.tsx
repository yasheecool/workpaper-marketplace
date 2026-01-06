'use client';
import FormSelect from '@/components/input/FormSelect';
import { CONTENT_TYPE } from '@/types/types';

import { useState } from 'react';
import TableWrapper from './TableWrapper';
import Loading from '@/components/ui/Loading';
import { ContentType } from '@/types/types';

const InstalledListingsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<
    'installed' | 'requested'
  >('installed'); // for toggling between installed and requested listings

  const [contentType, setContentType] = useState<ContentType | 'all'>('all'); //for filtering by content type

  return (
    <section className='py-8 min-h-[calc(100vh-140px)]'>
      <div className='section-container flex flex-col gap-6 h-full'>
        <h1 className='text-2xl font-semibold border-b-[0.5px] border-gray-400 pb-2'>
          Installed and Requested Listings{' '}
        </h1>
        {/* FILTERS */}
        <div className='flex items-center gap-4'>
          <p>Filters:</p>
          <FormSelect
            label='Status'
            optionsObj={{ installed: 'Installed', requested: 'Requested' }}
            value={selectedStatus}
            setStateValue={setSelectedStatus}
          />
          <FormSelect
            label='Listing Type'
            optionsObj={CONTENT_TYPE}
            displayAll={true}
            value={contentType}
            setStateValue={setContentType}
          />
        </div>
        {/* 
        <div className='h-full rounded-md overflow-x-auto border-[0.5px] border-gray-200 max-w-full'>
          {isLoading || isLoadingRequested ? (
            <Loading />
          ) : (
            <TableWrapper
              records={filteredRecords}
              currentStatus={selectedStatus}
            />
          )}
        </div>
        <p className=' text-sm text-gray-600'>
          Total {selectedStatus} listings: {currentRecords?.length}
        </p> */}
      </div>
    </section>
  );
};

export default InstalledListingsPage;

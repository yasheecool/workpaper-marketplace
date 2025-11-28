'use client';
import { useState } from 'react';
import PendingRequests from './PendingRequests';
import CompletedRequests from './CompletedRequests';
import Tabs from '@/components/ui/Tabs';

const ListingRequests = () => {
  const [currentView, setCurrentView] = useState<'pending' | 'completed'>(
    'pending'
  );

  const tabs = [
    {
      label: 'Pending',
      onClick: () => setCurrentView('pending'),
      isActive: currentView === 'pending',
    },
    {
      label: 'Completed',
      onClick: () => setCurrentView('completed'),
      isActive: currentView === 'completed',
    },
  ];

  return (
    <div className='text-gray-800'>
      <div className='p-4 flex flex-col gap-8'>
        {/* TABS */}
        <div>
          <Tabs tabs={tabs} />
        </div>

        {currentView === 'pending' && <PendingRequests />}
        {currentView === 'completed' && <CompletedRequests />}
      </div>
    </div>
  );
};
export default ListingRequests;

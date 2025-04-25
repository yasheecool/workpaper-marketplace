'use client';
import ListingEditor from '../../ui/ListingEditor';
import { useState } from 'react';

const page = () => {
  const [currentView, setCurrentView] = useState<'editor' | 'whitelist'>(
    'editor'
  );

  return (
    <div className='flex flex-col h-full'>
      <div className='breadcrumbs py-4 px-6 border-b-[0.5px] border-gray-400 overflow-clip'>
        <ul>
          <li>
            <a>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='h-4 w-4 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                ></path>
              </svg>
              Listings
            </a>
          </li>
          <li>
            <a>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='size-5'
              >
                <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
              </svg>
              Create
            </a>
          </li>
        </ul>
      </div>

      <div className='px-6'>
        <div
          role='tablist'
          className='tabs tabs-border border-b-[0.5px] pt-2 border-gray-400 font-semibold text-primary-500'
        >
          <a
            role='tab'
            className={`tab ${currentView === 'editor' ? 'tab-active' : ''} hover:text-primary-500`}
            onClick={() => setCurrentView('editor')}
          >
            Editor
          </a>
          <a
            role='tab'
            className={`tab ${currentView === 'whitelist' ? 'tab-active' : ''} hover:text-primary-500`}
            onClick={() => setCurrentView('whitelist')}
          >
            Whitelist Management
          </a>
        </div>
      </div>

      <div className='px-6 py-8 overflow-auto'>
        {currentView === 'editor' && <ListingEditor />}
        {currentView === 'whitelist' && (
          <>
            <div>
              <table className='table'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Firm Name</th>
                    <th>Approve Time</th>
                    <th>Actioned By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='hover:bg-base-300'>
                    <th>1</th>
                    <td className='link link-hover'>
                      GST Reconciliation Checklist
                    </td>
                    <td>Checklist</td>
                    <td>12 Apr 2025</td>
                    <td>Open</td>
                    <td>Ellipsis Menu Here</td>
                  </tr>
                  <tr className='hover:bg-base-300'>
                    <th>2</th>
                    <td className='link link-hover'>FBT Summary Report</td>
                    <td>Report</td>
                    <td>10 Apr 2025</td>
                    <td>Limited</td>
                    <td>Ellipsis Menu Here</td>
                  </tr>
                  <tr className='hover:bg-base-300'>
                    <th>3</th>
                    <td className='link link-hover'>Income Tax Calculator</td>
                    <td>Calculation</td>
                    <td>08 Apr 2025</td>
                    <td>Closed</td>
                    <td>Ellipsis Menu Here</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default page;

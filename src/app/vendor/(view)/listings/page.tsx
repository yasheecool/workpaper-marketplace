'use client';
import { useRouter } from 'next/navigation';

const VendorListings = () => {
  const router = useRouter();

  return (
    <div className='p-4 flex flex-col gap-8 overflow-x-hidden'>
      <div className='flex items-center justify-between gap-2'>
        <h1 className='text-2xl font-semibold'>Your Listings</h1>
        <button
          className='btn bg-secondary-500 text-white hover:bg-secondary-700 rounded-md'
          onClick={() => {
            router.push('/vendor/create');
          }}
        >
          Create Listing
        </button>
      </div>
      <div className='flex items-center gap-4'>
        <p>Filters:</p>

        <label className='select'>
          <span className='label'>Listing Type:</span>
          <select>
            <option>Procedure</option>
            <option>Calculation</option>
            <option>Worksheet</option>
            <option>Report</option>
          </select>
        </label>
      </div>

      <div>
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Listing Name</th>
              <th>Type</th>
              <th>Updated</th>
              {/* <th>Last Updated By</th> */}
              <th>Visibility Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className='hover:bg-base-300'>
              <th>1</th>
              <td className='link link-hover'>GST Reconciliation Checklist</td>
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
    </div>
  );
};
export default VendorListings;

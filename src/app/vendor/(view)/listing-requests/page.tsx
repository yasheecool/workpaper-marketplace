const page = () => {
  return (
    <div className='p-4 flex flex-col gap-8'>
      <div className='flex items-center justify-between gap-2 '>
        <h1 className='text-2xl font-semibold'>Listing Requests</h1>
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

      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Listing Name</th>
              <th>Requested By</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className='hover:bg-base-300'>
              <th>1</th>
              <td className='link link-hover'>GST Reconciliation Checklist</td>
              <td>Cimplico Pty Ltd</td>
              <td>12 Apr 2025</td>
              <td>Pending</td>
              <td>Ellipsis Menu Here</td>
            </tr>
            <tr className='hover:bg-base-300'>
              <th>2</th>
              <td className='link link-hover'>FBT Summary Report</td>
              <td>AuditLogic Ltd</td>
              <td>10 Apr 2025</td>
              <td>Approved</td>
              <td>Ellipsis Menu Here</td>
            </tr>
            <tr className='hover:bg-base-300'>
              <th>3</th>
              <td className='link link-hover'>Income Tax Calculator</td>
              <td>TaxPro Systems</td>
              <td>08 Apr 2025</td>
              <td>Rejected</td>
              <td>Ellipsis Menu Here</td>
            </tr>
            <tr className='hover:bg-base-300'>
              <th>4</th>
              <td className='link link-hover'>
                Superannuation Contribution Summary
              </td>
              <td>Zen Ledger Inc.</td>
              <td>15 Apr 2025</td>
              <td>Pending</td>
              <td>Ellipsis Menu Here</td>
            </tr>
            <tr className='hover:bg-base-300'>
              <th>5</th>
              <td className='link link-hover'>
                Depreciation Schedule Worksheet
              </td>
              <td>Finexus Partners</td>
              <td>11 Apr 2025</td>
              <td>Approved</td>
              <td>Ellipsis Menu Here</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default page;

//can include past listings as well

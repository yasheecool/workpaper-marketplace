const InstalledListings = () => {
  return (
    <section className='py-8'>
      <div className='max-w-7xl py-4 w-[95vw] mx-auto flex flex-col gap-6'>
        <h1 className='text-2xl font-semibold'>Your Listings </h1>
        <div className='flex items-center gap-4'>
          <p>Filters:</p>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>For the Firm:</legend>
            <select defaultValue='Pick a browser' className='select'>
              <option disabled={true}>Select a Firm</option>
              <option>Firm 1</option>
              <option>Firm 2</option>
              <option>Firm 3</option>
            </select>
            <span className='label opacity-0'>Optional</span>
          </fieldset>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Status is</legend>
            <select defaultValue='Pick a browser' className='select'>
              <option disabled={true}>Select Status</option>
              <option>Installed</option>
              <option>Requested</option>
            </select>
            <span className='label opacity-0'>Optional</span>
          </fieldset>
        </div>

        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Vendor Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='hover:bg-base-300'>
                <th>1</th>
                <td className='link link-hover'>
                  GST Reconciliation Checklist
                </td>
                <td className='link link-hover'>Cimplico Pty Ltd</td>
                <td>Checklist</td>
                <td>12 Apr 2025</td>
                <td>Ellipsis Menu Here</td>
              </tr>
              <tr className='hover:bg-base-300'>
                <th>2</th>
                <td className='link link-hover'>FBT Summary Report</td>
                <td className='link link-hover'>AuditLogic Ltd</td>
                <td>Report</td>
                <td>10 Apr 2025</td>
                <td>Ellipsis Menu Here</td>
              </tr>
              <tr className='hover:bg-base-300'>
                <th>3</th>
                <td className='link link-hover'>Income Tax Calculator</td>
                <td className='link link-hover'>TaxPro Systems</td>
                <td>Calculation</td>
                <td>08 Apr 2025</td>
                <td>Ellipsis Menu Here</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default InstalledListings;

//Listing Name
//installed/request date
//Content TYpe
//Vendor name
//actions
//
//Filter by firm and status - installed or requested

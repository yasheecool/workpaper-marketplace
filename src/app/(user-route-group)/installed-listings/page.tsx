const InstalledListings = () => {
  return (
    <section className='py-8'>
      <div className='section-container flex flex-col gap-6'>
        <h1 className='text-2xl font-semibold'>
          Installed and Requested Listings{' '}
        </h1>
        <div className='flex items-center gap-4'>
          <p>Filters:</p>
          <label className='select'>
            <span className='label'>Status is:</span>
            <select>
              <option>Installed</option>
              <option>Requested</option>
            </select>
          </label>
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

//Additional sorting functionality by date can be added

// - Vendors
//     1. Vendor can update their firms's profile details.
//     2. Vendor can manage firm-level whitelists
//     3. Vendor can create listings
//     4. Vendor can modify existing listings
//         1. Vendor also needs to add a comment about what’s changed when modifying listing.
//     5. Vendor can also modify whitelisting of each listing.
//     6. Vendor can see and approve whitelist requests

// Global Whitelist -> Can be applied to listing

//Listing States
//Open: Anyone can access
//Limited: Anyone can view, but only whitelisted firms can add content to their firm. They can also request to be whitelisted.
//Closed: Only whitelisted users can see and add the content

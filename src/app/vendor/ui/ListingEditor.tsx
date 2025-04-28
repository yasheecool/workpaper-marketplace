const ListingEditor = () => {
  return (
    <form className='flex flex-col gap-8 overflow-y-auto grow'>
      <div className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
        <label className='text-sm'>
          Name <span className='text-gray-500'>(required)</span>
        </label>
        <input type='text' className='input' required />
      </div>

      <div className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
        <label className='text-sm'>
          Description <span className='text-gray-500'>(required)</span>
        </label>
        <textarea className='textarea'></textarea>
      </div>

      <div className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
        <label className='text-sm'>
          Getting Started Steps{' '}
          <span className='text-gray-500'>(required)</span>
        </label>
        <textarea className='textarea'></textarea>
      </div>

      <fieldset className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
        <label className='select'>
          <span className='label'>Listing Type</span>
          <select defaultValue='Select listing type' className='select'>
            <option disabled={true}>Select listing type</option>
            <option>Procedure</option>
            <option>Checklist</option>
            <option>Report</option>
            <option>Calculation</option>
            <option>Wiki</option>
          </select>
        </label>
      </fieldset>
      <fieldset className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
        <label className='select'>
          <span className='label'>Region</span>
          <select defaultValue='Select region' className='select'>
            <option disabled={true}>Select region</option>
            <option>Australia</option>
            <option>New Zealand</option>
            <option>United Kingdom</option>
            <option>Republic of Ireland</option>
          </select>
        </label>
      </fieldset>
      <fieldset className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
        <label className='select'>
          <span className='label'>Workpaper Type</span>
          <select defaultValue='Select workpaper type' className='select'>
            <option disabled={true}>Select workpaper type</option>
            <option>Compliance</option>
            <option>Fringe Benefits Tax</option>
            <option>Income Tax Return</option>
            <option>Business Activity Statement</option>
            <option>Other</option>
          </select>
        </label>
      </fieldset>

      <fieldset className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
        <label className='select'>
          <span className='label'>Entity Type</span>
          <select defaultValue='Select entity type' className='select'>
            <option disabled={true}>Company</option>
            <option>Individual</option>
            <option>Partnership</option>
            <option>Trust</option>
            <option>Other (all)</option>
          </select>
        </label>
      </fieldset>

      <fieldset className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
        <label className='select'>
          <span className='label'>Access Settings</span>
          <select defaultValue='Select visibility type' className='select'>
            <option disabled={true}>Select access type</option>
            <option>Public</option>
            <option>Request Access</option>
            <option>Pre-configured firms only</option>
            <option>Private (invite only)</option>
          </select>
        </label>
      </fieldset>

      <div className='flex flex-col gap-1 px-4 border-l-3 border-primary-500 py-1 justify-center '>
        Image
        <input type='file' className='file-input' />
      </div>
    </form>
  );
};
export default ListingEditor;

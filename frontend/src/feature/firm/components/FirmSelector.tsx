'use client';
import { Fragment, useState } from 'react';
import { type FirmWithVendorFlag } from '@/types/domain/firm';
import { setFirmInCookies } from '../actions';
import Form from 'next/form';
import { toast } from 'react-toastify';

const FirmSelector = ({ firms }: { firms: FirmWithVendorFlag[] }) => {
  const [selectedFirm, setSelectedFirm] = useState<FirmWithVendorFlag | null>(
    null
  );

  return (
    <>
      <p className='col-span-2 text-2xl text-primary font-semibold'>
        Select a firm to continue
      </p>

      <Form
        action={async (formData) => {
          try {
            await setFirmInCookies(formData);
          } catch (e: unknown) {
            // console.log(e);
            toast.error(
              e instanceof Error
                ? e.message
                : 'An error occurred while setting the firm.'
            );
          }
        }}
      >
        <div className='grid grid-cols-[auto_1fr] gap-4'>
          {firms.map((firm, idx) => {
            return (
              <Fragment key={idx}>
                <input
                  type='radio'
                  name={`firm`}
                  className='radio'
                  value={firm.id}
                  onChange={() => {
                    setSelectedFirm(firm);
                  }}
                  checked={selectedFirm?.id === firm.id}
                />
                <label className='cursor-pointer'>{firm.name}</label>
              </Fragment>
            );
          })}

          {selectedFirm && (
            <div className='flex justify-center items-center col-span-2 mt-4 gap-4'>
              <button
                className='btn btn-primary'
                type='submit'
                name='target'
                value={'/marketplace'}
              >
                Continue to marketplace
              </button>

              {selectedFirm.isVendor && (
                <button
                  type='submit'
                  name='target'
                  className='btn btn-primary'
                  value={'/vendor'}
                >
                  Continue to Vendor View
                </button>
              )}
            </div>
          )}
        </div>
      </Form>
    </>
  );
};
export default FirmSelector;

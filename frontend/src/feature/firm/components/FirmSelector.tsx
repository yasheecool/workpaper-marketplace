'use client';
import { Fragment, use, useEffect, useState } from 'react';
import { type FirmWithVendorFlag } from '@/types/domain/firm';
import { setFirmInCookies } from '../actions';
import Form from 'next/form';
import { toast } from 'react-toastify';
import { useActionState } from 'react';

const FirmSelector = ({ firms }: { firms: FirmWithVendorFlag[] }) => {
  const [selectedFirm, setSelectedFirm] = useState<FirmWithVendorFlag | null>(
    null
  );

  const [state, setFirm, pending] = useActionState(setFirmInCookies, {
    error: '',
  });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <Form action={setFirm}>
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
              disabled={pending}
            >
              Continue to marketplace
            </button>

            {selectedFirm.isVendor && (
              <button
                type='submit'
                name='target'
                className='btn btn-primary'
                value={'/vendor'}
                disabled={pending}
              >
                Continue to Vendor View
              </button>
            )}
          </div>
        )}
      </div>
    </Form>
  );
};
export default FirmSelector;

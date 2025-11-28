import useAppStore from '@/store/appStore';
import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FirmSelector = ({ firms }: { firms: Record<string, any>[] }) => {
  const router = useRouter();
  const setFirm = useAppStore((state) => state.setFirm);
  const [selectedFirm, setSelectedFirm] = useState<Record<string, any> | null>(
    null
  );

  const navigate = (destination: string) => {
    setFirm({
      id: selectedFirm?.firmId,
      shortId: selectedFirm?.firmId.slice(0, 8),
    });
    router.push(destination);
  };

  return (
    <>
      {firms.map((firm, idx) => {
        return (
          <Fragment key={idx}>
            <input
              type='radio'
              name='radio-1'
              className='radio'
              onChange={() => {
                setSelectedFirm(firm);
              }}
            />
            <label className='cursor-pointer'>{firm.firmName}</label>
          </Fragment>
        );
      })}

      {selectedFirm && (
        <div className='flex justify-center items-center col-span-2 mt-4 gap-4'>
          <button
            className='btn  text-white bg-secondary-500 hover:bg-secondary-700'
            onClick={() => {
              navigate('/marketplace');
            }}
          >
            Continue to marketplace
          </button>

          {selectedFirm.isVendor && (
            <button
              className='btn  text-white bg-secondary-500 hover:bg-secondary-700'
              onClick={() => {
                navigate('/vendor');
              }}
            >
              Continue to Vendor View
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default FirmSelector;

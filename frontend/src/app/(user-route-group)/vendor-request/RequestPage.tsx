'use client';
import RequestForm from './RequestForm';
// import useAppStore from '@/store/appStore';

const RequestPage = () => {
  // const currentFirm = useAppStore((s) => s.currentFirm);
  // const { data: firm } = useFirm(currentFirm!.id);

  return (
    <section className='section-container max-w-5xl py-10 text-gray-800'>
      {/* {!firm.vendorRequest && (
        <header className='border-b border-gray-200 pb-4 mb-8 flex flex-col gap-2'>
          <h2 className='text-3xl font-semibold'>Your Contact Information</h2>
          <p className='text-gray-600 text-sm'>
            Please fill out the form below and we will get back to you as soon
            as possible.
          </p>
        </header>
      )}

      <div className='max-w-xl mx-auto'>
        {firm.vendorRequest?.requestStatus === 'pending' ? (
          <>
            <p>
              Your vendor request is currently pending. We will notify you once
              it has been reviewed.
            </p>
          </>
        ) : firm.vendorRequest?.requestStatus === 'approved' ? (
          <p>
            Your vendor request has been approved. An admin will contact you
            shortly.
          </p>
        ) : (
          <p>
            Your vendor request has been rejected. Please contact an admin for
            further info.
          </p>
        )}
        {!firm.vendorRequest && <RequestForm />}
      </div> */}
    </section>
  );
};
export default RequestPage;

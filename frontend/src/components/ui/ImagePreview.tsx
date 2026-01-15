'use client';

import { useState } from 'react';

const ImagePreview = ({
  imgUrls,
  setUrls,
  showCloseButton = true,
}: {
  imgUrls: string[];
  setUrls?: (url: string) => void;
  showCloseButton?: boolean;
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const navigate = (idx: number) => {
    setCurrentIdx(idx);
  };

  return (
    <>
      <div className='relative overflow-hidden border-[0.5px] border-gray-600 w-full rounded h-[90%]'>
        {showCloseButton && setUrls && (
          <button
            type='button'
            className='absolute top-1 right-1 z-10 hover:cursor-pointer hover:scale-110 ease-in-out'
            onClick={() => {
              if (currentIdx !== 0) setCurrentIdx((prev) => prev - 1);
              setUrls(imgUrls[currentIdx]);
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='size-5'
            >
              <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
            </svg>
          </button>
        )}

        <div
          className='flex transition-transform duration-300 h-full'
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {imgUrls.map((imgUrl: string, idx: number) => (
            <div key={idx} className='w-full flex-shrink-0 h-full'>
              <img src={imgUrl} className='h-full w-full object-contain' />
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center gap-2 py-2 h-[10%]'>
        {imgUrls.map((_, idx) => (
          <button
            key={idx}
            type='button'
            className={`btn btn-xs ${idx === currentIdx ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => navigate(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ImagePreview;

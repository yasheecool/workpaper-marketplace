'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/marketplace?${params.toString()}`);
  };

  if (!totalPages) return null;
  else
    return (
      <div className='join ml-auto'>
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
              onClick={() => {
                handlePageChange(i + 1);
              }}
            >
              {i + 1}
            </button>
          ))}
      </div>
    );
};
export default Pagination;

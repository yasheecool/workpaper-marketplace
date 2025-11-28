interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
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
                setCurrentPage(i + 1);
              }}
            >
              {i + 1}
            </button>
          ))}
      </div>
    );
};
export default Pagination;

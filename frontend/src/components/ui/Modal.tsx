const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative'
        onClick={(e) => e.stopPropagation()} // prevent close on modal click
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-400 hover:text-gray-700'
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

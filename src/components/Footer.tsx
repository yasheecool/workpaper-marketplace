const Footer = () => {
  return (
    <footer className='bg-base-200 text-gray-700 py-6 mt-auto'>
      <div className='section-container flex flex-col sm:flex-row justify-between items-center gap-4 text-sm'>
        <p>
          &copy; {new Date().getFullYear()} Cimplico Marketplace. All rights
          reserved.
        </p>
        <div className='flex gap-4'>
          <a className='link link-hover' href='/privacy'>
            Privacy Policy
          </a>
          <a className='link link-hover' href='/terms'>
            Terms of Service
          </a>
          <a className='link link-hover' href='/contact'>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const Footer = () => {
  return (
    <footer className='bg-base-200 text-gray-700 py-6 mt-auto'>
      <div className='section-container flex flex-col sm:flex-row justify-between items-center gap-4 text-sm'>
        <p>
          &copy; {new Date().getFullYear()} Workpaper Marketplace. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

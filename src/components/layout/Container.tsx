import clsx from 'clsx';

const Container = ({
  styles = '',
  children,
}: {
  styles?: string;
  children: React.ReactNode;
}) => {
  // Remove default max-w if a custom one is present
  const hasCustomMaxWidth = /\bmax-w-\w+\b/.test(styles);

  return (
    <div
      className={clsx(
        !hasCustomMaxWidth && 'max-w-7xl',
        'mx-auto px-4 w-[95vw]',
        styles
      )}
    >
      {children}
    </div>
  );
};
export default Container;

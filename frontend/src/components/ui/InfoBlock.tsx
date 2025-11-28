const InfoBlock = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className='text-sm text-gray-500'>{label}</p>
    <p className='text-base text-gray-800'>{value}</p>
  </div>
);

export default InfoBlock;

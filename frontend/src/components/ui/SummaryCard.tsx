const SummaryCard = ({
  Icon,
  label,
  value,
  style = '',
}: {
  Icon: React.FC;
  label: string;
  value: number;
  style?: string;
}) => {
  return (
    <div
      className={`bg-base-200 p-4 rounded-md flex justify-around items-center gap-4 overflow-hidden ${style}`}
    >
      {/* ICON */}
      <div>
        <Icon />
      </div>
      {/* Detail */}
      <div className='flex flex-col gap-2 items-center'>
        <p className='text-4xl font-semibold'>{value}</p>
        <p className='text-sm text-gray-500'>{label}</p>
      </div>
    </div>
  );
};
export default SummaryCard;

'use client';

const TableHeaderRow = ({ headings }: { headings: string[] }) => {
  return (
    <tr>
      {headings.map((h) => (
        <th className='text-sm font-normal' key={h}>
          {h}
        </th>
      ))}
    </tr>
  );
};

export default TableHeaderRow;

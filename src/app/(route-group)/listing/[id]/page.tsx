'use client';
import { useParams } from 'next/navigation';

const Listings = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Listings Listings</div>;
};
export default Listings;

import Container from '@/components/layout/Container';
import { getListingById } from '@/feature/listing';
import ListingDetailsClient from './ListingDetailsClient';
import { notFound } from 'next/navigation';

const ListingDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const listing = await getListingById(String(id), true);

  if (!listing) {
    notFound();
  }

  return (
    <section className='py-8 text-base-content'>
      <Container
        styles={`grid gap-6 grid-rows-[auto_auto_1fr_auto] grid-cols-1 lg:grid-cols-[7fr_minmax(70,3fr)] items-start`}
      >
        <ListingDetailsClient listing={listing} id={String(id)} />
      </Container>
    </section>
  );
};

export default ListingDetailsPage;

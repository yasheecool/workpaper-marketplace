import ContentDisplay from './ContentDisplay';
import { getAvailableContent } from '@/feature/listing';
import { Container } from '@/components/layout';
import { FormSelect } from '@/components/input';
import { listingTypeOptions } from '@/feature/listing';

const page = async () => {
  const content = await getAvailableContent();

  return (
    <Container styles='max-w-4xl py-8 px-2 mx-auto text-gray-800 flex flex-col gap-8 h-full'>
      <header className='flex flex-col gap-1'>
        <h1 className='text-3xl font-semibold tracking-tight'>
          Select a Content Template
        </h1>
        <p>Choose a piece of content to base your listing on</p>
      </header>

      <ContentDisplay content={content} />
    </Container>
  );
};
export default page;

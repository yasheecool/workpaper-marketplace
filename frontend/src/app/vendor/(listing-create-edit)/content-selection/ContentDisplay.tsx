'use client';
import FormSelect from '@/components/input/FormSelect';
import ContentCard from './ContentCard';
import { ListingContent, listingTypeOptions } from '@/feature/listing';
import useListingContent from '@/feature/listing/hooks/useListingContent';

const ContentDisplay = ({ content = [] }: { content: ListingContent[] }) => {
  const { data, isLoading, error } = useListingContent(content);

  return (
    <div className='flex flex-col gap-12 h-full overflow-hidden'>
      {content.length === 0 && (
        <div className='flex items-center justify-center h-full'>
          <p className='text-gray-500'>No available content</p>
        </div>
      )}

      {/* UI FOR SELECTION */}
      {content.length > 0 && (
        <div className='flex flex-col gap-6 overflow-auto'>
          {content.map((c: ListingContent, id: number) => {
            return <ContentCard key={id} content={c} />;
          })}
        </div>
      )}
    </div>
  );
};
export default ContentDisplay;

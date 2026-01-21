'use client';

import ContentCard from './ContentCard';
import { type ListingContent, useListingContent } from '@/feature/listing';
import { Loading } from '@/components/ui';

const ContentDisplay = ({ content = [] }: { content: ListingContent[] }) => {
  const { data, isLoading, error } = useListingContent(content);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-red-500'>Error loading content</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-12 h-full overflow-hidden'>
      {data.length === 0 && (
        <div className='flex items-center justify-center h-full'>
          <p className='text-gray-500'>No available content</p>
        </div>
      )}

      {/* UI FOR SELECTION */}
      {data.length > 0 && (
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

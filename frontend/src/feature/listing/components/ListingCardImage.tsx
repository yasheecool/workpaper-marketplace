import Image from 'next/image';

interface ListingCardImageProps {
  imagesPath: string[];
  name: string;
}

const ListingCardImage = ({ imagesPath, name }: ListingCardImageProps) => {
  return (
    <div className='relative rounded-md flex justify-center items-center border-[0.5px] border-gray-300'>
      {imagesPath.length > 0 ? (
        <Image
          src={imagesPath[0]}
          alt={`${name} image`}
          fill
          className='object-contain border-[0.5px] border-gray-300'
        />
      ) : (
        <div className='text-sm flex items-center justify-center'>
          No Image Available
        </div>
      )}
    </div>
  );
};

export default ListingCardImage;

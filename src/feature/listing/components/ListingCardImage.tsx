import Image from 'next/image';

interface ListingCardImageProps {
  imagesPath: string[];
  name: string;
}

const ListingCardImage = ({
  imagesPath = ['/undraw_files.svg'],
  name,
}: ListingCardImageProps) => {
  return (
    <div className='relative rounded-md flex justify-center items-center border-[0.5px] border-gray-300'>
      <Image
        src={imagesPath[0]}
        alt={`${name} image`}
        fill
        className='object-contain border-[0.5px] border-gray-300 bg-gray-50'
      />
    </div>
  );
};

export default ListingCardImage;

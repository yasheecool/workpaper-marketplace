// import { useMemo } from 'react';
// import { useMarketplaceListings } from './react-query/listing';
// import useAppStore from '@/store/appStore';
// import { ListingType } from '@/types/schema';

// const checkIfElementExists = (stateArr: string[], listingArr: string[]) => {
//   if (!stateArr.length) return true; // If no stateArr, include all listings
//   return stateArr.some((element) => listingArr.includes(element));
// };

// // TODO: server side filtering
// //this hook is strongly tied to global state and is only used for filtering listings. This approach should be replaced with query params and server-side filtering in the future
// export const useFilteredListings = () => {
//   const { data: listings, error, isLoading } = useMarketplaceListings();
//   const { workpaperType, entityType, contentType, searchTerm, page, pageSize } =
//     useAppStore((s) => s);

//   const filteredListings = useMemo(() => {
//     if (!listings) return [];

//     return listings
//       .filter((listing: ListingType) => {
//         const term = searchTerm.toLowerCase().trim();
//         if (!term) return true; // If no search term, include all listings
//         const name = listing.name.toLowerCase();
//         return name.includes(term);
//       })
//       .filter((listing: ListingType) => {
//         if (!contentType.length) return true; //FILTER BY CONTENT TYPE FIRST
//         return contentType.some((type: string) => type === listing.contentType);
//       })
//       .filter((listing: ListingType) => {
//         return (
//           checkIfElementExists(workpaperType, listing.workpaperType) &&
//           checkIfElementExists(entityType, listing.entityType)
//         );
//       });
//   }, [listings, workpaperType, entityType, contentType, searchTerm]);

//   return {
//     listings: {
//       count: filteredListings?.length,
//       data: filteredListings.slice(pageSize * (page - 1), pageSize * page),
//     },
//     isLoading,
//     error,
//     page,
//     start: (page - 1) * pageSize + 1,
//     end: Math.min(page * pageSize, filteredListings?.length),
//     totalPages: Math.ceil(filteredListings?.length / pageSize),
//   };
// };

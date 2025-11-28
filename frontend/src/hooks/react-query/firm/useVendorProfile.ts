import { useQuery } from '@tanstack/react-query';
import { getVendorProfile } from '@/lib/api/firm';

//Get the vendor profile for the specific firm - used by the vendor to view and edit their profile and also the users to view vendor details of a listing
const useVendorProfile = (firmId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['firm', firmId, 'vendorProfile'],
    queryFn: () => getVendorProfile(firmId),
    select: (data) => data.data,
  });

  return { vendorProfile: data, error, isLoading };
};

export default useVendorProfile;

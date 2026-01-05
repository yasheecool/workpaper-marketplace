import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { saveListing, installListing, requestListing } from '../actions';
import { getQueryClient } from '@/lib/queryClient';

export const useSaveListingMutation = (id: string) => {
  return useMutation({
    mutationFn: (type: 'save' | 'unsave') => saveListing(id, type),
    onSuccess: (_, variables) => {
      toast.success(`Listing ${variables}d successfully!`);
      getQueryClient().invalidateQueries({
        queryKey: ['marketplace-listings'],
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred while saving the listing.';
      toast.error(errorMessage);
    },
  });
};

export const useInstallListingMutation = (id: string) => {
  return useMutation({
    mutationFn: () => installListing(id),
    onSuccess: () => {
      toast.success(`Listing installed successfully!`);
      getQueryClient().invalidateQueries({
        queryKey: ['marketplace-listings'],
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred while installing the listing.';
      toast.error(errorMessage);
    },
  });
};

export const useRequestListingMutation = (id: string) => {
  return useMutation({
    mutationFn: () => requestListing(id),
    onSuccess: () => {
      toast.success(`Listing request sent successfully!`);
      getQueryClient().invalidateQueries({
        queryKey: ['marketplace-listings'],
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred while requesting the listing.';
      toast.error(errorMessage);
    },
  });
};

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  saveListing,
  installListing,
  requestListing,
  updateListing,
  createListing,
} from '../actions';
import { updateListingRequest } from '@/feature/vendor';
import { getQueryClient } from '@/lib/queryClient';
import { ListingWithStatuses } from '../types';

const invalidateListingQueries = (listingId: string) => {
  const client = getQueryClient();
  client.invalidateQueries({ queryKey: ['listing', listingId] });
  client.invalidateQueries({ queryKey: ['marketplace-listings'] });
};

export const useSaveListingMutation = (id: string) => {
  return useMutation({
    mutationKey: ['save-listing', id],
    mutationFn: (type: 'save' | 'unsave') => saveListing(id, type),
    onSuccess: (_, variables) => {
      toast.success(`Listing ${variables}d successfully!`);
      invalidateListingQueries(id);
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
      invalidateListingQueries(id);
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
      invalidateListingQueries(id);
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

export const useUpdateListingMutation = () => {
  return useMutation({
    mutationFn: ({
      listingId,
      data,
    }: {
      listingId: string;
      data: Partial<ListingWithStatuses>;
    }) => {
      return updateListing(listingId, data);
    },
    onSuccess: () => {
      getQueryClient().invalidateQueries({ queryKey: ['vendor-listings'] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred while updating the listing.';
      toast.error(errorMessage);
    },
  });
};

export const useCreateListingMutation = () => {
  return useMutation({
    mutationKey: ['create-listing'],
    mutationFn: (newData: Partial<ListingWithStatuses>) =>
      createListing(newData),
    onSuccess: () => {
      toast.success(`Listing created successfully!`);
      const client = getQueryClient();
      client.invalidateQueries({ queryKey: ['marketplace-listings'] });
      client.invalidateQueries({ queryKey: ['vendor-listings'] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred while creating the listing.';
      toast.error(errorMessage);
    },
  });
};

export const useUpdateListingRequest = () => {
  return useMutation({
    mutationFn: ({
      requestId,
      action,
    }: {
      requestId: string;
      action: 'approved' | 'rejected';
    }) => updateListingRequest(requestId, action),
    onSuccess: (_, { action }) => {
      getQueryClient().invalidateQueries({
        queryKey: ['listing-requests', 'pending'],
      });
    },
    onError: (error) => {
      toast.error(`Error updating request: ${error.message}`);
    },
  });
};

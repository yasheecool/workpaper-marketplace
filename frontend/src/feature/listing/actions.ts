'use server';
import { getUserClaims } from '../user';

export const installListing = async (listingId: string) => {
  const userClaims = await getUserClaims();
  console.log('User Claims:', userClaims);
  //logic to install listing
};

export const saveListing = async (listingId: string) => {
  //logic to save listing
};

export const unsaveListing = async (listingId: string) => {
  //logic to unsave listing
};

export const requestListing = async (listingId: string) => {
  //logic to request listing access
};

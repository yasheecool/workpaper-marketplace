import { asyncHandler } from '../types';
import {
  getSavedListings as getSavedListingsFromDb,
  saveOrUnsaveListing,
} from '../services/listingService';

export const getSavedListings: asyncHandler = async (req, res, next) => {
  const userId = req.user;
  try {
    const savedListings = await getSavedListingsFromDb(userId);

    res.status(200).json({ success: true, savedListings });
  } catch (error) {
    next(error);
  }
};

export const saveUnsaveListing: asyncHandler = async (req, res, next) => {
  const userId = req.user;
  const { listingId } = req.params;
  const METHOD: 'POST' | 'DELETE' = req.method as 'POST' | 'DELETE';
  console.log(
    `Method: ${METHOD}, Listing ID: ${listingId}, User ID: ${userId}`
  );
  try {
    await saveOrUnsaveListing(listingId, userId, METHOD);
    res.status(200).json({
      success: true,
      message: `Listing ${
        METHOD === 'POST' ? 'saved' : 'unsaved'
      } successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

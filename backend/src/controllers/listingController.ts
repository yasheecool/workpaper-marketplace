import { asyncHandler } from '../types';
import {
  getListingOrThrow,
  getMarketplaceListings as getMarketplaceListingsFromDb,
  updateListingById,
  getListingRequests as getListingRequestsFromDb,
  createListing,
} from '../services/listingService';

// GET /api/listing/:listingId
export const getListing: asyncHandler = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const listing = await getListingOrThrow(listingId);

    res.status(200).json({ success: true, data: listing });
  } catch (err) {
    next(err);
  }
};

// GET /api/listings/marketplace-listings - return all the listings that are public or request access
export const getMarketplaceListings: asyncHandler = async (req, res, next) => {
  try {
    const listings = await getMarketplaceListingsFromDb();
    res.status(200).json({ success: true, data: listings });
  } catch (err) {
    next(err);
  }
};

// PUT /api/listings/:listingId - update a listing -- this is also used for soft deletion
export const updateListing: asyncHandler = async (req, res, next) => {
  const { listingId } = req.params;
  const { updatedFields } = req.body;
  const userId = req.user;

  try {
    const updatedListing = await updateListingById(
      listingId,
      updatedFields,
      userId
    );

    res.status(200).json({
      success: true,
      data: updatedListing,
    });
  } catch (e) {
    next(e);
  }
};

// POST /api/listings - create a listing
export const handleCreateListing: asyncHandler = async (req, res, next) => {
  const { user: userId, firm: firmId } = req;
  const { listing } = req.body;
  console.log(req.body);

  const createdListing = await createListing(listing, userId, firmId);

  res
    .status(200)
    .json({
      success: true,
      msg: 'Listing Created Successfully',
      listing: createdListing,
    });
};

export const getListingRequests: asyncHandler = async (req, res, next) => {
  const { listingId } = req.params;
  const { status } = req.query;
  const firmId = req.firm;

  try {
    const requestsFromDb = await getListingRequestsFromDb(
      listingId,
      status as 'pending' | 'completed',
      firmId
    );

    res.status(200).json({ success: true, requests: requestsFromDb });
  } catch (e) {
    next(e);
  }
};

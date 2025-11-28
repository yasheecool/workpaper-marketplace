import { asyncHandler } from '../types';
import {
  getRequestedListingsFromDb,
  requestListingAccess as requestListingAccessFromDb,
  getFirmListingRequests as getFirmListingRequestsFromDb,
  updateListingRequest as updateListingRequestFromDb,
} from '../services/listingService';

// FOR THE USER FIRM
// GET /api/requested-listings - get all the listing requests made by the user firm
export const getRequestedListings: asyncHandler = async (req, res, next) => {
  const firmId = req.firm;

  try {
    const requestedListings = await getRequestedListingsFromDb(firmId);
    res.status(200).json({ success: true, data: requestedListings });
    return;
  } catch (error) {
    next(error);
  }
};

// POST /api/listing-requests/:listingId - request access to a listing
export const requestListingAccess: asyncHandler = async (req, res, next) => {
  const { firm: firmId, user: userId } = req;
  const { listingId } = req.params;

  try {
    const request = await requestListingAccessFromDb(listingId, firmId, userId);
    res.status(201).json({ success: true, data: request });
  } catch (e) {
    next(e);
  }
};

// FOR THE VENDOR FIRM
// GET /api/listing-requests - get all the listing requests for the vendor firm
export const getFirmListingRequests: asyncHandler = async (req, res, next) => {
  const firmId = req.firm;
  const { status } = req.query;

  try {
    const requests = await getFirmListingRequestsFromDb(
      firmId,
      status as 'pending' | 'completed'
    );
    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/listing-requests/:requestId - update a specific listing request (approve or reject)
export const updateListingRequest: asyncHandler = async (req, res, next) => {
  const { user: userId, firm: firmId } = req;
  const { requestId } = req.params;
  const { action } = req.body;

  try {
    const updatedRequest = await updateListingRequestFromDb(
      requestId,
      action,
      userId,
      firmId
    );

    res.status(200).json({ success: true, data: updatedRequest });
  } catch (err) {
    next(err);
  }
};

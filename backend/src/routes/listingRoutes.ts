import { Router } from 'express';
import {
  handleCreateListing,
  getListing,
  getMarketplaceListings,
  updateListing,
  getListingRequests,
} from '../controllers/listingController';

const router = Router();

//GET /api/listings/marketplace-listings - for displaying all marketplace listings
router.get('/marketplace-listings', getMarketplaceListings);

//GET /api/listings/:listingId
router.get('/:listingId', getListing);

//PATCH /api/listings/:listingId - for updating a listing - this route handles soft deletion as well
router.patch('/:listingId', updateListing);

//POST /api/listings
router.post('/', handleCreateListing);

// not used as the listing is never deleted, only soft deleted
// router.patch('/:listingId/delete', updateListing); //used for SOFT DELETING a listing

// GET /api/listings/:listingId/requests - get all requests for a listing
router.get('/:listingId/requests', getListingRequests);

export default router;

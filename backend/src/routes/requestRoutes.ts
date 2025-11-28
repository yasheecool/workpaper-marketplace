import { Router } from 'express';
import {
  getFirmListingRequests,
  updateListingRequest,
  getRequestedListings,
  requestListingAccess,
} from '../controllers/requestController';

const router = Router();

//This route file is for both the vendor firm and the user firm

//FOR THE VENDOR FIRM i.e INCOMING REQUESTS FOR THE LISTINGS THEY OWN
// GET /api/listing-requests
router.get('/listing-requests', getFirmListingRequests); //get requests for the listings they own

router.patch('/listing-requests/:requestId', updateListingRequest); //update a specific listing request //approve or reject

//FOR THE USER FIRM i.e OUTGOING REQUESTS FOR THE LISTINGS THEY HAVE REQUESTED ACCESS TO
// get the listings that the current firm has requested access to
router.get('/requested-listings', getRequestedListings);

//request access to a specific listing by its ID
router.post('/requested-listings/:listingId', requestListingAccess);

export default router;

import { Router } from 'express';
import {
  getFirm,
  getCreatedListings,
  getVendorProfile,
  getContentForCreation,
  updateVendorProfile,
} from '../controllers/firmController';

const router = Router();

// GET /api/firm
router.get('/', getFirm);

// GET /api/firm/:firmId/vendorProfile - firm id is passed because the same route is also used to get the vendor profile of a listing - when using the marketplace from the user side
router.get('/:firmId/vendor-profile', getVendorProfile);

// TODO: Implement through SDK
// GET /api/firm/content - getContent is used to get the content for the listing creation page
router.get('/content', getContentForCreation);

// PATCH /api/firm/vendor-profile
router.patch('/vendor-profile', updateVendorProfile);

// GET /api/firm/created-listings
router.get('/created-listings', getCreatedListings);

export default router;

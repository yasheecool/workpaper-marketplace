import { Router } from 'express';
import {
  getSavedListings,
  saveUnsaveListing,
} from '../controllers/savedListingController';

const router = Router();

router.get('/', getSavedListings);

router.route('/:listingId').post(saveUnsaveListing).delete(saveUnsaveListing);

export default router;

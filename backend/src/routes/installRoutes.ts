import { Router } from 'express';
import {
  handleInstallListing,
  uninstallListing,
  getInstalledListings,
} from '../controllers/installationController';

const router = Router();

router.get('/', getInstalledListings);

router.route('/:listingId').post(handleInstallListing).delete(uninstallListing);

export default router;

import { Router } from 'express';
import { createVendorRequest } from '../controllers/baseController';

const router = Router();

//route for non-vendor firms to request to be a vendor/create a vendor request
//POSt /api/vendor-request
router.post('/vendor-request', createVendorRequest);

export default router;

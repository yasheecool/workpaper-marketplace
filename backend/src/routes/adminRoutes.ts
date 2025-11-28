import { Router } from 'express';
import {
  actionVendorRequest,
  getVendorRequests,
} from '../controllers/adminController';

const router = Router();

//GET /api/admin/vendor-requests
router.get('/vendor-requests', getVendorRequests);

//PATCH /api/admin/vendor-request/:requestId
router.patch('/vendor-requests/:requestId', actionVendorRequest);

export default router;

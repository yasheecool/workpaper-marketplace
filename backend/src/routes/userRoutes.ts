import { Router } from 'express';
import {
  getUser,
  updateUserProfile,
  getUserFirms,
} from '../controllers/userController';

const router = Router();

// GET /api/user/
router.get('/', getUser);

// update user profile
// PATCH /api/user/profile
router.patch('/profile', updateUserProfile);

// TODO: This route can be moved to baseRoutes.ts for better api semantics/organization
//GET /api/user/firms
//Gets the firms associated with the user - which are shown on the FIRM SELECTION screen
router.get('/firms', getUserFirms);

export default router;

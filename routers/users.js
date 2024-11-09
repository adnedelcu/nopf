import { Router } from 'express';
import { index, show } from '../controllers/users.js';
import asyncHandler from '../middleware/async-handler.js';

const router = Router({ mergeParams: true });

router.get('/', asyncHandler(index));
router.get('/:id', asyncHandler(show));

export default router;

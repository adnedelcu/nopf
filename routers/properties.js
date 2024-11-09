import { Router } from 'express';
import { index, show, store, update, destroy } from '../controllers/properties.js';
import asyncHandler from '../middleware/async-handler.js';

const router = Router({ mergeParams: true });

router.route('/')
  .get(asyncHandler(index))
  .post(asyncHandler(store))
;
router.route('/:id')
  .get(asyncHandler(show))
  .put(asyncHandler(update))
  .delete(asyncHandler(destroy))

export default router;

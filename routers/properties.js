import { Router } from 'express';
import { index, show, store, update, destroy } from '../controllers/properties.js';
import asyncHandler from '../middleware/async-handler.js';
import tokenValidator from '../middleware/token-validator.js';

const router = Router({ mergeParams: true });

router.get('/', asyncHandler(index));
router.post('/', tokenValidator, asyncHandler(store));
;
router.get('/:id', asyncHandler(show));
router.put('/:id', tokenValidator, asyncHandler(update))
router.delete('/:id', tokenValidator, asyncHandler(destroy))

export default router;

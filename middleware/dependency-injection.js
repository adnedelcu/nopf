import User from '../models/user.js';
import Property from '../models/property.js';
import ApiError from '../utils/ApiError.js';

export default async function (req, res, next) {
  for (let param in req.params) {
    switch (param) {
      case 'user':
        req.user = await User.findById(req.params[param]);
        if (!req.user) {
          next(new ApiError('Not found', 404));
        }

        break;

      case 'property':
        req.property = await Property.findById(req.params[param]);
        if (!req.property) {
          next(new ApiError('Not found', 404));
        }

        break;
    }
  }

  next();
};

import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

export default (req, res, next) => {
  const { headers: { authorization }} = req;
  const token = authorization?.split(' ')[1];
  if(!token) throw new ApiError('Please login to access this resource', 401);
  const secret = process.env.JWT_SECRET;
  const payload = jwt.verify(token, secret);
  req.user = payload;
  next();
};

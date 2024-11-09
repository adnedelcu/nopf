import User from '../models/user.js';
import ApiError from '../utils/ApiError.js';

export const index = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users.map(user => user.serialize()) });
  } catch (error) {
    throw new ApiError(error.message, 500);
  }
};

export const show = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  return res.status(200).json({ data: user.serialize() });
};

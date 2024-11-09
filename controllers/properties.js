import Property from '../models/property.js';
import ApiError from '../utils/ApiError.js';

export const index = async (req, res) => {
  try {
    const properties = await Property.find().populate('user');
    res.status(200).json({ data: properties.map(property => property.serialize()) });
  } catch (error) {
    throw new ApiError(error.message, 500);
  }
};

export const store = async (req, res) => {
  const property = new Property(req.body);
  property.location = { type: 'Point', coordinates: req.body.coordinates };
  property.user = req.user;
  await property.save();
  await property.populate('user');

  return res.status(201).json({ data: property.serialize() });
};

export const show = async (req, res) => {
  const property = await Property.findById(req.params.id).populate('user');
  if (!property) {
    throw new ApiError('Property not found', 404);
  }
  return res.status(200).json({ data: property.serialize() });
};

export const update = async (req, res) => {
  const property = await Property.findById(req.params.id).populate('user')
  if (!property) {
    throw new ApiError('Property not found', 404);
  }

  if (req.body.title) {
    property.title = req.body.title;
  }
  if (req.body.type) {
    property.type = req.body.type;
  }
  if (req.body.coordinates) {
    property.location.coordinates = req.body.coordinates;
  }
  if (req.body.price) {
    property.price = req.body.price;
  }
  if (req.body.description) {
    property.description = req.body.description;
  }
  if (req.body.images) {
    property.images = req.body.images;
  }

  await property.save();

  return res.status(200).json({ data: property.serialize() })
};

export const destroy = async (req, res) => {
  const query = await Property.deleteOne({ _id: req.params.id });
  if (!query || query.deletedCount == 0) {
    throw new ApiError('Property not found', 404);
  }

  return res.status(204).send();
};

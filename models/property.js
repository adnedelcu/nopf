import { model, Schema } from 'mongoose';
import enumValues from 'mongoose-enumvalues';
import PointSchema from './point.js';

const PropertySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  type: {
    type: String,
    enum: ['house', 'apartment', 'condo', 'office'],
    required: [true, 'Type is required'],
  },
  location: {
    type: PointSchema,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  images: {
    type: [String],
    default: [],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  }
});

PropertySchema.methods.serialize = function () {
  return {
    _id: this._id,
    type: this.type,
    location: this.location,
    price: this.price,
    description: this.description,
    images: this.images,
    user: this.user.serialize(),
  };
};

PropertySchema.plugin(enumValues, {});

export default model('Property', PropertySchema);
export { PropertySchema };

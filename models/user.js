import { model, Schema } from 'mongoose';
import { PropertySchema } from './property.js';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  profilePicture: {
    type: String,
  },
  favorites: {
    type: [PropertySchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.serialize = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    profilePicture: this.profilePicture,
    favorites: this.favorites,
  };
};

export default model('User', UserSchema);
export { UserSchema };

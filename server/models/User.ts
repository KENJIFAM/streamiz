import mongoose, { Document } from 'mongoose';
import { StreamModel } from './Stream';

export interface UserModel extends Document {
  userId: string;
  name: string;
  avatar: string;
  streams: mongoose.Types.Array<StreamModel>;
}

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: String,
    avatar: String,
    streams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stream'
      }
    ]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<UserModel>('User', userSchema);

export default User;
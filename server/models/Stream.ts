import mongoose, { Document } from 'mongoose';
import User, { UserModel } from './User';

export interface StreamModel extends Document {
  title: string;
  description: string;
  user: UserModel;
  views: number;
}

const streamSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

streamSchema.pre<StreamModel>('remove', async function(next: mongoose.HookNextFunction) {
  try {
    let user = await User.findOne(this.user);
    user.streams.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Stream = mongoose.model<StreamModel>('Stream', streamSchema);

export default Stream;
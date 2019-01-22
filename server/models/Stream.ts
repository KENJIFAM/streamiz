import mongoose, { Document } from 'mongoose';

export interface StreamModel extends Document {
  title: string;
  description: string;
  userId: string;
  views: number;
}

const streamSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    userId: String,
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Stream = mongoose.model('Stream', streamSchema);

export default Stream;
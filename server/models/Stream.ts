import mongoose, { Document } from 'mongoose';

export interface StreamModel extends Document {
  title: string;
  description: string;
  userId: string;
}

const streamSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    userId: String
  },
  {
    timestamps: true
  }
);

const Stream = mongoose.model('Stream', streamSchema);

export default Stream;
import { Stream } from './Stream';

export interface User {
  _id: string;
  userId: string;
  name: number;
  avatar: string;
  streams: Stream[];
  createdAt: Date;
  updatedAt: Date;
}
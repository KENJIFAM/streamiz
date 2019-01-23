import { Stream } from './Stream';

export interface User {
  _id?: string;
  userId: string;
  name?: string;
  avatar?: string;
  streams?: Stream[];
  createdAt?: Date;
  updatedAt?: Date;
}
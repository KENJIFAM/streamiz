import { User } from './User';

export interface Stream {
  _id: string;
  title: string;
  description: string;
  user: User;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
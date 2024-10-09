import { Types } from 'mongoose';

export interface IComment {
  user: Types.ObjectId;
  content: string;
  
}

export interface IPost {
  title: string;
  content: string;
  author: Types.ObjectId;
  category: 'tip' | 'story';
  image?: string;
  isPremium: boolean;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  comments: IComment[];
  
}

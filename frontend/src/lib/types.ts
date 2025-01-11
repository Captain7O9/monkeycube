export type event = '3x3';

export interface time {
  _id: string;
  date: number;
  time: number;
  user_id: string;
  event: event;
}

export interface user {
  _id: string;
  username: string;
  full_name: string;
  email: string;
  disabled: boolean;
}

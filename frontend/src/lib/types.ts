export type event = '3x3';

export interface Time {
  _id?: string;
  date?: number;
  time: number;
  user_id?: string;
  event: event;
  dnf?: boolean;
  plus_two?: boolean;
}

export interface User {
  _id: string;
  username: string;
  full_name: string;
  email: string;
  disabled: boolean;
}

import { createContext } from 'react';

export type User = {
  uid: string;
}

export type UserContext = {
  state: 'loading' | 'error' | 'authed'
  user: User | null,
};

export const defaultContext: UserContext = {
  state: 'loading',
  user: null
};

export const UserContext = createContext<UserContext>(defaultContext);
import { useEffect, createContext, PropsWithChildren, useState } from 'react';

export type User = {
  uid: string;
}

export type UserContext = {
  state: 'loading' | 'error' | 'authed'
  user: User | null,
};

type Props = {
  children: React.ReactNode,
  getUser: () => Promise<User>
}

export const defaultContext: UserContext = {
  state: 'loading',
  user: null
};

export const UserContext = createContext<UserContext>(defaultContext);
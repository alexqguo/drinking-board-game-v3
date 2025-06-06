import { createContext, ReactNode } from 'react';
import { FullPageLoader } from '../components/loaders/FullPageLoader';

export type User = {
  uid: string;
};

export type UserContext = {
  state: 'loading' | 'error' | 'authed';
  user: User | null;
};

export const defaultContext: UserContext = {
  state: 'loading',
  user: null,
};

export const UserContext = createContext<UserContext>(defaultContext);

interface Props {
  value: UserContext;
  children: ReactNode;
}

export const UserProvider = ({ value, children }: Props) => {
  return (
    <UserContext.Provider value={value}>
      {value.state === 'loading' ? <FullPageLoader /> : children}
    </UserContext.Provider>
  );
};

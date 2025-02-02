import { defaultContext, User, UserContext } from '@repo/ui/context/UserContext';
import { useEffect, useState } from 'react';
import { getUser, onAuthChanged } from '../firebase/initialize';

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [userContext, setUserContext] = useState(defaultContext);

  useEffect(() => {
    getUser()
      .then((u: unknown) => {
        setUserContext({
          state: 'authed',
          user: u as User,
        })
      })
      .catch((e: Error) => {
        setUserContext({
          state: 'error',
          user: null
        })
      });

    onAuthChanged((user: User | null) => {
      console.log('asdf auth changed', user);
      setUserContext({
        ...userContext,
        user: user
      })
    })
  }, []);

  return (
    <UserContext.Provider value={userContext}>
      {children}
    </UserContext.Provider>
  )
}
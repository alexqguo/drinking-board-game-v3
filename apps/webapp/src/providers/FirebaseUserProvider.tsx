import { defaultContext, User, UserContext } from '@repo/react-ui/context/UserContext';
import { useEffect, useState } from 'react';
import { getUser, onAuthChanged } from '../firebase/auth';

export const FirebaseUserProvider = ({ children }: React.PropsWithChildren) => {
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

    const unsubscribe = onAuthChanged((user: User | null) => {
      setUserContext({
        ...userContext,
        user: user
      });
    });

    return () => { unsubscribe(); };
  }, [userContext]);

  return (
    <UserContext.Provider value={userContext}>
      {children}
    </UserContext.Provider>
  )
}
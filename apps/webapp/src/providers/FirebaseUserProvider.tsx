import { defaultContext, User, UserContext } from '@repo/react-ui/context/UserContext.jsx';
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
        });
      })
      .catch(() => {
        setUserContext({
          state: 'error',
          user: null,
        });
      });

    const unsubscribe = onAuthChanged((user: User | null) => {
      setUserContext((prev) => ({
        ...prev,
        user: user,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};

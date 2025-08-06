import { defaultContext, User, UserProvider } from '@repo/react-ui/context/UserContext.jsx';
import { useEffect, useState } from 'react';
import { getUser, onAuthChanged } from '../firebase/auth';

export const FirebaseUserProvider = ({ children }: React.PropsWithChildren) => {
  const [userContext, setUserContext] = useState(defaultContext);
  const [selectedRole, setSelectedRole] = useState<'host' | string | null>(null);

  useEffect(() => {
    getUser()
      .then((u: unknown) => {
        setUserContext({
          state: 'authed',
          user: u as User,
          selectedRole,
          setSelectedRole,
        });
      })
      .catch(() => {
        setUserContext({
          state: 'error',
          user: null,
          selectedRole,
          setSelectedRole,
        });
      });

    const unsubscribe = onAuthChanged((user: User | null) => {
      setUserContext((prev) => ({
        ...prev,
        user: user,
        selectedRole,
        setSelectedRole,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = {
    ...userContext,
    selectedRole,
    setSelectedRole,
  };

  return <UserProvider value={contextValue}>{children}</UserProvider>;
};

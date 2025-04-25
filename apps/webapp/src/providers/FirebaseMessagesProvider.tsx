import { Message, MessagesProvider } from '@repo/react-ui/context/MessagesContext.jsx';
import { ReactNode, useEffect, useState } from 'react';
import { subscribeToMessages } from '../firebase/database.js';

interface Props {
  gameId: string;
  children: ReactNode;
}

export const FirebaseMessagesProvider = ({ gameId, children }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to messages
  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = subscribeToMessages(
      gameId,
      (newMessages) => {
        if (newMessages) {
          setMessages(newMessages);
        } else {
          setMessages([]);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Error subscribing to messages:', error);
        setError(error);
        setIsLoading(false);
      },
    );

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [gameId]);

  return (
    <MessagesProvider messages={messages} isLoading={isLoading} error={error}>
      {children}
    </MessagesProvider>
  );
};

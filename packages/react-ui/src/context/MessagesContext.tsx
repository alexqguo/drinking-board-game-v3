import { createContext, ReactNode, useContext, useMemo, useRef } from 'react';

// Define the message interface
export interface Message {
  msg: string;
  isNew?: boolean;
}

// Define the context value interface
interface MessagesContextValue {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
}

// Create context with default values
export const MessagesContext = createContext<MessagesContextValue>({
  messages: [],
  isLoading: false,
  error: null,
});

interface Props {
  children: ReactNode;
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
}

export const MessagesProvider = ({ children, messages, isLoading, error }: Props) => {
  const messagesRef = useRef<Message[]>([]);
  const value = useMemo(() => {
    // Mark the last N messages with isNew. Janky diffing logic
    if (messages.length !== messagesRef.current.length) {
      const lengthDiff = messages.length - messagesRef.current.length;
      for (let i = 0; i < lengthDiff; i++) {
        messages[messages.length - 1 - i]!.isNew = true;
      }
    }

    messagesRef.current = messages;
    return {
      messages,
      isLoading,
      error,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, isLoading, error]);

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
};

// Custom hook for consuming messages
export const useMessages = (): MessagesContextValue => {
  const context = useContext(MessagesContext);

  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }

  return context;
};

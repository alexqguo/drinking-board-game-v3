import { createContext, ReactNode, useContext, useMemo } from 'react';

// Define the message interface
export interface Message {
  msg: string;
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
  const value = useMemo(() => {
    return {
      messages,
      isLoading,
      error,
    };
  }, [messages, isLoading, error]);

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

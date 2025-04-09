import { createContext, FC, ReactNode } from 'react';

export interface UIEnvironment {
  // Basic Elements
  Button: FC<{
    disabled?: boolean;
    type?: string;
    children: ReactNode
  }>;

  Text: FC<{
    fontSize?: 'xs' | 's' | 'm' | 'l' | 'xl',
    children: ReactNode
  }>;

  // Layout Components
  PageContainer: FC<any>;

  // Uncontrolled form elements
  Input: FC<{
    name: string;
    placeholder?: string;
  }>;
  Field: FC<{
    label: string;
    children: ReactNode;
  }>;
  RadioField: FC<{
    label: string;
    children: ReactNode;
  }>;
  RadioCard: FC<{
    name: string;
    value: string;
    title: string;
    description: string;
  }>;

  Spinner: FC<{ size: 's' | 'l' }>;

  // todo- modal
  Prompt: FC<{
    isOpen: boolean;
    children: ReactNode;
  }>
}

// Create environment context with default implementations
export const UIEnvironmentContext = createContext<UIEnvironment>({} as UIEnvironment);
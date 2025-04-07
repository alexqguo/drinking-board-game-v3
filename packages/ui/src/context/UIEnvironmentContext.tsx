import { createContext, FC, ReactNode } from 'react';

/**
 * Using ComponentType<any> breaks type safety.
 * In the future I can define my own basic props type for the components,
 * but that will likely be a pain in the ass. I'll keep it like this for now.
 *
 */
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

  Box: FC<any>;

  // Layout Components
  PageContainer: FC<any>;
  Flex: FC<any>;
  Grid: FC<any>;

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
}

// Create environment context with default implementations
export const UIEnvironmentContext = createContext<UIEnvironment>({} as UIEnvironment);
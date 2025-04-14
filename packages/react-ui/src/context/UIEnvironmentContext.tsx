import { createContext, CSSProperties, FC, ReactNode, useContext } from 'react';

export interface UIEnvironment {
  // Basic Elements
  Button: FC<{
    disabled?: boolean;
    type?: string;
    children: ReactNode;
    onClick?: () => void;
  }>;

  Text: FC<{
    fontSize?: 'xs' | 's' | 'm' | 'l' | 'xl',
    children: ReactNode
  }>;

  // Layout Components
  PageContainer: FC<any>;
  Flex: FC<{
    gap?: CSSProperties['gap'];
    wrap?: CSSProperties['flexWrap'];
    direction?: CSSProperties['flexDirection'];
    flex?: CSSProperties['flex'];
    justifyContent?: CSSProperties['justifyContent'];
    children: ReactNode;
  }>;
  Separator: FC<{
    label?: string;
  }>;

  // Uncontrolled form elements
  Input: FC<{
    name: string;
    placeholder?: string;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>>;
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
  RadioGroup: FC<{
    options: {
      label: string;
      value: string;
    }[];
    value: string;
    disabled?: boolean;
    onChange: (newValue: string) => void;
  }>;

  Spinner: FC<{ size: 's' | 'l' }>;

  Modal: FC<{
    isOpen: boolean;
    headerText?: string;
    children: ReactNode;
    footerContent: ReactNode;
  }>;

  Avatar: FC<{
    name: string;
    width: string;
    height: string;
  }>;
}

// Create environment context with default implementations
export const UIEnvironmentContext = createContext<UIEnvironment>({} as UIEnvironment);

export const useUI = () => {
  return useContext(UIEnvironmentContext);
}
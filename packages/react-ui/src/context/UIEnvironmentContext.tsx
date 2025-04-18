import { ButtonHTMLAttributes, createContext, CSSProperties, FC, ReactNode, useContext } from 'react';

interface FlexProperties {
  gap?: CSSProperties['gap'];
  wrap?: CSSProperties['flexWrap'];
  direction?: CSSProperties['flexDirection'];
  flex?: CSSProperties['flex'];
  justifyContent?: CSSProperties['justifyContent'];
  padding?: UISize;
  children?: ReactNode;
}

export enum UISize { xs = 'xs', s = 's', m = 'm', l = 'l', xl = 'xl' };

export interface UIEnvironment {
  // Basic Elements
  Button: FC<{
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: UISize;
    disabled?: boolean;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    children: ReactNode;
    onClick?: () => void;
  }>;

  Text: FC<{
    fontSize?: UISize;
    children: ReactNode
  }>;

  Popover: FC<{
    popoverTrigger: ReactNode;
    popoverBody: ReactNode;
  }>;

  // Layout Components
  PageContainer: FC<any>;
  Flex: FC<FlexProperties>;
  Row: FC<FlexProperties>;
  Col: FC<FlexProperties>;
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
    disabled?: boolean;
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

  Spinner: FC<{ size: UISize }>;

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
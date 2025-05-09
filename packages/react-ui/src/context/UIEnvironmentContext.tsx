import {
  ButtonHTMLAttributes,
  createContext,
  CSSProperties,
  FC,
  ReactNode,
  useContext,
} from 'react';

interface CommonFlexProperties {
  gap?: CSSProperties['gap'];
  wrap?: CSSProperties['flexWrap'];
  direction?: CSSProperties['flexDirection'];
  flex?: CSSProperties['flex'];
  justifyContent?: CSSProperties['justifyContent'];
  padding?: UISize;
  margin?: UISize;
  marginTop?: UISize;
  marginBottom?: UISize;
  marginLeft?: UISize;
  marginRight?: UISize;
  alignItems?: CSSProperties['alignItems'];
  style?: CSSProperties;
  height?: CSSProperties['height'];
  children?: ReactNode;
}

export enum UISize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
}

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
    color?: string;
    fontSize?: UISize;
    children: ReactNode;
  }>;

  Popover: FC<{
    popoverTrigger: ReactNode;
    popoverBody: ReactNode;
  }>;

  // Layout Components
  PageContainer: FC<{ children: ReactNode }>;
  Flex: FC<CommonFlexProperties>;
  Row: FC<CommonFlexProperties>;
  Col: FC<CommonFlexProperties>;
  Separator: FC<{
    label?: string | ReactNode;
  }>;

  // Uncontrolled form elements
  Input: FC<
    {
      name: string;
      placeholder?: string;
    } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>
  >;
  Field: FC<{
    label: string;
    children: ReactNode;
  }>;
  RadioField: FC<{
    label: string;
    children: ReactNode;
    value?: string;
  }>;
  RadioCard: FC<{
    name: string;
    value: string;
    title: string;
    description?: string;
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
    headerText?: string | ReactNode;
    children: ReactNode;
    footerContent: ReactNode;
    isFullScreen?: boolean;
  }>;

  Avatar: FC<{
    name: string;
    width: string;
    height: string;
  }>;

  Chip: FC<{
    color?: string;
    children: ReactNode;
  }>;
}

// Create environment context with default implementations
export const UIEnvironmentContext = createContext<UIEnvironment>({} as UIEnvironment);

export const useUI = () => {
  return useContext(UIEnvironmentContext);
};

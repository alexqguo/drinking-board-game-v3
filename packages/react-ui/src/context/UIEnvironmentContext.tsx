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
  flexGrow?: CSSProperties['flexGrow'];
  justifyContent?: CSSProperties['justifyContent'];
  padding?: UISize;
  margin?: UISize;
  marginTop?: UISize;
  marginBottom?: UISize;
  marginLeft?: UISize;
  marginRight?: UISize;
  alignItems?: CSSProperties['alignItems'];
  alignSelf?: CSSProperties['alignSelf'];
  style?: CSSProperties;
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
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

  Card: FC<{
    children: ReactNode;
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
    onValueChange?: (value: string) => void;
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
    size?: UISize;
    color?: string;
    isCloseable?: boolean;
    onClose?: () => void;
    children: ReactNode;
  }>;

  Alert: FC<{
    title: string;
  }>;

  HoverTooltip: FC<{
    children: ReactNode;
    content: string | ReactNode;
  }>;

  Portal: FC<{ children: ReactNode }>;
}

// Create environment context with default implementations
export const UIEnvironmentContext = createContext<UIEnvironment>({} as UIEnvironment);

export const useUI = () => {
  return useContext(UIEnvironmentContext);
};

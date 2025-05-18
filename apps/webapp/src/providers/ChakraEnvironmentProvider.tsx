import {
  UIEnvironment,
  UIEnvironmentContext,
  UISize,
} from '@repo/react-ui/context/UIEnvironmentContext.jsx';
import React, { ReactNode, useEffect, useState } from 'react';

export interface UIModule {
  Provider: React.FC<{ children: ReactNode }>;
  environmentComponents: UIEnvironment;
}

export const fontSizeMap = {
  [UISize.xs]: 'xs',
  [UISize.s]: 'sm',
  [UISize.m]: 'md',
  [UISize.l]: 'lg',
  [UISize.xl]: '7xl',
} as const;

export const spacingMap = {
  [UISize.xs]: 1,
  [UISize.s]: 2,
  [UISize.m]: 3,
  [UISize.l]: 4,
  [UISize.xl]: 5,
} as const;

export const buttonVariantMap = {
  primary: 'solid',
  secondary: 'surface',
  tertiary: 'outline',
} as const;

export const sizeMap = {
  [UISize.xs]: 'xs',
  [UISize.s]: 'sm',
  [UISize.m]: 'md',
  [UISize.l]: 'lg',
  [UISize.xl]: 'xl',
} as const;

// This could be useful once additional UI libraries are added
export const getMappedProperty = <Key, ValueMap>(
  value: Key,
  map: ValueMap,
): ValueMap[keyof ValueMap] | undefined => {
  if (!value) return undefined;
  return map[value as keyof ValueMap];
};

export const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan'];

export const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length;
  return colorPalette[index];
};

export const ChakraProvider = ({ children }: React.PropsWithChildren) => {
  const [uiModule, setUiModule] = useState<UIModule | null>(null);

  useEffect(() => {
    import('../ui/chakra').then((uiModule) => {
      setUiModule(uiModule.default);
    });
  }, []);

  if (!uiModule) return <div></div>;

  return (
    <uiModule.Provider>
      <UIEnvironmentContext.Provider value={uiModule.environmentComponents}>
        {children}
      </UIEnvironmentContext.Provider>
    </uiModule.Provider>
  );
};

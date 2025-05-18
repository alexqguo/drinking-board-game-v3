import {
  UIEnvironment,
  UIEnvironmentContext,
} from '@repo/react-ui/context/UIEnvironmentContext.jsx';
import React, { ReactNode, useEffect, useState } from 'react';

export interface UIModule {
  Provider: React.FC<{ children: ReactNode }>;
  environmentComponents: UIEnvironment;
}

// This could be useful once additional UI libraries are added
export const getMappedProperty = <Key, ValueMap>(
  value: Key,
  map: ValueMap,
): ValueMap[keyof ValueMap] | undefined => {
  if (!value) return undefined;
  return map[value as keyof ValueMap];
};

export const WebappUIProvider = ({ children }: React.PropsWithChildren) => {
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

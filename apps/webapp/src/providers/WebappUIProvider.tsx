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
    // Check URL parameter for UI library selection
    const urlParams = new URLSearchParams(window.location.search);
    const uiLibrary = urlParams.get('__dbg_ui') || 'chakra'; // Default to chakra if no parameter

    import(uiLibrary === 'tailwind' ? '../ui/tailwind' : '../ui/chakra')
      .then((uiModule) => {
        setUiModule(uiModule.default);
      })
      .catch((error) => {
        console.warn(`Failed to load UI library '${uiLibrary}', falling back to chakra:`, error);
        // Fallback to chakra if the requested library fails to load
        import('../ui/chakra').then((uiModule) => {
          setUiModule(uiModule.default);
        });
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

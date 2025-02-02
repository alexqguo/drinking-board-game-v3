import React, { type FC } from 'react';

export type UIEnvironment = {
  // TODO- these components need actual types
  Button: FC,

}

// Create environment context with default implementations
export const UIEnvironmentContext = React.createContext<UIEnvironment>({
  Button: () => null
});
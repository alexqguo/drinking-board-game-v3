import * as ChakraUI from '@chakra-ui/react';
import { UIEnvironmentContext } from '@repo/ui/context/UIEnvironmentContext';

export const ChakraProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ChakraUI.ChakraProvider value={ChakraUI.defaultSystem}>
      <UIEnvironmentContext.Provider value={{
        Button: ChakraUI.Button
      }}>
        {children}
      </UIEnvironmentContext.Provider>
    </ChakraUI.ChakraProvider>

  )
}
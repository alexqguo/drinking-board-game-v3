import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import React from 'react'

export const Provider = ({ children }: React.PropsWithChildren) => {
  return (
    <ChakraProvider value={defaultSystem}>
      {children}
    </ChakraProvider>
  )
}
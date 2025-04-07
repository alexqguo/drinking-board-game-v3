import * as ChakraUI from '@chakra-ui/react';
import { UIEnvironmentContext } from '@repo/ui/context/UIEnvironmentContext';

export const ChakraProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ChakraUI.ChakraProvider value={ChakraUI.defaultSystem}>
      <UIEnvironmentContext.Provider value={{
        // Basic Elements
        Button: ChakraUI.Button,
        Text: ChakraUI.Text,
        Heading: ChakraUI.Heading,
        Box: ChakraUI.Box,

        // Layout Components
        PageContainer: ChakraUI.Container,
        Stack: ChakraUI.Stack,
        HStack: ChakraUI.HStack,
        VStack: ChakraUI.VStack,
        Flex: ChakraUI.Flex,
        Grid: ChakraUI.Grid,

        // Form Elements
        Input: ChakraUI.Input,
        Select: ChakraUI.Select.Root, // may need to fix
        Field: ChakraUI.Field.Root,
        FieldLabel: ChakraUI.Field.Label,

        // Feedback & Overlay
        Modal: ChakraUI.Modal,
        ModalOverlay: ChakraUI.ModalOverlay,
        ModalContent: ChakraUI.ModalContent,
        ModalHeader: ChakraUI.ModalHeader,
        ModalBody: ChakraUI.ModalBody,
        ModalFooter: ChakraUI.ModalFooter,
        // Alert: ChakraUI.Alert,
        Spinner: ChakraUI.Spinner,
      }}>
        {children}
      </UIEnvironmentContext.Provider>
    </ChakraUI.ChakraProvider>
  )
}
import * as ChakraUI from '@chakra-ui/react';
import { UIEnvironmentContext } from '@repo/ui/context/UIEnvironmentContext';
import React from 'react';
import { chakraTheme } from '../theme/chakraTheme';

const fontSizeMap = {
  xs: 'xs',
  s: 'sm',
  m: 'md',
  l: 'lg',
  xl: '7xl',
}

export const ChakraProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ChakraUI.ChakraProvider value={chakraTheme}>
      <UIEnvironmentContext.Provider value={{
        // Basic Elements
        Button: (props) => (
          // @ts-expect-error stupid complaint
          <ChakraUI.Button {...props}>{props.children}</ChakraUI.Button>
        ),
        Text: ({ fontSize, children }) => (
          <ChakraUI.Text textStyle={fontSize ? fontSizeMap[fontSize] : 'md'}>
            {children}
          </ChakraUI.Text>
        ),

        // Layout Components
        PageContainer: ChakraUI.Container,

        // Form Elements
        Input: (props) => (
          <ChakraUI.Input {...props} />
        ),

        Field: (props) => (
          <ChakraUI.Field.Root>
            <ChakraUI.Field.Label>{props.label}</ChakraUI.Field.Label>
            {props.children}
          </ChakraUI.Field.Root>
        ),

        RadioField: (props) => (
          <ChakraUI.RadioCard.Root w="100%">
            <ChakraUI.RadioCardLabel>{props.label}</ChakraUI.RadioCardLabel>
            <ChakraUI.HStack align="stretch">
              {props.children}
            </ChakraUI.HStack>
          </ChakraUI.RadioCard.Root>
        ),
        RadioCard: (props) => (
          <ChakraUI.RadioCardItem value={props.value}>
            <ChakraUI.RadioCardItemHiddenInput name={props.name} />
            <ChakraUI.RadioCard.ItemControl>
              <ChakraUI.RadioCard.ItemContent>
                <ChakraUI.RadioCard.ItemText>{props.title}</ChakraUI.RadioCard.ItemText>
                <ChakraUI.RadioCard.ItemDescription>
                  {props.description}
                </ChakraUI.RadioCard.ItemDescription>
              </ChakraUI.RadioCard.ItemContent>
              <ChakraUI.RadioCard.ItemIndicator />
            </ChakraUI.RadioCard.ItemControl>
          </ChakraUI.RadioCardItem>
        ),

        // Feedback & Overlay
        // Alert: ChakraUI.Alert,
        Spinner: (props) => <ChakraUI.Spinner />,
      }}>
        {children}
      </UIEnvironmentContext.Provider>
    </ChakraUI.ChakraProvider>
  )
}
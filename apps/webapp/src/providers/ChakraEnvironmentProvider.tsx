/* eslint-disable react/prop-types */
import * as ChakraUI from '@chakra-ui/react';
import { UIEnvironmentContext } from '@repo/react-ui/context/UIEnvironmentContext';
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
        Flex: (props) => (
          <ChakraUI.Flex
            direction={props.direction}
            wrap={props.wrap}
            gap={props.gap}
          >
            {props.children}
          </ChakraUI.Flex>
        ),

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
        Spinner: (props) => <ChakraUI.Spinner />,

        // Game prompt
        Modal: ({ isOpen, children, headerText, footerContent }) => (
          <ChakraUI.Dialog.Root
            open={isOpen}
            closeOnEscape={false}
            closeOnInteractOutside={false}
            size="lg"
          >
            <ChakraUI.Portal>
              <ChakraUI.Dialog.Backdrop />
              <ChakraUI.Dialog.Positioner>
                <ChakraUI.Dialog.Content>
                  <ChakraUI.Dialog.Header>
                    <ChakraUI.Dialog.Title>{headerText}</ChakraUI.Dialog.Title>
                  </ChakraUI.Dialog.Header>
                  <ChakraUI.Dialog.Body>
                    {children}
                  </ChakraUI.Dialog.Body>
                  <ChakraUI.Dialog.Footer>
                    {footerContent}
                  </ChakraUI.Dialog.Footer>
                </ChakraUI.Dialog.Content>
              </ChakraUI.Dialog.Positioner>
            </ChakraUI.Portal>
          </ChakraUI.Dialog.Root>
        ),
      }}>
        {children}
      </UIEnvironmentContext.Provider>
    </ChakraUI.ChakraProvider>
  )
}
/* eslint-disable react/prop-types */
import * as ChakraUI from '@chakra-ui/react';
import { UIEnvironmentContext } from '@repo/react-ui/context/UIEnvironmentContext.jsx';
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
          <ChakraUI.Flex {...props}>
            {props.children}
          </ChakraUI.Flex>
        ),
        Separator: (props) => props.label ? (
          <ChakraUI.HStack>
            <ChakraUI.Text flexShrink="0">{props.label}</ChakraUI.Text>
            <ChakraUI.Separator flex="1" />
          </ChakraUI.HStack>
        ) : (
          <ChakraUI.Separator />
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
        RadioGroup: (props) => (
          <ChakraUI.RadioGroup.Root value={props.value} onValueChange={(e) => props.onChange(e.value)}>
            <ChakraUI.HStack gap="6">
              {props.options.map((option) => (
                <ChakraUI.RadioGroup.Item key={option.value} value={option.value} disabled={props.disabled}>
                  <ChakraUI.RadioGroup.ItemHiddenInput />
                  <ChakraUI.RadioGroup.ItemIndicator />
                  <ChakraUI.RadioGroup.ItemText>{option.label}</ChakraUI.RadioGroup.ItemText>
                </ChakraUI.RadioGroup.Item>
              ))}
            </ChakraUI.HStack>
          </ChakraUI.RadioGroup.Root>
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

        Avatar: (props) => (
          <ChakraUI.Avatar.Root width={props.width} height={props.height}>
            <ChakraUI.Avatar.Fallback name={props.name} />
          </ChakraUI.Avatar.Root>
        ),
      }}>
        {children}
      </UIEnvironmentContext.Provider>
    </ChakraUI.ChakraProvider>
  )
}
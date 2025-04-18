/* eslint-disable react/prop-types */
import * as ChakraUI from '@chakra-ui/react';
import { UIEnvironment, UIEnvironmentContext, UISize } from '@repo/react-ui/context/UIEnvironmentContext.jsx';
import React from 'react';
import { withPropMapper } from '../hoc/withPropMapper';
import { chakraTheme } from '../theme/chakraTheme';

const fontSizeMap = {
  [UISize.xs]: 'xs',
  [UISize.s]: 'sm',
  [UISize.m]: 'md',
  [UISize.l]: 'lg',
  [UISize.xl]: '7xl',
} as const;

const spacingMap = {
  [UISize.xs]: 1,
  [UISize.s]: 2,
  [UISize.m]: 3,
  [UISize.l]: 4,
  [UISize.xl]: 5,
} as const;

const variantMap = {
  primary: 'solid',
  secondary: 'surface',
  tertiary: 'outline',
} as const;

const sizeMap = {
  [UISize.xs]: 'xs',
  [UISize.s]: 'sm',
  [UISize.m]: 'md',
  [UISize.l]: 'lg',
  [UISize.xl]: 'xl',
} as const;

const getFontSize = (value: UISize | undefined, fallback?: string) => {
  if (!value) return fallback;
  return fontSizeMap[value];
}

export const ChakraProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ChakraUI.ChakraProvider value={chakraTheme}>
      <UIEnvironmentContext.Provider value={{
        // Basic Elements
        Button: withPropMapper<UIEnvironment['Button'], ChakraUI.ButtonProps>(ChakraUI.Button, {
          variant: (value) => variantMap[value as keyof typeof variantMap],
          size: (value) => sizeMap[value as UISize],
        }),

        Text: withPropMapper(ChakraUI.Text, {
          textStyle: (value) => getFontSize(value as UISize, 'md')
        }),

        Popover: (props) => (
          <ChakraUI.Popover.Root>
            <ChakraUI.Popover.Trigger>
              {props.popoverTrigger}
            </ChakraUI.Popover.Trigger>
            <ChakraUI.Portal>
              <ChakraUI.Popover.Positioner>
                <ChakraUI.Popover.Content>
                  <ChakraUI.Popover.Arrow />
                  <ChakraUI.Popover.Body>
                    {props.popoverBody}
                  </ChakraUI.Popover.Body>
                </ChakraUI.Popover.Content>
              </ChakraUI.Popover.Positioner>
            </ChakraUI.Portal>
          </ChakraUI.Popover.Root>
        ),

        // Layout Components
        PageContainer: ChakraUI.Container,

        Flex: withPropMapper(ChakraUI.Flex, {
          padding: (value) => spacingMap[value as UISize]
        }),

        Row: withPropMapper(ChakraUI.Flex, {
          padding: (value) => spacingMap[value as UISize],
        }, { flexDirection: 'row' }),

        Col: withPropMapper(ChakraUI.Flex, {
          padding: (value) => spacingMap[value as UISize],
        }, { flexDirection: 'column' }),

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
          <ChakraUI.RadioCardItem value={props.value} disabled={props.disabled}>
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
        Spinner: ({ size }) => <ChakraUI.Spinner size={sizeMap[size]} />,

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
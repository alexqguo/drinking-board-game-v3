/* eslint-disable react/prop-types */
import * as ChakraUI from '@chakra-ui/react';
import { useAppActionsRegistryInstance } from '@repo/react-ui/context/AppActionsContext.jsx';
import { UIEnvironmentContext, UISize } from '@repo/react-ui/context/UIEnvironmentContext.jsx';
import React, { useCallback, useEffect, useState } from 'react';
import { getTheme } from '../theme/chakraTheme';

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

const buttonVariantMap = {
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

// This could be useful once additional UI libraries are added
const getMappedProperty = <Key, ValueMap>(
  value: Key,
  map: ValueMap,
): ValueMap[keyof ValueMap] | undefined => {
  if (!value) return undefined;
  return map[value as keyof ValueMap];
};

const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan'];

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length;
  return colorPalette[index];
};

export const ChakraProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState(getTheme());
  const appActionsRegistry = useAppActionsRegistryInstance();

  const updateUIThemeColor = useCallback((color: string) => {
    setTheme(getTheme(color));
  }, []);

  useEffect(() => {
    appActionsRegistry.register('updateUITheme', updateUIThemeColor);
    // Cleanup on unmount if necessary, though for a global action it might not be typical
    // return () => appActionsRegistry.unregister('updateUITheme');
  }, [appActionsRegistry, updateUIThemeColor]);

  return (
    <ChakraUI.ChakraProvider value={theme}>
      <UIEnvironmentContext.Provider
        value={{
          // Basic Elements
          Button: (props) => (
            <ChakraUI.Button
              {...props}
              size={getMappedProperty(props.size, sizeMap)}
              variant={getMappedProperty(props.variant, buttonVariantMap)}
              boxShadow="button"
              borderWidth="2px"
              borderStyle="solid"
              borderColor="#000000"
              position="relative"
              shadow="4px 4px 0px #000000"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '6px 6px 0px #000000',
              }}
              _active={{
                transform: 'translateY(2px)',
                shadow: undefined,
                boxShadow: '0 0 0 #000000',
              }}
              _pressed={{
                transform: 'translateY(2px)',
                shadow: undefined,
                boxShadow: '0 0 0 #000000',
              }}
            >
              {props.children}
            </ChakraUI.Button>
          ),

          Text: (props) => (
            <ChakraUI.Text
              color={props.color}
              textStyle={getMappedProperty(props.fontSize, fontSizeMap) || 'md'}
            >
              {props.children}
            </ChakraUI.Text>
          ),

          Popover: (props) => (
            <ChakraUI.Popover.Root>
              <ChakraUI.Popover.Trigger asChild>{props.popoverTrigger}</ChakraUI.Popover.Trigger>
              <ChakraUI.Portal>
                <ChakraUI.Popover.Positioner>
                  <ChakraUI.Popover.Content>
                    <ChakraUI.Popover.Arrow />
                    <ChakraUI.Popover.Body>{props.popoverBody}</ChakraUI.Popover.Body>
                  </ChakraUI.Popover.Content>
                </ChakraUI.Popover.Positioner>
              </ChakraUI.Portal>
            </ChakraUI.Popover.Root>
          ),

          // Layout Components
          PageContainer: (props) => (
            <ChakraUI.Container maxWidth={800}>{props.children}</ChakraUI.Container>
          ),

          Flex: (props) => (
            <ChakraUI.Flex
              {...props}
              gap={getMappedProperty(props.gap, spacingMap)}
              padding={getMappedProperty(props.padding, spacingMap)}
              margin={getMappedProperty(props.margin, spacingMap)}
              marginTop={getMappedProperty(props.marginTop, spacingMap)}
              marginBottom={getMappedProperty(props.marginBottom, spacingMap)}
              marginLeft={getMappedProperty(props.marginLeft, spacingMap)}
              marginRight={getMappedProperty(props.marginRight, spacingMap)}
            >
              {props.children}
            </ChakraUI.Flex>
          ),

          Row: (props) => (
            <ChakraUI.Flex
              {...props}
              gap={getMappedProperty(props.gap, spacingMap)}
              padding={getMappedProperty(props.padding, spacingMap)}
              margin={getMappedProperty(props.margin, spacingMap)}
              marginTop={getMappedProperty(props.marginTop, spacingMap)}
              marginBottom={getMappedProperty(props.marginBottom, spacingMap)}
              marginLeft={getMappedProperty(props.marginLeft, spacingMap)}
              marginRight={getMappedProperty(props.marginRight, spacingMap)}
              flexDirection="row"
            >
              {props.children}
            </ChakraUI.Flex>
          ),

          Col: (props) => (
            <ChakraUI.Flex
              {...props}
              gap={getMappedProperty(props.gap, spacingMap)}
              padding={getMappedProperty(props.padding, spacingMap)}
              margin={getMappedProperty(props.margin, spacingMap)}
              marginTop={getMappedProperty(props.marginTop, spacingMap)}
              marginBottom={getMappedProperty(props.marginBottom, spacingMap)}
              marginLeft={getMappedProperty(props.marginLeft, spacingMap)}
              marginRight={getMappedProperty(props.marginRight, spacingMap)}
              flexDirection="column"
            >
              {props.children}
            </ChakraUI.Flex>
          ),

          Separator: (props) =>
            props.label ? (
              <ChakraUI.HStack>
                <ChakraUI.Text flexShrink="0">{props.label}</ChakraUI.Text>
                <ChakraUI.Separator flex="1" />
              </ChakraUI.HStack>
            ) : (
              <ChakraUI.Separator />
            ),

          // Form Elements
          Input: (props) => <ChakraUI.Input {...props} />,

          Field: (props) => (
            <ChakraUI.Field.Root>
              <ChakraUI.Field.Label>{props.label}</ChakraUI.Field.Label>
              {props.children}
            </ChakraUI.Field.Root>
          ),

          RadioField: (props) => (
            <ChakraUI.RadioCard.Root w="100%" value={props.value}>
              <ChakraUI.RadioCardLabel>{props.label}</ChakraUI.RadioCardLabel>
              <ChakraUI.HStack align="stretch">{props.children}</ChakraUI.HStack>
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
            <ChakraUI.RadioGroup.Root
              value={props.value}
              onValueChange={(e) => props.onChange(e.value)}
            >
              <ChakraUI.HStack gap="6">
                {props.options.map((option) => (
                  <ChakraUI.RadioGroup.Item
                    key={option.value}
                    value={option.value}
                    disabled={props.disabled}
                  >
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
          Modal: ({ isOpen, children, headerText, footerContent, isFullScreen }) => (
            <ChakraUI.Dialog.Root
              open={isOpen}
              closeOnEscape={false}
              closeOnInteractOutside={false}
              size={isFullScreen ? 'full' : 'lg'}
              scrollBehavior={isFullScreen ? 'inside' : 'outside'}
            >
              <ChakraUI.Portal>
                <ChakraUI.Dialog.Backdrop />
                <ChakraUI.Dialog.Positioner>
                  <ChakraUI.Dialog.Content>
                    <ChakraUI.Dialog.Header>
                      <ChakraUI.Dialog.Title>{headerText}</ChakraUI.Dialog.Title>
                    </ChakraUI.Dialog.Header>
                    <ChakraUI.Dialog.Body>{children}</ChakraUI.Dialog.Body>
                    <ChakraUI.Dialog.Footer>{footerContent}</ChakraUI.Dialog.Footer>
                  </ChakraUI.Dialog.Content>
                </ChakraUI.Dialog.Positioner>
              </ChakraUI.Portal>
            </ChakraUI.Dialog.Root>
          ),

          Avatar: (props) => (
            <ChakraUI.Avatar.Root
              width={props.width}
              height={props.height}
              border="2px solid black"
              colorPalette={pickPalette(props.name)}
            >
              <ChakraUI.Avatar.Fallback name={props.name} />
            </ChakraUI.Avatar.Root>
          ),

          Chip: (props) => (
            <ChakraUI.Tag.Root colorPalette={props.color} size="sm">
              {props.children}
            </ChakraUI.Tag.Root>
          ),
        }}
      >
        {children}
      </UIEnvironmentContext.Provider>
    </ChakraUI.ChakraProvider>
  );
};

import React from 'react';

/**
 * Prop mapper HOC. Useful for converting react-ui generic UI props into UI library specific ones
 *
 * @param Component UI library component implementation
 * @param propMappers mapper functions
 * @param additionalProps hardcoded props to pass through to the component
 * @returns wrapped component
 *
 * Example:
 * Button: withPropMapper(ChakraUI.Button, {
 *   variant: (value) => variantMap[value as keyof typeof variantMap],
 *   size: (value) => sizeMap[value as UISize],
 * }),
 *
 * InterfaceProps: props from the UI interface
 * LibraryComponentProps: props for the actual UI component library's implementation
 */
export const withPropMapper = <InterfaceProps, LibraryComponentProps>(
  Component: React.ComponentType<LibraryComponentProps>,
  propMappers: {
    [K in keyof LibraryComponentProps]?: (value: unknown) => LibraryComponentProps[K];
  },
  additionalProps?: Partial<LibraryComponentProps>
) => {
  // TODO- clean this up!
  const Wrapped = (props: LibraryComponentProps) => {
    const mappedProps = { ...props } as Partial<LibraryComponentProps>;

    (Object.keys(propMappers) as Array<keyof LibraryComponentProps>).forEach((key) => {
      const mapper = propMappers[key];
      const value = props[key];

      if (mapper && value !== undefined) {
        mappedProps[key] = mapper(value) as LibraryComponentProps[keyof LibraryComponentProps];
      }
    });

    return <Component {...mappedProps as LibraryComponentProps} {...additionalProps} />;
  };
  Wrapped.displayName = `Wrapped${Component.displayName}`;

  return Wrapped;
};
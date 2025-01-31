import * as ChakraUI from '@chakra-ui/react';

/**
 * It's a little annoying to setup but trying an ACL for components
 */

type UIComponentNames = 'Button' | 'Input';

type UIComponents = {
  Button: typeof ChakraUI.Button;
  Input: typeof ChakraUI.Input;
};

const componentMap: UIComponents = {
  Button: ChakraUI.Button,
  Input: ChakraUI.Input,
}

export function getUIComponent<T extends UIComponentNames>(
  name: T
): UIComponents[T] {
  return componentMap[name];
}
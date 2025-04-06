import React from 'react';

/**
 * Using ComponentType<any> breaks type safety.
 * In the future I can define my own basic props type for the components,
 * but that will likely be a pain in the ass. I'll keep it like this for now.
 *
 */
export interface UIEnvironment {
  // Basic Elements
  Button: React.ComponentType<any>;
  Text: React.ComponentType<any>;
  Heading: React.ComponentType<any>;
  Box: React.ComponentType<any>;

  // Layout Components
  Stack: React.ComponentType<any>;
  HStack: React.ComponentType<any>;
  VStack: React.ComponentType<any>;
  Flex: React.ComponentType<any>;
  Grid: React.ComponentType<any>;

  // Form Elements
  Input: React.ComponentType<any>;
  Select: React.ComponentType<any>;
  Checkbox: React.ComponentType<any>;

  // Feedback & Overlay
  Modal: React.ComponentType<any>;
  ModalOverlay: React.ComponentType<any>;
  ModalContent: React.ComponentType<any>;
  ModalHeader: React.ComponentType<any>;
  ModalBody: React.ComponentType<any>;
  ModalFooter: React.ComponentType<any>;
  Alert: React.ComponentType<any>;
  Spinner: React.ComponentType<any>;
}

// Create environment context with default implementations
export const UIEnvironmentContext = React.createContext<UIEnvironment>({} as UIEnvironment);
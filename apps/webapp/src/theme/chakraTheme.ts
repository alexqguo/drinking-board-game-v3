import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

export const getTheme = (color: string = '') =>
  createSystem(
    defaultConfig,
    defineConfig({
      globalCss: {
        html: {
          fontSize: '20px',
          colorPalette: color,
        },
      },
      theme: {
        tokens: {
          fonts: {
            body: {
              value: '"Jersey 25", system-ui, sans-serif',
            },
          },
        },
      },
    }),
  );

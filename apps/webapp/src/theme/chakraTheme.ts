import {
  createSystem,
  defaultConfig,
  defineConfig
} from '@chakra-ui/react';

const config = defineConfig({
  globalCss: {
    'html': { fontSize: '20px' }
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: '"Jersey 25", system-ui, sans-serif' },
      },
    },
  },
});

export const chakraTheme = createSystem(defaultConfig, config);
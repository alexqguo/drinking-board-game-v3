import UnpluginTypia from '@ryoppippi/unplugin-typia/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**'],
    },
  },
  plugins: [UnpluginTypia()]
})
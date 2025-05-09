import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import googleAnalytics from 'astro-google-analytics';

export default defineConfig({
  integrations: [
    solidJs(),
    tailwind(),
    googleAnalytics({
      trackingId: 'G-CD3V675MMR',
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['three']
    }
  }
});

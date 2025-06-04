import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    solidJs(),
    tailwind()
  ],
  site: 'https://www.baip.ai',
  cacheDir: './cache', // Use custom cache directory for GitHub Actions caching
  build: {
    assets: '_astro',
    // Ensure proper output for Pagefind indexing
    format: 'directory'
  },
  vite: {
    ssr: {
      noExternal: ['three']
    },
    build: {
      assetsInlineLimit: 0, // Ensure assets are always externalized for proper path handling
      rollupOptions: {
        output: {
          // Optimize for search indexing
          manualChunks: undefined
        }
      }
    }
  },
  // Optimize for SEO and search
  compressHTML: true,
  experimental: {
    contentCollectionCache: true
  }
});

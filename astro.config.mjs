// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Canonical + OG URLs derive from this. Change it in one place when a
  // custom domain is attached — nothing else references the host.
  site: 'https://ismayildev.site',
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
});

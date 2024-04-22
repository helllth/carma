/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/playgrounds/stadtplan-playground',

  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      // Add the directory to the allow list
      allow: [
        // Add the directories containing the CSS files to the allow list
        '/Users/cismet/Desktop/dev/work/carma-monorepo/node_modules/leaflet-extra-markers/dist/img/',
        '/Users/cismet/Desktop/dev/work/carma-monorepo/node_modules/font-awesome/',
        '/Users/cismet/Desktop/dev/work/carma-monorepo/node_modules/react-cismap/node_modules/react-leaflet-markercluster/dist/',
        '/Users/cismet/Desktop/dev/work/carma-monorepo/node_modules/leaflet-fullscreen-custom-container-fork/dist/',
        '/Users/cismet/Desktop/dev/work/carma-monorepo/node_modules/leaflet.locatecontrol/dist/',
        '/Users/cismet/Desktop/dev/work/carma-monorepo/node_modules/leaflet-easybutton/src/',
        '/Users/cismet/Desktop/dev/work/carma-monorepo/node_modules/react-cismap/',
      ],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/playgrounds/stadtplan-playground',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/playgrounds/stadtplan-playground',
      provider: 'v8',
    },
  },
});

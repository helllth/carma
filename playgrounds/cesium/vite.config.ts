/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/playgrounds/cesium',

  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      allow: ['../..'],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    cesium({
      cesiumBuildPath: '../../node_modules/cesium/Build/Cesium/',
      cesiumBuildRootPath: '../../node_modules/cesium/Build',
    }),
    react(),
    nxViteTsPaths(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/playgrounds/cesium',
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
      reportsDirectory: '../../coverage/playgrounds/cesium',
      provider: 'v8',
    },
  },
});

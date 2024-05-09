import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import * as path from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';

require('dotenv').config();

const sentryConfig = {
  url: process.env.SENTRY_VITE_URL,
  authToken: process.env.SENTRY_VITE_AUTH_TOKEN,
  org: process.env.SENTRY_VITE_ORG,
  project: process.env.SENTRY_VITE_PROJECT,
  deploy: {
    env: process.env.APP_ENV,
  },
  setCommits: {
    auto: true,
  },
  sourceMaps: {
    include: ['./dist/assets'],
    ignore: ['node_modules'],
    urlPrefix: '~/assets',
  },
};

export default defineConfig({
  plugins: [vue(), sentryVitePlugin(sentryConfig)],
  server: {
    port: process.env.APP_DEV_PORT,
    host: process.env.APP_BASE_URL,
  },
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '~': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    sourcemap: true,
  },
});

'use strict';

import path from 'node:path';
import process from 'node:process';
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { htmlMetaPlugin } from 'vite-plugin-html-meta';
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({mode})=>{
  let env = loadEnv(mode, path.resolve(__dirname), '');
  return {
    plugins:[
      svelte({
        compilerOptions: {
          css: 'external',
        },
      }),
      htmlMetaPlugin({
        csp: {
          defaultSrc: 'none',
          scriptSrc: 'self',
          imgSrc: ['self', 'data:'],
          styleSrc: process.env.NODE_ENV == 'development' ? ['self', 'unsafe-inline'] : 'self',
          connectSrc: ['self', 'https://cognito-idp.ap-northeast-1.amazonaws.com', 'https://*.auth.ap-northeast-1.amazoncognito.com']
        }
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          quietDeps: true
        }
      }
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname)
      },
    },
    base: env.VITE_SPA_BASE_URL,
    build: {
      target: 'es2022',
      assetsInlineLimit: 0,
    },
    server: {
      strictPort: true,
      proxy: {
        '/api': {
          target: 'https://ella.tsukuba-bunko.org',
          changeOrigin: true,
        }
      }
    }
  };
});
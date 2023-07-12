import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { tailwindGlobal, tailwindHMR } from 'stencil-tailwind-plugin';
import tailwind, { setPluginConfigurationDefaults } from 'stencil-tailwind-plugin';
import { postcss } from '@stencil/postcss';
import replace from 'postcss-replace';
import autoprefixer from 'autoprefixer';

// TODO fix
let envConfig = {
  STORAGE_URL: 'test'
}

setPluginConfigurationDefaults({
  stripComments: true
});

export const config: Config = {
  namespace: 'csb',
  plugins: [
    sass(),
    tailwindGlobal(),
    tailwind(),
    tailwindHMR(),
    postcss({
      plugins: [
        replace({ data: { "STORAGE_URL": envConfig.STORAGE_URL } }),
        autoprefixer
      ]
    })
  ],
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ]
};

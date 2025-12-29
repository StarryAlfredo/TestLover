import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    base: './', // Ensures assets are linked correctly on GitHub Pages
    define: {
      // Polyfill process.env.API_KEY for the app code
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY)
    }
  };
});
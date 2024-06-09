import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
          faker: ['@faker-js/faker'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/member': 'http://localhost:80',
      '/chat': 'http://localhost:80',
    },
  },
});

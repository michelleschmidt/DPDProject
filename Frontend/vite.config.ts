import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // This should match the port you are trying to access
    open: true, // Automatically opens the browser
  },
});

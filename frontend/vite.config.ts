import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

// Determine if we're running in a Docker environment
const isDocker = process.env.DOCKER_ENV === 'true';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // This should match the port you are trying to access
    open: true, // Automatically opens the browser
    proxy: {
      '/api': {
        target: isDocker ? 'http://server-app:7000' : 'https://health-connect-kyp7.onrender.com',
        changeOrigin: true,
        secure: false, // Set to true if the target server uses a valid SSL certificate
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
});

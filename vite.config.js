import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development, production)
  const env = loadEnv(mode, process.cwd(), '');

  // Extract proxy target, stripping trailing '/api' if present so proxy path mapping is clean
  const rawTarget = env.VITE_BACKEND_PROXY_TARGET || env.VITE_API_BASE_URL || 'http://localhost:5000';
  const proxyTarget = rawTarget.replace(/\/api\/?$/, '');

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // Forward /api requests to backend server to eliminate CORS during local testing
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          // If the backend expects /api prefix, keep as is
          rewrite: (path) => path
        }
      }
    }
  };
});

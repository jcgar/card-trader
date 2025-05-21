import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    // allowedHosts: ['https://dev.acabaramos.com'],
    proxy: {
      '/api': {
        target: 'https://dev.acabaramos.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/graphql-local.php'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

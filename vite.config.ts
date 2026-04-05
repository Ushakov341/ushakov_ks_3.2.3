import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/Ushakov341/ushakov_ks_3.2.3/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

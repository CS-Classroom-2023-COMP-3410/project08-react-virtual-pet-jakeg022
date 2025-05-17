// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/project08-react-virtual-pet-jakeg022/', 
  plugins: [react()],
});

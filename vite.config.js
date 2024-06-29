import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/react-todo.list/', // Ensure this matches your repository name
  build: {
    outDir: 'dist',
  },
});

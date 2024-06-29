import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/react-todo.list/', // Ensure this matches your repo name
  build: {
    outDir: 'dist', // Ensure this matches your deploy folder
  }
});

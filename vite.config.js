import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        addProduct: path.resolve(__dirname, '/add-products.html'),
        allProducts: path.resolve(__dirname, '/all-products.html'),
        basket: path.resolve(__dirname, '/basket.html'),
      },
    },
  },
});
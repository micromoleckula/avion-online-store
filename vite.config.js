import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        addProduct: path.resolve(__dirname, 'public/add-products.html'),
        allProducts: path.resolve(__dirname, 'public/all-products.html'),
        basket: path.resolve(__dirname, 'public/basket.html'),
      },
    },
  },
});

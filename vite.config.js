import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/pages/index.html'),
        addProduct: path.resolve(__dirname, 'src/pages/add-products.html'),
        allProducts: path.resolve(__dirname, 'src/pages/all-products.html'),
        basket: path.resolve(__dirname, 'src/pages/basket.html'),
      },
    },
  },
});

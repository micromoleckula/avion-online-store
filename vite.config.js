import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        signUp: path.resolve(__dirname, 'src/pages/sign-up/sign-up.html'),
        addProduct: path.resolve(__dirname, 'src/pages/add-products/add-products.html'),
        allProducts: path.resolve(__dirname, 'src/pages/all-products/all-products.html'),
        basket: path.resolve(__dirname, 'src/pages/basket/basket.html'),
      },
    },
  },
});
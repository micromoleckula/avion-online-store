import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        addProduct: 'public/add-products.html',
        allProducts: 'public/all-products.html',
        basket: 'public/basket.html',
      },
    },
  },
});
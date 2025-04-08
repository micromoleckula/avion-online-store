import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, '/index.html'),
        addProduct: path.resolve(__dirname, '/src/pages/add-products/add-products.html'),
        allProducts: path.resolve(__dirname, '/src/pages/all-products/all-products.html'),
        basket: path.resolve(__dirname, '/src/pages/basket/basket.html'),
        detailPage: path.resolve(__dirname, '/src/pages/detail-page/detail-page.html'),
      },
    },
  },
});
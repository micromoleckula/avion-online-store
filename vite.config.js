import { defineConfig } from 'vite';
import path from 'path';
import html from '@rollup/plugin-html';

export default defineConfig({
  plugins: [html()],
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
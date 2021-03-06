import { defineConfig } from "vite";
import { resolve } from "path";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [ vue() ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      "@": resolve(__dirname, "src"),
    }
  }
});
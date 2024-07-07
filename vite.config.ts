import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {},
  },
  build: {
    assetsInlineLimit: 0,
    minify: 'esbuild',
    cssMinify: 'esbuild'
  },
});

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import webfontDownload from "vite-plugin-webfont-dl";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), webfontDownload()],
  resolve: {
    alias: {},
  },
  build: {
    assetsInlineLimit: 0,
    minify: "esbuild",
    cssMinify: "esbuild",
    modulePreload: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name;
        },
      },
    },
  }
});

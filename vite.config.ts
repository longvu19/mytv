import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import webfontDownload from "vite-plugin-webfont-dl";
// https://vitejs.dev/config/
const routes = [
  "/phim-bo",
  "/tv-shows",
  "/phim-le",
  "/hoat-hinh",
  "/phim",
  "/tim-kiem",
];
export default defineConfig({
  plugins: [vue(), svgLoader(), webfontDownload(),
    {
      name: 'rewrite-middleware',
      configureServer(serve) {
        serve.middlewares.use((req, res, next) => {
          next()
        })
      }
    }
  ],
  resolve: {
    alias: {},
  },
  server: {
    headers: {
      // "Cross-Origin-Opener-Policy": "unsafe-none",
    },
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
          if (assetInfo.name === "style.css") return "style.css";
          return assetInfo.name;
        },
      },
    },
  },
});

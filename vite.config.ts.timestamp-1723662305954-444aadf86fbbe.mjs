// vite.config.ts
import { defineConfig } from "file:///J:/W/mytv/node_modules/vite/dist/node/index.js";
import vue from "file:///J:/W/mytv/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import svgLoader from "file:///J:/W/mytv/node_modules/vite-svg-loader/index.js";
import webfontDownload from "file:///J:/W/mytv/node_modules/vite-plugin-webfont-dl/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [vue(), svgLoader(), webfontDownload()],
  resolve: {
    alias: {}
  },
  server: {
    headers: {
      // "Cross-Origin-Opener-Policy": "unsafe-none",
    }
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
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJKOlxcXFxXXFxcXG15dHZcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIko6XFxcXFdcXFxcbXl0dlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vSjovVy9teXR2L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSBcInZpdGUtc3ZnLWxvYWRlclwiO1xyXG5pbXBvcnQgd2ViZm9udERvd25sb2FkIGZyb20gXCJ2aXRlLXBsdWdpbi13ZWJmb250LWRsXCI7XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3Z1ZSgpLCBzdmdMb2FkZXIoKSwgd2ViZm9udERvd25sb2FkKCldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7fSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAvLyBcIkNyb3NzLU9yaWdpbi1PcGVuZXItUG9saWN5XCI6IFwidW5zYWZlLW5vbmVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDAsXHJcbiAgICBtaW5pZnk6IFwiZXNidWlsZFwiLFxyXG4gICAgY3NzTWluaWZ5OiBcImVzYnVpbGRcIixcclxuICAgIG1vZHVsZVByZWxvYWQ6IHRydWUsXHJcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09PSBcInN0eWxlLmNzc1wiKSByZXR1cm4gXCJzdHlsZS5jc3NcIjtcclxuICAgICAgICAgIHJldHVybiBhc3NldEluZm8ubmFtZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtTixTQUFTLG9CQUFvQjtBQUNoUCxPQUFPLFNBQVM7QUFDaEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8scUJBQXFCO0FBRTVCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLGdCQUFnQixDQUFDO0FBQUEsRUFDL0MsU0FBUztBQUFBLElBQ1AsT0FBTyxDQUFDO0FBQUEsRUFDVjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sU0FBUztBQUFBO0FBQUEsSUFFVDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLG1CQUFtQjtBQUFBLElBQ25CLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFNBQVMsWUFBYSxRQUFPO0FBQzNDLGlCQUFPLFVBQVU7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

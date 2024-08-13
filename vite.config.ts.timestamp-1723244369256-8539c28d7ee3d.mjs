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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJKOlxcXFxXXFxcXG15dHZcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIko6XFxcXFdcXFxcbXl0dlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vSjovVy9teXR2L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSBcInZpdGUtc3ZnLWxvYWRlclwiO1xyXG5pbXBvcnQgd2ViZm9udERvd25sb2FkIGZyb20gXCJ2aXRlLXBsdWdpbi13ZWJmb250LWRsXCI7XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3Z1ZSgpLCBzdmdMb2FkZXIoKSwgd2ViZm9udERvd25sb2FkKCldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7fSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogMCxcclxuICAgIG1pbmlmeTogXCJlc2J1aWxkXCIsXHJcbiAgICBjc3NNaW5pZnk6IFwiZXNidWlsZFwiLFxyXG4gICAgbW9kdWxlUHJlbG9hZDogdHJ1ZSxcclxuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XHJcbiAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWUgPT09ICdzdHlsZS5jc3MnKSByZXR1cm4gJ3N0eWxlLmNzcyc7XHJcbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfVxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtTixTQUFTLG9CQUFvQjtBQUNoUCxPQUFPLFNBQVM7QUFDaEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8scUJBQXFCO0FBRTVCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLGdCQUFnQixDQUFDO0FBQUEsRUFDL0MsU0FBUztBQUFBLElBQ1AsT0FBTyxDQUFDO0FBQUEsRUFDVjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsbUJBQW1CO0FBQUEsSUFDbkIsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCLENBQUMsY0FBYztBQUM3QixjQUFJLFVBQVUsU0FBUyxZQUFhLFFBQU87QUFDM0MsaUJBQU8sVUFBVTtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

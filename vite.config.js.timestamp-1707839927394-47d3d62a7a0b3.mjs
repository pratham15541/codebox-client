// vite.config.js
import { defineConfig } from "file:///D:/__PROGRAMS__/code%20editor/codemirror/client/node_modules/vite/dist/node/index.js";
import million from "file:///D:/__PROGRAMS__/code%20editor/codemirror/client/node_modules/million/dist/packages/compiler.mjs";
import react from "file:///D:/__PROGRAMS__/code%20editor/codemirror/client/node_modules/@vitejs/plugin-react-swc/index.mjs";
import dynamicImport from "file:///D:/__PROGRAMS__/code%20editor/codemirror/client/node_modules/vite-plugin-dynamic-import/dist/index.mjs";
import topLevelAwait from "file:///D:/__PROGRAMS__/code%20editor/codemirror/client/node_modules/vite-plugin-top-level-await/exports/import.mjs";
var vite_config_default = defineConfig({
  plugins: [
    million.vite({ auto: true, mute: true }),
    react(),
    dynamicImport(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`
    })
  ],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin"
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    },
    chunkSizeWarningLimit: 1e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX1BST0dSQU1TX19cXFxcY29kZSBlZGl0b3JcXFxcY29kZW1pcnJvclxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fUFJPR1JBTVNfX1xcXFxjb2RlIGVkaXRvclxcXFxjb2RlbWlycm9yXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovX19QUk9HUkFNU19fL2NvZGUlMjBlZGl0b3IvY29kZW1pcnJvci9jbGllbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IG1pbGxpb24gZnJvbSAnbWlsbGlvbi9jb21waWxlcidcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IGR5bmFtaWNJbXBvcnQgZnJvbSBcInZpdGUtcGx1Z2luLWR5bmFtaWMtaW1wb3J0XCI7XHJcbmltcG9ydCB0b3BMZXZlbEF3YWl0IGZyb20gXCJ2aXRlLXBsdWdpbi10b3AtbGV2ZWwtYXdhaXRcIjtcclxuXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFttaWxsaW9uLnZpdGUoeyBhdXRvOiB0cnVlLCBtdXRlOnRydWUgfSkscmVhY3QoKSwgZHluYW1pY0ltcG9ydCgpLFxyXG4gICAgdG9wTGV2ZWxBd2FpdCh7XHJcbiAgICAgIC8vIFRoZSBleHBvcnQgbmFtZSBvZiB0b3AtbGV2ZWwgYXdhaXQgcHJvbWlzZSBmb3IgZWFjaCBjaHVuayBtb2R1bGVcclxuICAgICAgcHJvbWlzZUV4cG9ydE5hbWU6IFwiX190bGFcIixcclxuICAgICAgLy8gVGhlIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGltcG9ydCBuYW1lcyBvZiB0b3AtbGV2ZWwgYXdhaXQgcHJvbWlzZSBpbiBlYWNoIGNodW5rIG1vZHVsZVxyXG4gICAgICBwcm9taXNlSW1wb3J0TmFtZTogaSA9PiBgX190bGFfJHtpfWBcclxuICAgIH0pXHJcbiAgXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgXCJDcm9zcy1PcmlnaW4tRW1iZWRkZXItUG9saWN5XCI6IFwicmVxdWlyZS1jb3JwXCIsXHJcbiAgICAgIFwiQ3Jvc3MtT3JpZ2luLU9wZW5lci1Qb2xpY3lcIjogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OntcclxuICAgICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxyXG59LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVSxTQUFTLG9CQUFvQjtBQUVsVyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sbUJBQW1CO0FBSTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUFDLFFBQVEsS0FBSyxFQUFFLE1BQU0sTUFBTSxNQUFLLEtBQUssQ0FBQztBQUFBLElBQUUsTUFBTTtBQUFBLElBQUcsY0FBYztBQUFBLElBQ3ZFLGNBQWM7QUFBQTtBQUFBLE1BRVosbUJBQW1CO0FBQUE7QUFBQSxNQUVuQixtQkFBbUIsT0FBSyxTQUFTLENBQUM7QUFBQSxJQUNwQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsZ0NBQWdDO0FBQUEsTUFDaEMsOEJBQThCO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDWCxRQUFPO0FBQUEsUUFDSCxhQUFhLElBQUk7QUFDYixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDN0IsbUJBQU8sR0FBRyxTQUFTLEVBQUUsTUFBTSxlQUFlLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTO0FBQUEsVUFDMUU7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLEVBQzNCO0FBQ0EsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

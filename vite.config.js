import { defineConfig } from "vite";
import { resolve } from "path";
import million from 'million/compiler'
import react from "@vitejs/plugin-react-swc";
import dynamicImport from "vite-plugin-dynamic-import";
import topLevelAwait from "vite-plugin-top-level-await";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true, mute:true }),react(), dynamicImport(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    })
  ],
  preview:{
    port:'3000',
    host:true,
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    host:true,
    origin: "*",
  },
  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    },
    chunkSizeWarningLimit: 1000,
},
});

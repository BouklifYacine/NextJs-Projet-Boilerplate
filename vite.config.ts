// vite.config.ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3000,
    host: true, // Required for Docker - binds to 0.0.0.0
  },
  ssr: {
    external: ["@node-rs/argon2"],
  },
  optimizeDeps: {
    exclude: ["@node-rs/argon2"],
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress unused external import warnings from third-party packages
        if (
          warning.code === "UNUSED_EXTERNAL_IMPORT" &&
          warning.exporter &&
          (warning.exporter.includes("@tanstack/router-core") ||
            warning.exporter.includes("@better-auth"))
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
  plugins: [
    tailwindcss(),
    // Enables Vite to resolve imports using path aliases.
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: "src", // This is the default
      // router.routesDirectory defaults to "routes", relative to srcDirectory
    }),
    viteReact(),
  ],
});

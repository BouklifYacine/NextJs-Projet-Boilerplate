// vite.config.ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ["@node-rs/argon2"],
  },
  optimizeDeps: {
    exclude: ["@node-rs/argon2"],
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

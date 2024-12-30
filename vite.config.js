import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      federation({
        name: "client_app",
        filename: "remoteEntry.js",
        exposes: {
          "./List": "./src/components/List.jsx",
          "./Input": "./src/components/Input.jsx",
        },
        shared: ["react"],
      }),
    ],
    build: {
      minify: mode === "production",
      target: mode === "production" ? "esnext" : "es2015",
      cssCodeSplit: mode === "production",
    },
  };
});

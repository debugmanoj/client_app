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
          "./TodoApp": "./src/App.jsx",
          "./Input": "./src/components/Input.jsx",
        },
        shared: ["react"],
      }),
    ],
    preview: {
      port: 4173, // Ensure preview runs only on port 4174
    },
    build: {
      minify: mode === "production",
      target: "esnext",  // Change this to esnext or es2020 to enable top-level await
      // target: mode === "production" ? "esnext" : "es2015",
      cssCodeSplit: mode === "production",
    },
  };
});

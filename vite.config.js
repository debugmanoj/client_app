import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import fs from "fs";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load package.json dynamically
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8")
  );

  // Dynamically create shared dependencies object
  const sharedDependencies = Object.keys(packageJson.dependencies).reduce(
    (acc, dep) => {
      acc[dep] = {
        singleton: true,
        requiredVersion: packageJson.dependencies[dep],
      };
      return acc;
    },
    {}
  );
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
        shared: ["react",'react-dom'],
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

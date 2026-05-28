import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createQwenMiddleware } from "./server/qwen/middleware.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "qwen-local-proxy",
        configureServer(server) {
          server.middlewares.use(createQwenMiddleware(env));
        }
      }
    ]
  };
});

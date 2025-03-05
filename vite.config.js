import { defineConfig } from "vite";

export default defineConfig({
  root: "./client", 
  server: {
    port: 4200, 
    open: true
  },
  plugins: [
    {
      name: "vite-server-start-message",
      configureServer(server) {
        server.httpServer?.on("listening", () => {
          console.log("🚀🚀 [JS WARS] - Client running at http://localhost:4200 🚀🚀");
        });
      },
    },
  ],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Listen on all IPv6 addresses (and IPv4 as a fallback)
    port: 8080, // Set the development server port
  },
  plugins: [
    react(), // Use the React plugin with SWC for faster builds
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Create an alias for the `src` directory
    },
  },
}));
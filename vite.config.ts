import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase the warning limit to 800kB to reduce noise in the build output
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
        // Configure manual chunks to better split the code
        manualChunks: {
          // Group React and related packages
          'vendor-react': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-scroll'
          ],
          // Group UI-related libraries
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'tailwindcss-animate'
          ],
          // Group animation libraries
          'vendor-animation': [
            'framer-motion',
            'lucide-react'
          ]
        }
      }
    }
  }
}));

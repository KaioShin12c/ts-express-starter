import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false, // Disable code splitting
  sourcemap: true, // Enable sourcemaps for debugging
  clean: true, // Clean the output directory (dist) before building
  minify: process.env.NODE_ENV === 'production', // Minify the output
  outDir: 'dist', // Output directory
  target: 'node20', // Target Node.js version
  format: 'cjs', // Output format
  platform: 'node', // Target platform
});

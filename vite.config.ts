import { resolve } from 'path';
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const isExampleBuild = process.env.BUILD_EXAMPLE === 'true';

  if (isExampleBuild) {
    // Configuration for building the example
    return {
      root: './examples/media-gallery',
      publicDir: '../../public',
      build: {
        outDir: '../../dist/examples/media-gallery',
        emptyOutDir: true,
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'examples/media-gallery/media-gallery.html'),
          },
        },
      },
      server: {
        port: 3000,
        open: true,
      },
    };
  }

  // Default configuration for library build
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'CMSContentModel',
        fileName: (format) => `cms-content-model.${format}.js`,
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        // Externalize dependencies that shouldn't be bundled
        external: [],
        output: {
          globals: {},
        },
      },
    },
  };
});

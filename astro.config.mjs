// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	vite: {
		build: {
			minify: 'esbuild',
			cssMinify: true,
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: [],
					},
				},
			},
		},
		optimizeDeps: {
			include: [],
		},
	},
});

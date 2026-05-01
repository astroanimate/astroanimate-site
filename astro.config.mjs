// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.astroanimate.com',
	integrations: [sitemap()],
	build: {
		format: 'directory',
	},
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

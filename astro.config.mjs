// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.astroanimate.com',
	integrations: [sitemap()],
	trailingSlash: "always",
	adapter: vercel(),
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

import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['svu']
	},
	ssr: {
		noExternal: ['svu']
	}
};

export default config;

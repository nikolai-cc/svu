import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['svu']
	},
	ssr: {
		noExternal: ['svu']
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['test/**/*.{test,spec}.ts'],
		setupFiles: ['./test/setup.ts']
	}
};

export default config;

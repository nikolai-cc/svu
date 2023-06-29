import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';

import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.svx'],
	preprocess: [mdsvex(), preprocess(), vitePreprocess({})],

	kit: {
		adapter: adapter(),
		alias: {
			$docs: 'src/routes/docs/'
		}
	}
};

export default config;

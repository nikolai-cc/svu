import { mdsvex } from 'mdsvex';

import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import postcssConfig from './postcss.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.svx'],
	preprocess: [
		mdsvex(),

		preprocess({
			postcss: postcssConfig
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$docs: 'src/routes/docs/'
		}
	}
};

export default config;

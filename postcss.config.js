import presetEnv from 'postcss-preset-env';

export default {
	plugins: [
		presetEnv({
			stage: 0,
			enableClientSidePolyfills: true
		})
	]
};

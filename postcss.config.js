import autoprefixer from 'autoprefixer';
import presetEnv from 'postcss-preset-env';

export const config = {
	plugins: [autoprefixer, presetEnv()]
};

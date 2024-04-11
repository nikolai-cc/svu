declare module 'svelte/elements' {
	export interface SvelteWindowAttributes {
		'on:!pushstate'?: (event: CustomEvent) => void;
		'on:!replacestate'?: (event: CustomEvent) => void;
	}
}

export {}; // ensure this is not an ambient module, else types will be overridden instead of augmented

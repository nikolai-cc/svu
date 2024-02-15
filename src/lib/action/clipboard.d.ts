declare namespace svelteHTML {
	interface HTMLAttributes {
		'on:!copy'?: (event: CustomEvent<string>) => void;
		'on:!cut'?: (event: CustomEvent<string>) => void;
		'on:!paste'?: (event: CustomEvent<string>) => void;
	}
}

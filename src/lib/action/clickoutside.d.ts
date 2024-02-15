declare namespace svelteHTML {
	interface HTMLAttributes {
		'on:!clickoutside'?: (event: CustomEvent<Event>) => void;
	}
}

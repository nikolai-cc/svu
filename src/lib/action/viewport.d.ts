declare namespace svelte.JSX {
	interface HTMLProps<T> {
		'onviewport:enter'?: (event: CustomEvent<{}>) => void;
		'onviewport:leave'?: (event: CustomEvent<{}>) => void;
	}
}

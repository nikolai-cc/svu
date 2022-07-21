declare namespace svelte.JSX {
	interface HTMLProps<T> {
		'ondrag:start'?: (event: CustomEvent<{}>) => void;
		'ondrag:update'?: (event: CustomEvent<{}>) => void;
		'ondrag:end'?: (event: CustomEvent<{}>) => void;
	}
}

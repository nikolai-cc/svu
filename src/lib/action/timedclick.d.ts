declare namespace svelte.JSX {
	interface HTMLProps<T> {
		ontimedclick?: (event: CustomEvent<{}>) => void;
		'ontimedclick:armed'?: (event: CustomEvent<{}>) => void;
		'ontimedclick:aborted'?: (event: CustomEvent<{}>) => void;
	}
}

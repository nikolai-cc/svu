declare namespace svelte.JSX {
	interface HTMLProps<T> {
		onresize?: (event: CustomEvent<{}>) => void;
	}
}

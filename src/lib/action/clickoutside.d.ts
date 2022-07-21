declare namespace svelte.JSX {
	interface HTMLProps<T> {
		onclickoutside?: (event: CustomEvent<{}>) => void;
	}
}

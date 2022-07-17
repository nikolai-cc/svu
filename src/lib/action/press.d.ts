declare namespace svelte.JSX {
    interface HTMLProps<T> {
      onpress?: (event: CustomEvent<{}>) => void;
    }
  }
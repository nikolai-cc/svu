/**
 * A convenience function that returns removeEventListener for the event we've just added.
*/
export const listen = (node: EventTarget, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => {
  node.addEventListener(type, listener, options);
  return () => node.removeEventListener(type, listener, options);
};

export const unlisten = (node: EventTarget, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => node.removeEventListener(type, listener, options)
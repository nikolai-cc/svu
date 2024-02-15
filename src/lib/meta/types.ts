/**
 * Commonly used types.
 */

export interface Coords {
	x: number;
	y: number;
}

export interface Coords3D extends Coords {
	z: number;
}

export interface Size {
	width: number;
	height: number;
}

export interface Size3D extends Size {
	depth: number;
}

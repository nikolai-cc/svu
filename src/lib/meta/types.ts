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

export interface Scale {
	scaleX: number;
	scaleY: number;
}

export interface Scale3D extends Scale {
	scaleZ: number;
}

export interface Rect extends Coords, Size {}

export interface Cuboid extends Coords3D, Size3D {}

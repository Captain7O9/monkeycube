export type Color = 'white' | 'yellow' | 'green' | 'blue' | 'red' | 'orange';

/**
 * Represents a face of a Rubik's Cube.
 * Colors are ordered as follows:
 * ```
 * 1 2 3
 * 4 5 6
 * 7 8 9
 * ```
 */
export type Face = [[Color, Color, Color], [Color, Color, Color], [Color, Color, Color]];
/**
 * Represents a Rubik's Cube.
 * Faces are ordered as follows:
 * ```
 *  - 0 - -
 *  1 2 3 4
 *  - 5 - -
 * ```
 */
export type Cube = [Face, Face, Face, Face, Face, Face];

export type TopFace = [
	// 																																													Layout:
	[null, Color | 'empty', Color | 'empty', Color | 'empty', null], // 												.000. <- Side Faces
	[Color | 'empty', Color | 'empty', Color | 'empty', Color | 'empty', Color | 'empty'], // 	00000
	[Color | 'empty', Color | 'empty', Color | 'empty', Color | 'empty', Color | 'empty'], // 	00000
	[Color | 'empty', Color | 'empty', Color | 'empty', Color | 'empty', Color | 'empty'], // 	00000
	[null, Color | 'empty', Color | 'empty', Color | 'empty', null] // 													.000.
];

export type Move =
	| 'U'
	| 'U2'
	| "U'"
	| 'D'
	| 'D2'
	| "D'"
	| 'L'
	| 'L2'
	| "L'"
	| 'R'
	| 'R2'
	| "R'"
	| 'F'
	| 'F2'
	| "F'"
	| 'B'
	| 'B2'
	| "B'";

export type Theme = {
	[key: string]: string;
};

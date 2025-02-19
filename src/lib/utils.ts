/**
 * Converts milliseconds to an object with minutes, seconds and milliseconds.
 * ```ts
 * convertTime(12345)
 * // { minutes: 0, seconds: 12, milliseconds: 345 }
 * ```
 *
 * @param timeInMilliseconds
 *
 * @returns Object with minutes, seconds and milliseconds.
 */
export function convertTime(timeInMilliseconds: number): {
	minutes: number;
	seconds: number;
	milliseconds: number;
} {
	const minutes = Math.floor(timeInMilliseconds / 60000);
	const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
	const milliseconds = timeInMilliseconds % 1000;
	return { minutes, seconds, milliseconds };
}

/**
 * ```ts
 * formatTimeToString(12345)
 * // "12.345"
 * ```
 *
 * @param timeInMilliseconds
 *
 * @returns Time in the format mm:ss.SSS
 */
export function formatTimeToString(timeInMilliseconds: number): string {
	const { minutes, seconds, milliseconds } = convertTime(timeInMilliseconds);

	const decimals = milliseconds.toString().padStart(3, '0').padEnd(3, '0');
	const displaySeconds = minutes > 0 ? seconds.toString().padStart(2, '0') : seconds;
	return `${minutes > 0 ? minutes : ''}${minutes > 0 ? ':' : ''}${displaySeconds}.${decimals}`;
}

/**
 * ```ts
 * formatTime(83456) // 60000 + 23000 + 00456
 * // { minutes: '1', seconds: '23', decimals: '456' }
 * ```
 * Handles cases like 0:12.345, 1:00.000, 0:01.010
 *
 * @param timeInMilliseconds Time in milliseconds.
 * @returns Object with minutes, seconds and decimals.
 */
export function formatTime(timeInMilliseconds: number): {
	minutes: string;
	seconds: string;
	decimals: string;
} {
	const { minutes, seconds, milliseconds } = convertTime(timeInMilliseconds);

	const minutesString = minutes === 0 ? '' : minutes.toString();
	const secondsString = minutes === 0 ? seconds.toString() : seconds.toString().padStart(2, '0');
	const decimalsString = milliseconds.toString().padStart(3, '0').padEnd(3, '0');

	return { minutes: minutesString, seconds: secondsString, decimals: decimalsString };
}

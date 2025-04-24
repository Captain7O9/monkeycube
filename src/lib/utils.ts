import type { Time } from '$lib/server/db/schema';

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

/**
 * Calculates the average of a subset of times from an array of `Time` objects. The `times` array should
 * be sorted in descending order based on the `date` property.
 *
 * The function supports three modes of operation:
 * 1. If `of` is 0, it calculates the average of all times in the array.
 * 2. If `index` is not provided, it calculates the average of the last `of` times in the array.
 * 3. If `index` is provided, it calculates the average of the last `of` times up to the given `index`.
 *
 * @param of - The number of times to include in the average calculation. If 0, all times are included.
 * @param times - An array of `Time` objects, each containing a `time` property in milliseconds.
 * @param index - (Optional) The index up to which the average is calculated. If not provided, the calculation starts from the end of the array.
 * @returns The average of the selected times as a number.
 */
export function getAverage({ of, times, index }: { of: number; times: Time[]; index: number }) {
	let sum = 0;

	if (of === 0) {
		times.forEach(({ time }) => {
			sum += time;
		});
		return sum / times.length;
	}

	times.forEach(({ time }, i) => {
		if (i >= index && i < index + of) {
			sum += time;
		}
	});

	// Check if of does not exceed the remaining times
	const divideBy = times.length - index <= of ? times.length - index : of;

	return sum / divideBy;
}

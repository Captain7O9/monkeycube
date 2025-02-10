import { PUBLIC_API_URL as API_URL } from '$env/static/public';
import type { Move } from '$lib/types';

/**
 * Converts milliseconds to an object with minutes, seconds and milliseconds.
 * ```ts
 * convertTime(12345)
 * // { minutes: 0, seconds: 12, milliseconds: 345 }
 * ```
 *
 * @param tineInMilliseconds
 *
 * @returns Object with minutes, seconds and milliseconds.
 */
export function convertTime(tineInMilliseconds: number): {
  minutes: number;
  seconds: number;
  milliseconds: number;
} {
  const minutes = Math.floor(tineInMilliseconds / 60000);
  const seconds = Math.floor((tineInMilliseconds % 60000) / 1000);
  const milliseconds = tineInMilliseconds % 1000;
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
 * Fetches data from the API.
 * @param endpoint API endpoint to fetch.
 * @param options Request options.
 * @param sendToken Whether to send the user token.
 * @param excludedErrors List of status codes to ignore.
 *
 * @returns Promise containing the response content and status code.
 */
export async function apiFetch({
  endpoint,
  options = {},
  sendToken = false,
  excludedErrors = []
}: {
  endpoint: string;
  options?: RequestInit;
  sendToken?: boolean;
  excludedErrors?: number[];
}) {
  if (sendToken) {
    options.credentials = 'include';
  }

  const request = {
    ...options,
    headers: {
      ...options.headers
    }
  };

  const url = `${API_URL}${endpoint}`;
  console.info(`Fetching ${url} with options:`, request);

  const response = await fetch(url, request);

  if (excludedErrors.includes(response.status)) {
    return { content: null, status: response.status };
  } else if (response.ok) {
    return { content: await response.json(), status: response.status };
  } else {
    const error = await response.json();
    throw new Error(error.detail || 'Request failed');
  }
}

export function isMove(input: string): input is Move {
  return [
    'U',
    'U2',
    "U'",
    'R',
    'R2',
    "R'",
    'F',
    'F2',
    "F'",
    'D',
    'D2',
    "D'",
    'L',
    'L2',
    "L'",
    'B',
    'B2',
    "B'"
  ].includes(input);
}

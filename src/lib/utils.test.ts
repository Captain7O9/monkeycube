import { expect, it } from 'vitest';
import { convertTime, formatTime, formatTimeToString, getAverage } from '$lib/utils';
import type { Time } from '$lib/server/db/schema';

it('can convertTime', () => {
	expect(convertTime(0)).toStrictEqual({ minutes: 0, seconds: 0, milliseconds: 0 });
	expect(convertTime(12345)).toStrictEqual({ minutes: 0, seconds: 12, milliseconds: 345 });
	expect(convertTime(60000)).toStrictEqual({ minutes: 1, seconds: 0, milliseconds: 0 });
	expect(convertTime(1010)).toStrictEqual({ minutes: 0, seconds: 1, milliseconds: 10 });
});

it('can formatTimeToString', () => {
	expect(formatTimeToString(0)).toBe('0.000');
	expect(formatTimeToString(12345)).toBe('12.345');
	expect(formatTimeToString(60000)).toBe('1:00.000');
	expect(formatTimeToString(1010)).toBe('1.010');
});

it('can formatTime', () => {
	expect(formatTime(0)).toStrictEqual({ minutes: '', seconds: '0', decimals: '000' });
	expect(formatTime(12345)).toStrictEqual({ minutes: '', seconds: '12', decimals: '345' });
	expect(formatTime(60000)).toStrictEqual({ minutes: '1', seconds: '00', decimals: '000' });
	expect(formatTime(1010)).toStrictEqual({ minutes: '', seconds: '1', decimals: '010' });
});

it('can getAverage', () => {
	const times: Time[] = [
		{
			date: new Date(),
			id: 1,
			userId: 'user',
			time: 1000,
			isPlusTwo: false,
			isDNF: false,
			scramble: '',
			event: ''
		},
		{
			date: new Date(),
			id: 2,
			userId: 'user',
			time: 2000,
			isPlusTwo: false,
			isDNF: false,
			scramble: '',
			event: ''
		},
		{
			date: new Date(),
			id: 3,
			userId: 'user',
			time: 3000,
			isPlusTwo: false,
			isDNF: false,
			scramble: '',
			event: ''
		},
		{
			date: new Date(),
			id: 4,
			userId: 'user',
			time: 4000,
			isPlusTwo: false,
			isDNF: false,
			scramble: '',
			event: ''
		},
		{
			date: new Date(),
			id: 5,
			userId: 'user',
			time: 5000,
			isPlusTwo: false,
			isDNF: false,
			scramble: '',
			event: ''
		}
	];
	expect(getAverage({ of: 0, times, index: 0 })).toBe(3000);
	expect(getAverage({ of: 3, times, index: 0 })).toBe(2000);
	expect(getAverage({ of: 2, times, index: 3 })).toBe(4500);
	expect(getAverage({ of: 3, times, index: 1 })).toBe(3000);
	expect(getAverage({ of: 1, times, index: 0 })).toBe(1000);
	expect(getAverage({ of: 5, times, index: 4 })).toBe(5000);
});

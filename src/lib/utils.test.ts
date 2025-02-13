import { expect, it } from 'vitest';
import { convertTime, formatTime, formatTimeToString } from '$lib/utils';

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

import type { TopFace } from '$lib/types';

interface Algs {
	attributes: {
		name: string;
		group: string;
		alg: string;
	};
	icon: TopFace;
}

export const olls: Algs[] = [
	{
		attributes: {
			name: '21',
			group: 'cross',
			alg: "R U2 R' U' R U R' U' R U' R'"
		},
		icon: [
			[null, 'yellow', 'empty', 'yellow', null],
			['empty', 'empty', 'yellow', 'empty', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'empty'],
			[null, 'yellow', 'empty', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '22',
			group: 'cross',
			alg: "R U2 R2 U' R2 U' R2 U2 R"
		},
		icon: [
			[null, 'empty', 'empty', 'yellow', null],
			['yellow', 'empty', 'yellow', 'empty', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'empty', 'empty'],
			[null, 'empty', 'empty', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '23',
			group: 'cross',
			alg: "R2 D R' U2 R D' R' U2 R'"
		},
		icon: [
			[null, 'empty', 'empty', 'empty', null],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'empty'],
			[null, 'yellow', 'empty', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '24',
			group: 'cross',
			alg: "r U R' U' r' F R F'"
		},
		icon: [
			[null, 'yellow', 'empty', 'empty', null],
			['empty', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'yellow', 'yellow', 'empty'],
			[null, 'yellow', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '25',
			group: 'cross',
			alg: "F l' U' L U R U' r'"
		},
		icon: [
			[null, 'empty', 'empty', 'empty', null],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'yellow', 'yellow', 'empty'],
			[null, 'yellow', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '26',
			group: 'cross',
			alg: "R U2 R' U' R U' R'"
		},
		icon: [
			[null, 'empty', 'empty', 'empty', null],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'yellow'],
			[null, 'yellow', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '27',
			group: 'cross',
			alg: "R U R' U R U2 R'"
		},
		icon: [
			[null, 'yellow', 'empty', 'empty', null],
			['empty', 'empty', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'empty'],
			[null, 'empty', 'empty', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '28',
			group: 'corners oriented',
			alg: "r U R' U' r' R U R U' R'"
		},
		icon: [
			[null, 'empty', 'empty', 'empty', null],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '57',
			group: 'corners oriented',
			alg: "(R U R' U') M' (U R U' r')"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '1',
			group: 'dot',
			alg: "R U2 (R2 F R F') U2 (R' F R F')"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['yellow', 'empty', 'empty', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'empty', 'empty', 'yellow'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '2',
			group: 'dot',
			alg: "(F R U R' U' F') (f R U R' U' f')"
		},
		icon: [
			[null, 'empty', 'yellow', 'yellow', null],
			['yellow', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'empty', 'empty', 'empty'],
			[null, 'empty', 'yellow', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '3',
			group: 'dot',
			alg: "(f R U R' U' f') U' (F R U R' U' F')"
		},
		icon: [
			[null, 'yellow', 'yellow', 'empty', null],
			['empty', 'empty', 'empty', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '4',
			group: 'dot',
			alg: "(f R U R' U' f') U (F R U R' U' F')"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['yellow', 'empty', 'empty', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['empty', 'empty', 'empty', 'empty', 'yellow'],
			[null, 'yellow', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '17',
			group: 'dot',
			alg: "R U R' U (R' F R F') U2 (R' F R F')"
		},
		icon: [
			[null, 'empty', 'yellow', 'yellow', null],
			['empty', 'yellow', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '18',
			group: 'dot',
			alg: "r U R' U R U2 r2 U' R U' R' U2 r"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'empty', 'empty', 'yellow'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '19',
			group: 'dot',
			alg: "M U (R U R' U') M' (R' F R F')"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'empty', 'empty', 'yellow'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '20',
			group: 'dot',
			alg: "(r U R' U') M2 (U R U' R') U' M'"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '43',
			group: 'p shape',
			alg: "f' L' U' L U f"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['empty', 'yellow', 'empty', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			[null, 'empty', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '44',
			group: 'p shape',
			alg: "f R U R' U' f'"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['yellow', 'empty', 'empty', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			[null, 'empty', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '33',
			group: 't shape',
			alg: "(R U R' U') (R' F R F')"
		},
		icon: [
			[null, 'yellow', 'yellow', 'empty', null],
			['empty', 'empty', 'empty', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'yellow', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '45',
			group: 't shape',
			alg: "F R U R' U' F'"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['yellow', 'empty', 'empty', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '47',
			group: 'small l shape',
			alg: "F' (L' U' L U) (L' U' L U) F"
		},
		icon: [
			[null, 'yellow', 'empty', 'empty', null],
			['empty', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'yellow'],
			[null, 'yellow', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '48',
			group: 'small l shape',
			alg: "F (R U R' U') (R U R' U') F'"
		},
		icon: [
			[null, 'empty', 'empty', 'yellow', null],
			['yellow', 'empty', 'yellow', 'empty', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'empty', 'empty', 'empty'],
			[null, 'empty', 'yellow', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '39',
			group: 'big lightning bolt',
			alg: "L F' (L' U' L U) F U' L'"
		},
		icon: [
			[null, 'yellow', 'yellow', 'empty', null],
			['empty', 'empty', 'empty', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'empty', 'empty', 'yellow'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '40',
			group: 'big lightning bolt',
			alg: "R' F (R U R' U') F' U R"
		},
		icon: [
			[null, 'empty', 'yellow', 'yellow', null],
			['empty', 'yellow', 'empty', 'empty', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '34',
			group: 'c shape',
			alg: "R U R2 U' R' F R U R U' F'"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['yellow', 'empty', 'empty', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '46',
			group: 'c shape',
			alg: "R' U' R' F R F' U R"
		},
		icon: [
			[null, 'empty', 'empty', 'empty', null],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			[null, 'empty', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '5',
			group: 'square',
			alg: "r' U2 R U R' U r"
		},
		icon: [
			[null, 'yellow', 'yellow', 'empty', null],
			['empty', 'empty', 'empty', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			[null, 'empty', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '6',
			group: 'square',
			alg: "r U2 R' U' R U' r'"
		},
		icon: [
			[null, 'empty', 'empty', 'empty', null],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'yellow'],
			[null, 'yellow', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '7',
			group: 'small lightning bolt',
			alg: "r U R' U R U2 r'"
		},
		icon: [
			[null, 'yellow', 'empty', 'empty', null],
			['empty', 'empty', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'empty', 'empty', 'empty'],
			[null, 'empty', 'yellow', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '8',
			group: 'small lightning bolt',
			alg: "r' U' R U' R' U2 r"
		},
		icon: [
			[null, 'empty', 'yellow', 'yellow', null],
			['empty', 'yellow', 'empty', 'empty', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'empty', 'yellow', 'empty', 'yellow'],
			[null, 'yellow', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '11',
			group: 'small lightning bolt',
			alg: "r U R' U (R' F R F') R U2 r'"
		},
		icon: [
			[null, 'yellow', 'empty', 'empty', null],
			['empty', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'empty', 'empty', 'empty'],
			[null, 'empty', 'yellow', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '12',
			group: 'small lightning bolt',
			alg: "(F R U R' U' F') U (F R U R' U' F')"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['yellow', 'empty', 'empty', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'yellow'],
			[null, 'yellow', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '35',
			group: 'fish shape',
			alg: "R U2 (R2 F R F') R U2 R'"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['empty', 'yellow', 'empty', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'yellow', 'yellow', 'empty'],
			[null, 'yellow', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '37',
			group: 'fish shape',
			alg: "F R U' R' U' R U R' F'"
		},
		icon: [
			[null, 'empty', 'empty', 'empty', null],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'yellow', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '9',
			group: 'fish shape',
			alg: "(R U R' U') R' F R2 U R' U' F'"
		},
		icon: [
			[null, 'empty', 'empty', 'yellow', null],
			['yellow', 'empty', 'yellow', 'empty', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'yellow', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '10',
			group: 'fish shape',
			alg: "R U R' U (R' F R F') R U2 R'"
		},
		icon: [
			[null, 'yellow', 'yellow', 'empty', null],
			['empty', 'empty', 'empty', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'empty', 'empty'],
			[null, 'empty', 'empty', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '13',
			group: 'l shape',
			alg: "F U R U2 R' U' R U R' F'"
		},
		icon: [
			[null, 'yellow', 'yellow', 'empty', null],
			['empty', 'empty', 'empty', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'empty', 'empty', 'empty'],
			[null, 'empty', 'yellow', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '14',
			group: 'l shape',
			alg: "R' F R U R' F' R F U' F'"
		},
		icon: [
			[null, 'empty', 'yellow', 'yellow', null],
			['yellow', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'yellow', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '15',
			group: 'l shape',
			alg: "r' U' r (R' U' R U) r' U r"
		},
		icon: [
			[null, 'yellow', 'yellow', 'empty', null],
			['empty', 'empty', 'empty', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '16',
			group: 'l shape',
			alg: "r U r' (R U R' U') r U' r'"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['yellow', 'empty', 'empty', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'yellow'],
			[null, 'yellow', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '51',
			group: 'i shape',
			alg: "F (U R U' R') (U R U' R') F'"
		},
		icon: [
			[null, 'yellow', 'yellow', 'empty', null],
			['empty', 'empty', 'empty', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'yellow'],
			[null, 'yellow', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '52',
			group: 'i shape',
			alg: "R U R' U R d' R U' R' F'"
		},
		icon: [
			[null, 'yellow', 'empty', 'empty', null],
			['empty', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['empty', 'empty', 'yellow', 'empty', 'yellow'],
			[null, 'yellow', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '55',
			group: 'i shape',
			alg: "R U2 R2 U' R U' R' U2 F R F'"
		},
		icon: [
			[null, 'empty', 'empty', 'empty', null],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			[null, 'empty', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '56',
			group: 'i shape',
			alg: "(r' U' r) U' R' U R U' R' U R (r' U r)"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['yellow', 'empty', 'empty', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'yellow'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '31',
			group: 'p shape',
			alg: "R' U' F U R U' R' F' R"
		},
		icon: [
			[null, 'yellow', 'empty', 'empty', null],
			['empty', 'empty', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'yellow', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '32',
			group: 'p shape',
			alg: "R U B' U' R' U R B R'"
		},
		icon: [
			[null, 'yellow', 'yellow', 'empty', null],
			['empty', 'empty', 'empty', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'empty', 'yellow', 'yellow', 'empty'],
			[null, 'yellow', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '36',
			group: 'w shape',
			alg: "(R' U' R U') (R' U R U) R B' R' B"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['empty', 'yellow', 'empty', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'empty', 'yellow', 'yellow', 'empty'],
			[null, 'yellow', 'empty', 'empty', null]
		]
	},
	{
		attributes: {
			name: '38',
			group: 'w shape',
			alg: "(R U R' U) R U' R' U' (R' F R F')"
		},
		icon: [
			[null, 'yellow', 'empty', 'empty', null],
			['empty', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'empty', 'empty', 'yellow'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '49',
			group: 'small l shape',
			alg: "r U' r2 U r2 U r2 U' r"
		},
		icon: [
			[null, 'empty', 'empty', 'yellow', null],
			['yellow', 'empty', 'yellow', 'empty', 'empty'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty'],
			[null, 'empty', 'yellow', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '50',
			group: 'small l shape',
			alg: "r' U r2 U' r2 U' r2 U r'"
		},
		icon: [
			[null, 'empty', 'yellow', 'yellow', null],
			['yellow', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'empty', 'empty'],
			[null, 'empty', 'empty', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '53',
			group: 'small l shape',
			alg: "r' U' R U' R' U R U' R' U2 r"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['yellow', 'empty', 'empty', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'yellow', 'empty', 'empty'],
			[null, 'empty', 'empty', 'yellow', null]
		]
	},
	{
		attributes: {
			name: '54',
			group: 'small l shape',
			alg: "r U R' U R U' R' U R U2 r'"
		},
		icon: [
			[null, 'empty', 'empty', 'empty', null],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['yellow', 'empty', 'yellow', 'yellow', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'yellow'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '29',
			group: 'awkward shape',
			alg: "(R U R' U') R U' R' (F' U' F) R U R'"
		},
		icon: [
			[null, 'yellow', 'empty', 'empty', null],
			['empty', 'empty', 'yellow', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'empty', 'empty', 'yellow', 'empty'],
			[null, 'yellow', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '30',
			group: 'awkward shape',
			alg: "F U (R U2 R' U') (R U2 R' U') F'"
		},
		icon: [
			[null, 'empty', 'empty', 'empty', null],
			['yellow', 'empty', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '41',
			group: 'awkward shape',
			alg: "(R U R' U R U2 R') (F R U R' U' F')"
		},
		icon: [
			[null, 'yellow', 'empty', 'yellow', null],
			['empty', 'empty', 'yellow', 'empty', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			[null, 'empty', 'yellow', 'empty', null]
		]
	},
	{
		attributes: {
			name: '42',
			group: 'awkward shape',
			alg: "(R' U' R U' R' U2 R) (F R U R' U' F')"
		},
		icon: [
			[null, 'empty', 'yellow', 'empty', null],
			['empty', 'yellow', 'empty', 'yellow', 'empty'],
			['empty', 'yellow', 'yellow', 'empty', 'yellow'],
			['empty', 'empty', 'yellow', 'empty', 'empty'],
			[null, 'yellow', 'empty', 'yellow', null]
		]
	}
];

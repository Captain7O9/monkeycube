import { beforeEach, describe, expect, it } from 'vitest';
import { CubeInstance } from '$lib/cube';
import type { Move } from '$lib/types';
import { Alg } from 'cubing/alg';

const EXPECTED_CUBE = {
  default: new CubeInstance().default,
  U: [
    [
      ['white', 'white', 'white'],
      ['white', 'white', 'white'],
      ['white', 'white', 'white']
    ],
    [
      ['green', 'green', 'green'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange']
    ],
    [
      ['red', 'red', 'red'],
      ['green', 'green', 'green'],
      ['green', 'green', 'green']
    ],
    [
      ['blue', 'blue', 'blue'],
      ['red', 'red', 'red'],
      ['red', 'red', 'red']
    ],
    [
      ['orange', 'orange', 'orange'],
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue']
    ],
    [
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow']
    ]
  ],
  "U'": [
    [
      ['white', 'white', 'white'],
      ['white', 'white', 'white'],
      ['white', 'white', 'white']
    ],
    [
      ['blue', 'blue', 'blue'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange']
    ],
    [
      ['orange', 'orange', 'orange'],
      ['green', 'green', 'green'],
      ['green', 'green', 'green']
    ],
    [
      ['green', 'green', 'green'],
      ['red', 'red', 'red'],
      ['red', 'red', 'red']
    ],
    [
      ['red', 'red', 'red'],
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue']
    ],
    [
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow']
    ]
  ],
  R: [
    [
      ['white', 'white', 'green'],
      ['white', 'white', 'green'],
      ['white', 'white', 'green']
    ],
    [
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange']
    ],
    [
      ['green', 'green', 'yellow'],
      ['green', 'green', 'yellow'],
      ['green', 'green', 'yellow']
    ],
    [
      ['red', 'red', 'red'],
      ['red', 'red', 'red'],
      ['red', 'red', 'red']
    ],
    [
      ['white', 'blue', 'blue'],
      ['white', 'blue', 'blue'],
      ['white', 'blue', 'blue']
    ],
    [
      ['yellow', 'yellow', 'blue'],
      ['yellow', 'yellow', 'blue'],
      ['yellow', 'yellow', 'blue']
    ]
  ],
  "R'": [
    [
      ['white', 'white', 'blue'],
      ['white', 'white', 'blue'],
      ['white', 'white', 'blue']
    ],
    [
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange']
    ],
    [
      ['green', 'green', 'white'],
      ['green', 'green', 'white'],
      ['green', 'green', 'white']
    ],
    [
      ['red', 'red', 'red'],
      ['red', 'red', 'red'],
      ['red', 'red', 'red']
    ],
    [
      ['yellow', 'blue', 'blue'],
      ['yellow', 'blue', 'blue'],
      ['yellow', 'blue', 'blue']
    ],
    [
      ['yellow', 'yellow', 'green'],
      ['yellow', 'yellow', 'green'],
      ['yellow', 'yellow', 'green']
    ]
  ],
  D: [
    [
      ['white', 'white', 'white'],
      ['white', 'white', 'white'],
      ['white', 'white', 'white']
    ],
    [
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['blue', 'blue', 'blue']
    ],
    [
      ['green', 'green', 'green'],
      ['green', 'green', 'green'],
      ['orange', 'orange', 'orange']
    ],
    [
      ['red', 'red', 'red'],
      ['red', 'red', 'red'],
      ['green', 'green', 'green']
    ],
    [
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue'],
      ['red', 'red', 'red']
    ],
    [
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow']
    ]
  ],
  "D'": [
    [
      ['white', 'white', 'white'],
      ['white', 'white', 'white'],
      ['white', 'white', 'white']
    ],
    [
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['green', 'green', 'green']
    ],
    [
      ['green', 'green', 'green'],
      ['green', 'green', 'green'],
      ['red', 'red', 'red']
    ],
    [
      ['red', 'red', 'red'],
      ['red', 'red', 'red'],
      ['blue', 'blue', 'blue']
    ],
    [
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue'],
      ['orange', 'orange', 'orange']
    ],
    [
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow']
    ]
  ],
  L: [
    [
      ['blue', 'white', 'white'],
      ['blue', 'white', 'white'],
      ['blue', 'white', 'white']
    ],
    [
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange']
    ],
    [
      ['white', 'green', 'green'],
      ['white', 'green', 'green'],
      ['white', 'green', 'green']
    ],
    [
      ['red', 'red', 'red'],
      ['red', 'red', 'red'],
      ['red', 'red', 'red']
    ],
    [
      ['blue', 'blue', 'yellow'],
      ['blue', 'blue', 'yellow'],
      ['blue', 'blue', 'yellow']
    ],
    [
      ['green', 'yellow', 'yellow'],
      ['green', 'yellow', 'yellow'],
      ['green', 'yellow', 'yellow']
    ]
  ],
  "L'": [
    [
      ['green', 'white', 'white'],
      ['green', 'white', 'white'],
      ['green', 'white', 'white']
    ],
    [
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange']
    ],
    [
      ['yellow', 'green', 'green'],
      ['yellow', 'green', 'green'],
      ['yellow', 'green', 'green']
    ],
    [
      ['red', 'red', 'red'],
      ['red', 'red', 'red'],
      ['red', 'red', 'red']
    ],
    [
      ['blue', 'blue', 'white'],
      ['blue', 'blue', 'white'],
      ['blue', 'blue', 'white']
    ],
    [
      ['blue', 'yellow', 'yellow'],
      ['blue', 'yellow', 'yellow'],
      ['blue', 'yellow', 'yellow']
    ]
  ],
  F: [
    [
      ['white', 'white', 'white'],
      ['white', 'white', 'white'],
      ['orange', 'orange', 'orange']
    ],
    [
      ['orange', 'orange', 'yellow'],
      ['orange', 'orange', 'yellow'],
      ['orange', 'orange', 'yellow']
    ],
    [
      ['green', 'green', 'green'],
      ['green', 'green', 'green'],
      ['green', 'green', 'green']
    ],
    [
      ['white', 'red', 'red'],
      ['white', 'red', 'red'],
      ['white', 'red', 'red']
    ],
    [
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue']
    ],
    [
      ['red', 'red', 'red'],
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow']
    ]
  ],
  "F'": [
    [
      ['white', 'white', 'white'],
      ['white', 'white', 'white'],
      ['red', 'red', 'red']
    ],
    [
      ['orange', 'orange', 'white'],
      ['orange', 'orange', 'white'],
      ['orange', 'orange', 'white']
    ],
    [
      ['green', 'green', 'green'],
      ['green', 'green', 'green'],
      ['green', 'green', 'green']
    ],
    [
      ['yellow', 'red', 'red'],
      ['yellow', 'red', 'red'],
      ['yellow', 'red', 'red']
    ],
    [
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue']
    ],
    [
      ['orange', 'orange', 'orange'],
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow']
    ]
  ],
  B: [
    [
      ['red', 'red', 'red'],
      ['white', 'white', 'white'],
      ['white', 'white', 'white']
    ],
    [
      ['white', 'orange', 'orange'],
      ['white', 'orange', 'orange'],
      ['white', 'orange', 'orange']
    ],
    [
      ['green', 'green', 'green'],
      ['green', 'green', 'green'],
      ['green', 'green', 'green']
    ],
    [
      ['red', 'red', 'yellow'],
      ['red', 'red', 'yellow'],
      ['red', 'red', 'yellow']
    ],
    [
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue']
    ],
    [
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow'],
      ['orange', 'orange', 'orange']
    ]
  ],
  "B'": [
    [
      ['orange', 'orange', 'orange'],
      ['white', 'white', 'white'],
      ['white', 'white', 'white']
    ],
    [
      ['yellow', 'orange', 'orange'],
      ['yellow', 'orange', 'orange'],
      ['yellow', 'orange', 'orange']
    ],
    [
      ['green', 'green', 'green'],
      ['green', 'green', 'green'],
      ['green', 'green', 'green']
    ],
    [
      ['red', 'red', 'white'],
      ['red', 'red', 'white'],
      ['red', 'red', 'white']
    ],
    [
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue']
    ],
    [
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow'],
      ['red', 'red', 'red']
    ]
  ],
  scramble: [
    [
      ['orange', 'white', 'yellow'],
      ['blue', 'white', 'white'],
      ['blue', 'white', 'white']
    ],
    [
      ['green', 'orange', 'yellow'],
      ['blue', 'orange', 'orange'],
      ['red', 'green', 'red']
    ],
    [
      ['orange', 'orange', 'green'],
      ['green', 'green', 'orange'],
      ['blue', 'red', 'white']
    ],
    [
      ['red', 'blue', 'red'],
      ['yellow', 'red', 'red'],
      ['orange', 'yellow', 'white']
    ],
    [
      ['green', 'red', 'yellow'],
      ['green', 'blue', 'red'],
      ['green', 'yellow', 'blue']
    ],
    [
      ['yellow', 'yellow', 'blue'],
      ['white', 'yellow', 'blue'],
      ['white', 'green', 'orange']
    ]
  ]
};

const cube = new CubeInstance();
beforeEach(() => {
  cube.reset();
});

it('is created with default state', () => {
  expect(cube.state).toStrictEqual(EXPECTED_CUBE.default);
});

it('can reset to default state', () => {
  cube.state[0][0][0] = 'red';
  expect(cube.state).not.toStrictEqual(EXPECTED_CUBE.default);
  cube.reset();
  expect(cube.state).toStrictEqual(EXPECTED_CUBE.default);
});

describe('Test moves', () => {
  it.for([
    { move: 'U', expected: EXPECTED_CUBE['U'] },
    { move: "U'", expected: EXPECTED_CUBE["U'"] },
    { move: 'R', expected: EXPECTED_CUBE['R'] },
    { move: "R'", expected: EXPECTED_CUBE["R'"] },
    { move: 'D', expected: EXPECTED_CUBE['D'] },
    { move: "D'", expected: EXPECTED_CUBE["D'"] },
    { move: 'L', expected: EXPECTED_CUBE['L'] },
    { move: "L'", expected: EXPECTED_CUBE["L'"] },
    { move: 'F', expected: EXPECTED_CUBE['F'] },
    { move: "F'", expected: EXPECTED_CUBE["F'"] },
    { move: 'B', expected: EXPECTED_CUBE['B'] },
    { move: "B'", expected: EXPECTED_CUBE["B'"] }
  ])('can do $move', ({ move, expected }) => {
    expect(cube.state).toStrictEqual(EXPECTED_CUBE.default);
    cube.move(move as Move);
    expect(cube.state).toStrictEqual(expected);
  });
});

it('can do moves from Alg', () => {
  const scramble = new Alg("R' F2 D2 L2 F2 U2 F2 R' F2 L F2 U L' R D U' B U F2 R2");
  expect(cube.state).toStrictEqual(EXPECTED_CUBE.default);
  cube.doMoves(scramble);
  expect(cube.state).toStrictEqual(EXPECTED_CUBE.scramble);
});

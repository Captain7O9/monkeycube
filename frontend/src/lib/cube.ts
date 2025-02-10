import type { Color, Cube, Face, Move } from '$lib/types';
import type { Alg } from 'cubing/alg';

const defaultCube: Cube = [
  [
    ['white', 'white', 'white'],
    ['white', 'white', 'white'],
    ['white', 'white', 'white']
  ],
  [
    ['orange', 'orange', 'orange'],
    ['orange', 'orange', 'orange'],
    ['orange', 'orange', 'orange']
  ],
  [
    ['green', 'green', 'green'],
    ['green', 'green', 'green'],
    ['green', 'green', 'green']
  ],
  [
    ['red', 'red', 'red'],
    ['red', 'red', 'red'],
    ['red', 'red', 'red']
  ],
  [
    ['blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue']
  ],
  [
    ['yellow', 'yellow', 'yellow'],
    ['yellow', 'yellow', 'yellow'],
    ['yellow', 'yellow', 'yellow']
  ]
];

export class CubeInstance {
  public default: Cube = defaultCube;
  public state: Cube;
  constructor(state: Cube = defaultCube) {
    this.state = state;
  }

  rotate(centerColor: Color) {
    const rotateFace = (face: Face): Face => {
      return face.map((val, index) => face.map((row) => row[index]).reverse()) as Face;
    };

    const rotateAdjacentFaces = (
      adjacentFaces: number[],
      mask: { rotate: number; face: boolean[][] }[]
    ) => {
      const rows: (boolean | Color)[][][] = [
        [
          [false, false, false],
          [false, false, false],
          [false, false, false]
        ],
        [
          [false, false, false],
          [false, false, false],
          [false, false, false]
        ],
        [
          [false, false, false],
          [false, false, false],
          [false, false, false]
        ],
        [
          [false, false, false],
          [false, false, false],
          [false, false, false]
        ]
      ];

      adjacentFaces.forEach((adjacentFace, i) => {
        this.state[adjacentFace].forEach((row, x) => {
          row.forEach((column, y) => {
            if (mask[i].face[x][y]) {
              // console.log(`Setting ${adjacentFace} ${x} ${y} to ${this.state[adjacentFace][x][y]}`);
              rows[i][x][y] = this.state[adjacentFace][x][y] as Color;
            }
          });
        });
      });

      // console.log(rows);
      rows.forEach((row, i) => {
        if (mask[i].rotate) {
          for (let j = 0; j < mask[i].rotate; j++) {
            rows[i] = rotateFace(rows[i] as Face);
          }
        }
      });

      rows.push(rows.shift()!);
      // console.log('Rows :');
      // console.log(rows);

      adjacentFaces.forEach((adjacentFace, i) => {
        this.state[adjacentFace].forEach((row, x) => {
          row.forEach((column, y) => {
            // console.log(adjacentFace, i, x, y);
            if (rows[i][x][y]) {
              // console.log(rows[i][x][y]);

              this.state[adjacentFaces[i]][x][y] = rows[i][x][y] as Color;
            }
          });
        });
      });

      // console.log(this.state);
    };

    switch (centerColor) {
      case 'white': {
        const faceIndex = 0;
        const adjacentFaces = [1, 2, 3, 4];
        const mask = [
          {
            rotate: 0,
            face: [
              [true, true, true],
              [false, false, false],
              [false, false, false]
            ]
          },
          {
            rotate: 0,
            face: [
              [true, true, true],
              [false, false, false],
              [false, false, false]
            ]
          },
          {
            rotate: 0,
            face: [
              [true, true, true],
              [false, false, false],
              [false, false, false]
            ]
          },
          {
            rotate: 0,
            face: [
              [true, true, true],
              [false, false, false],
              [false, false, false]
            ]
          }
        ];
        this.state[faceIndex] = rotateFace(this.state[faceIndex]);
        rotateAdjacentFaces(adjacentFaces, mask);
        break;
      }
      case 'orange': {
        const faceIndex = 1;
        const adjacentFaces = [0, 4, 5, 2];
        const mask = [
          {
            rotate: 0,
            face: [
              [true, false, false],
              [true, false, false],
              [true, false, false]
            ]
          },
          {
            rotate: 2,
            face: [
              [false, false, true],
              [false, false, true],
              [false, false, true]
            ]
          },
          {
            rotate: 2,
            face: [
              [true, false, false],
              [true, false, false],
              [true, false, false]
            ]
          },
          {
            rotate: 0,
            face: [
              [true, false, false],
              [true, false, false],
              [true, false, false]
            ]
          }
        ];
        this.state[faceIndex] = rotateFace(this.state[faceIndex]);
        rotateAdjacentFaces(adjacentFaces, mask);
        break;
      }
      case 'green': {
        const faceIndex = 2;
        const adjacentFaces = [0, 1, 5, 3];
        const mask = [
          {
            rotate: 1,
            face: [
              [false, false, false],
              [false, false, false],
              [true, true, true]
            ]
          },
          {
            rotate: 1,
            face: [
              [false, false, true],
              [false, false, true],
              [false, false, true]
            ]
          },
          {
            rotate: 1,
            face: [
              [true, true, true],
              [false, false, false],
              [false, false, false]
            ]
          },
          {
            rotate: 1,
            face: [
              [true, false, false],
              [true, false, false],
              [true, false, false]
            ]
          }
        ];
        this.state[faceIndex] = rotateFace(this.state[faceIndex]);
        rotateAdjacentFaces(adjacentFaces, mask);
        break;
      }
      case 'red': {
        const faceIndex = 3;
        const adjacentFaces = [0, 2, 5, 4];
        const mask = [
          {
            rotate: 2,
            face: [
              [false, false, true],
              [false, false, true],
              [false, false, true]
            ]
          },
          {
            rotate: 0,
            face: [
              [false, false, true],
              [false, false, true],
              [false, false, true]
            ]
          },
          {
            rotate: 0,
            face: [
              [false, false, true],
              [false, false, true],
              [false, false, true]
            ]
          },
          {
            rotate: 2,
            face: [
              [true, false, false],
              [true, false, false],
              [true, false, false]
            ]
          }
        ];
        this.state[faceIndex] = rotateFace(this.state[faceIndex]);
        rotateAdjacentFaces(adjacentFaces, mask);
        break;
      }
      case 'blue': {
        const faceIndex = 4;
        const adjacentFaces = [0, 3, 5, 1];
        const mask = [
          {
            rotate: 3,
            face: [
              [true, true, true],
              [false, false, false],
              [false, false, false]
            ]
          },
          {
            rotate: 3,
            face: [
              [false, false, true],
              [false, false, true],
              [false, false, true]
            ]
          },
          {
            rotate: 3,
            face: [
              [false, false, false],
              [false, false, false],
              [true, true, true]
            ]
          },
          {
            rotate: 3,
            face: [
              [true, false, false],
              [true, false, false],
              [true, false, false]
            ]
          }
        ];
        this.state[faceIndex] = rotateFace(this.state[faceIndex]);
        rotateAdjacentFaces(adjacentFaces, mask);
        break;
      }
      case 'yellow': {
        const faceIndex = 5;
        const adjacentFaces = [1, 4, 3, 2];
        const mask = [
          {
            rotate: 0,
            face: [
              [false, false, false],
              [false, false, false],
              [true, true, true]
            ]
          },
          {
            rotate: 0,
            face: [
              [false, false, false],
              [false, false, false],
              [true, true, true]
            ]
          },
          {
            rotate: 0,
            face: [
              [false, false, false],
              [false, false, false],
              [true, true, true]
            ]
          },
          {
            rotate: 0,
            face: [
              [false, false, false],
              [false, false, false],
              [true, true, true]
            ]
          }
        ];
        this.state[faceIndex] = rotateFace(this.state[faceIndex]);
        rotateAdjacentFaces(adjacentFaces, mask);
        break;
      }
    }
  }
  move(move: Move) {
    switch (move) {
      case 'U': {
        this.rotate('white');
        break;
      }
      case 'U2': {
        this.rotate('white');
        this.rotate('white');
        break;
      }
      case "U'": {
        this.rotate('white');
        this.rotate('white');
        this.rotate('white');
        break;
      }
      case 'R': {
        this.rotate('red');
        break;
      }
      case 'R2': {
        this.rotate('red');
        this.rotate('red');
        break;
      }
      case "R'": {
        this.rotate('red');
        this.rotate('red');
        this.rotate('red');
        break;
      }
      case 'D': {
        this.rotate('yellow');
        break;
      }
      case 'D2': {
        this.rotate('yellow');
        this.rotate('yellow');
        break;
      }
      case "D'": {
        this.rotate('yellow');
        this.rotate('yellow');
        this.rotate('yellow');
        break;
      }
      case 'L': {
        this.rotate('orange');
        break;
      }
      case 'L2': {
        this.rotate('orange');
        this.rotate('orange');
        break;
      }
      case "L'": {
        this.rotate('orange');
        this.rotate('orange');
        this.rotate('orange');
        break;
      }
      case 'F': {
        this.rotate('green');
        break;
      }
      case 'F2': {
        this.rotate('green');
        this.rotate('green');
        break;
      }
      case "F'": {
        this.rotate('green');
        this.rotate('green');
        this.rotate('green');
        break;
      }
      case 'B': {
        this.rotate('blue');
        break;
      }
      case 'B2': {
        this.rotate('blue');
        this.rotate('blue');
        break;
      }
      case "B'": {
        this.rotate('blue');
        this.rotate('blue');
        this.rotate('blue');
        break;
      }
    }
    return this;
  }
  doMoves(moves: Alg) {
    const movesList = moves.toString().split(' ');
    movesList.forEach((move) => {
      move = move.toUpperCase() as Move;
      // console.log(`Doing move ${move}`);
      this.move(move as Move);
    });

    return this;
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(this.default));
    return this;
  }
}

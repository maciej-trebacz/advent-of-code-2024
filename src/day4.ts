import { readInput } from '../utils/readInput.ts';

const day = 4;

function xmasCount(input: string): number {
  const regex = /xmas|samx/gi;
  const matches = [];
  let match;

  // Iterate over the string and manually adjust the start index for overlapping matches
  while ((match = regex.exec(input)) !== null) {
    matches.push(match[0]);
    regex.lastIndex = match.index + 1; // Move the index forward by one for overlap
  }

  return matches.length;
}


async function part1(input: string[]): Promise<number | string> {
  let result = xmasCount(input.join(' '));

  const transposedInput = [];
  for (let i = 0; i < input[0].length; i++) {
    transposedInput.push(input.map(row => row[i]).join(''));
  }

  result += xmasCount(transposedInput.join(' '));

  const diagonalInput: string[] = [];

  for (let i = 0; i < input[0].length; i++) {
    const row = []
    for (let j = 0; j < input.length; j++) {
      row.push(input[j][(j + i) % input[0].length]);
      if ((j + i) % input[0].length === input[0].length - 1) {
        row.push(" ");
      }
    }
    diagonalInput.push(row.join(''));
  }

  result += xmasCount(diagonalInput.join(' '));

  const diagonalTransposedInput: string[] = [];
  
  for (let i = 0; i < input[0].length; i++) {
    const row = []
    for (let j = 0; j < input.length; j++) {
      row.push(input[j].split('').reverse().join('')[(j + i) % input[0].length]);
      if ((j + i) % input[0].length === input[0].length - 1) {
        row.push(" ");
      }
    }
    diagonalTransposedInput.push(row.join(''));
  }

  result += xmasCount(diagonalTransposedInput.join(' '));

  return result;
}

async function part2(input: string[]): Promise<number | string> {
  // TODO: Implement Part 2 solution here
  return 'Result of Part 2';
}

export async function run() {
  const input = await readInput(day);

  const result1 = await part1(input.split('\n'));
  console.log(`Day ${day} - Part 1:`, result1);

  // Uncomment the following lines after completing Part 1
  // const result2 = await part2(input.split('\n'));
  // console.log(`Day ${day} - Part 2:`, result2);
}

if (import.meta.main) {
  run();
}
import { readInput } from '../utils/readInput.ts';
import { overlappingRegex } from '../utils/regex.ts';

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

async function part1Regex(input: string[]): Promise<number | string> {
  const horizontal = /XMAS|SAMX/gi;
  const vertical = /(X.{140}M.{140}A.{140}S|S.{140}A.{140}M.{140}X)/gi;
  const diagonal1 = /(X.{141}M.{141}A.{141}S|S.{141}A.{141}M.{141}X)/gi;
  const diagonal2 = /(X.{139}M.{139}A.{139}S|S.{139}A.{139}M.{139}X)/gi;

  return overlappingRegex(horizontal, input.join(' ')) + overlappingRegex(vertical, input.join(' ')) + overlappingRegex(diagonal1, input.join(' ')) + overlappingRegex(diagonal2, input.join(' '))
}

async function part2(input: string[]): Promise<number | string> {
  const regex = /(M[A-Z]M.{138}[A-Z]A[A-Z].{138}S[A-Z]S)|(M[A-Z]S.{138}[A-Z]A[A-Z].{138}M[A-Z]S)|(S[A-Z]M.{138}[A-Z]A[A-Z].{138}S[A-Z]M)|(S[A-Z]S.{138}[A-Z]A[A-Z].{138}M[A-Z]M)/g;

  return overlappingRegex(regex, input.join(' '))
}

export async function run() {
  const input = await readInput(day);

  const result1 = await part1(input.split('\n'));
  console.log(`Day ${day} - Part 1:`, result1);

  const result1regex = await part1Regex(input.split('\n'));
  console.log(`Day ${day} - Part 1 regex:`, result1regex);

  const result2 = await part2(input.split('\n'));
  console.log(`Day ${day} - Part 2:`, result2);
}

if (import.meta.main) {
  run();
}
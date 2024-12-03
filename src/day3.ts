// src/day3.ts

import { readInput } from '../utils/readInput.ts';

const day = 3;

async function part1(input: string): Promise<number | string> {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = input.matchAll(regex);
  let sum = 0;
  for (const match of matches) {
    const [, a, b] = match;
    sum += parseInt(a) * parseInt(b);
  }
  return sum;
}

async function part2(input: string): Promise<number | string> {
  const regex = /don\'t\(\).+?do\(\)/g;
  input = input.replaceAll(regex, '');

  const regex2 = /don\'t.+?$/g
  input = input.replaceAll(regex2, '');

  return part1(input);
}

export async function run() {
  let input = await readInput(day);

  // Remove newlines
  input = input.replaceAll('\n', '');

  const result1 = await part1(input);
  console.log(`Day ${day} - Part 1:`, result1);

  const result2 = await part2(input);
  console.log(`Day ${day} - Part 2:`, result2);
}

if (import.meta.main) {
  run();
}
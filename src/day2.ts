import { readInput } from '../utils/readInput.ts';

const day = 2;

type Mode = 'increasing' | 'decreasing' | null;

function checkIfLevelsAreSafe(levels: number[]): boolean {
  let mode: Mode = null;
  for (let i = 1; i < levels.length; i++) {
    if (mode === null) {
      if (levels[i] > levels[i - 1]) {
        mode = 'increasing';
      } else { 
        mode = 'decreasing';
      }
    }

    // The report can be either increasing or decreasing
    if (mode === 'increasing' && levels[i] < levels[i - 1] || mode === 'decreasing' && levels[i] > levels[i - 1]) {
      return false;
    }

    // Check if the difference is between 1 and 3
    const diff = Math.abs(levels[i] - levels[i - 1]);
    if (diff < 1 || diff > 3) {
      return false;
    }

  }

  return true;
}

async function part1(input: string): Promise<number | string> {
  return input.split('\n').reduce((acc, cur, idx) => {
    const levels = cur.split(' ').map((level) => parseInt(level));
    return checkIfLevelsAreSafe(levels) ? acc + 1 : acc;
  }, 0);
}

async function part2(input: string): Promise<number | string> {
  return input.split('\n').reduce((acc, cur, idx) => {
    const levels = cur.split(' ').map((level) => parseInt(level));
    for (let i = 0; i < levels.length; i++) {
      // Remove the i-th level from the copy of the array
      const copy = [...levels];
      copy.splice(i, 1);

      // Check if the report is still valid
      if (checkIfLevelsAreSafe(copy)) {
        return acc + 1;
      }
    }
    return acc + 0;
  }, 0);
}

export async function run() {
  const input = await readInput(day);

  const result1 = await part1(input);
  console.log(`Day ${day} - Part 1:`, result1);

  const result2 = await part2(input);
  console.log(`Day ${day} - Part 2:`, result2);
}

if (import.meta.main) {
  run();
}
import { readInput } from '../utils/readInput.ts';

const day = 1;

async function part1(a: number[], b: number[]): Promise<number | string> {
  return a.reduce((acc, cur, i) => Math.abs(cur - b[i]) + acc, 0);
}

async function part2(a: number[], b: number[]): Promise<number | string> {
  const frequencies = b.reduce((acc: Record<number, number>, cur) => {
    if (acc[cur]) {
      acc[cur]++;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});

  return a.reduce((acc, cur) => {
    if (frequencies[cur]) {
      acc += frequencies[cur] * cur;
    }
    return acc;
  }, 0);
}

export async function run() {
  const input = await readInput(day);

  const rows = input.split("\n");
  const a = rows.map((row) => parseInt(row.split("   ")[0]));
  const b = rows.map((row) => parseInt(row.split("   ")[1]));

  a.sort();
  b.sort();

  const result1 = await part1(a, b);
  console.log(`Day ${day} - Part 1:`, result1);

  const result2 = await part2(a, b);
  console.log(`Day ${day} - Part 2:`, result2);
}
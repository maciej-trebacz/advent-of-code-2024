import { config } from 'https://deno.land/std@0.152.0/dotenv/mod.ts';

const env = config();
const dayArg = Deno.args[0];
const day = parseInt(dayArg);

if (isNaN(day) || day < 1 || day > 25) {
  console.error('Please provide a valid day number between 1 and 25.');
  Deno.exit(1);
}

// Generate the daily solution file
const template = `
// src/day${day}.ts

import { readInput } from '../utils/readInput.ts';

const day = ${day};

async function part1(input: string): Promise<number | string> {
  // TODO: Implement Part 1 solution here
  return 'Result of Part 1';
}

async function part2(input: string): Promise<number | string> {
  // TODO: Implement Part 2 solution here
  return 'Result of Part 2';
}

export async function run() {
  const input = await readInput(day);

  const result1 = await part1(input);
  console.log(\`Day \${day} - Part 1:\`, result1);

  // Uncomment the following lines after completing Part 1
  // const result2 = await part2(input);
  // console.log(\`Day \${day} - Part 2:\`, result2);
}
`;

await Deno.writeTextFile(`src/day${day}.ts`, template.trim());
console.log(`Created src/day${day}.ts`);

// Automatically download the input data
const envConfig = await env;
const session = envConfig['AOC_SESSION'] || Deno.env.get('AOC_SESSION');

if (!session) {
  console.error('AOC_SESSION environment variable is not set.');
  console.error('Skipping input download.');
} else {
  const url = `https://adventofcode.com/2023/day/${day}/input`;

  try {
    const response = await fetch(url, {
      headers: {
        'Cookie': `session=${session}`,
        'User-Agent': 'github.com/yourusername/advent-of-code-2023 by your.email@example.com',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch input for day ${day}: ${response.statusText}`);
    } else {
      const input = await response.text();
      await Deno.writeTextFile(`inputs/${day}.txt`, input.trimEnd());
      console.log(`Downloaded input for day ${day} to inputs/${day}.txt`);
    }
  } catch (error) {
    console.error(`Error fetching input for day ${day}:`, error);
  }
}

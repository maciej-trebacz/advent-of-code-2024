// scripts/downloadInput.ts

import { config } from 'https://deno.land/std@0.152.0/dotenv/mod.ts';

const env = config();
const dayArg = Deno.args[0];
const day = parseInt(dayArg);

if (isNaN(day) || day < 1 || day > 25) {
  console.error('Please provide a valid day number between 1 and 25.');
  Deno.exit(1);
}

const envConfig = await env;
const session = envConfig['AOC_SESSION'] || Deno.env.get('AOC_SESSION');

if (!session) {
  console.error('AOC_SESSION environment variable is not set.');
  Deno.exit(1);
}

const url = `https://adventofcode.com/2024/day/${day}/input`;

try {
  const response = await fetch(url, {
    headers: {
      'Cookie': `session=${session}`,
      'User-Agent': 'github.com/maciej-trebacz/advent-of-code-2024 by maciej@trebacz.org',
    },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch input for day ${day}: ${response.statusText}`,
    );
    Deno.exit(1);
  }

  const input = await response.text();
  await Deno.writeTextFile(`inputs/${day}.txt`, input.trimEnd());
  console.log(`Downloaded input for day ${day} to inputs/${day}.txt`);
} catch (error) {
  console.error(`Error fetching input for day ${day}:`, error);
  Deno.exit(1);
}

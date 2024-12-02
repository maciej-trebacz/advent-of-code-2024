#!/usr/bin/env -S deno run --allow-read --watch

const dayArg = Deno.args[0];

if (!dayArg) {
  console.error('Please provide a day number.');
  Deno.exit(1);
}

const day = parseInt(dayArg);
if (isNaN(day)) {
  console.error('Invalid day number.');
  Deno.exit(1);
}

const modulePath = `./src/day${day}.ts`;

try {
  const { run } = await import(modulePath);
  if (typeof run === 'function') {
    await run();
  } else {
    console.error(`Module for day ${day} does not export a 'run' function.`);
    Deno.exit(1);
  }
} catch (error) {
  console.error(`Error importing module for day ${day}:`, error);
  Deno.exit(1);
}

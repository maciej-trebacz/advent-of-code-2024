# Advent of Code 2024

Solutions for [Advent of Code 2024](https://adventofcode.com/2024) in [Deno](https://deno.land/) and TypeScript.

## Usage

To run the solutions, you need to have [Deno](https://deno.land/) installed on your machine.

### Saving your AoC session cookie

You need to save your AoC session cookie in an environment variable named `AOC_SESSION` in order to download the input data for the days.

Store it in a `.env` file in the root of the project:

```bash
AOC_SESSION=YOUR_SESSION_COOKIE
```

Alternatively, you can set the `AOC_SESSION` environment variable:

```bash
export AOC_SESSION=YOUR_SESSION_COOKIE
```

### Creating a template for a new day

To create a new template for a new day, run the following command:

```bash
deno task create [DAY_NUMBER] # e.g. deno task create 2
```

This will create a new file `src/day{DAY_NUMBER}.ts` with a template for the solution.

### Running a solution

To run a solution for a specific day, run the following command:

```bash
deno task day [DAY_NUMBER] # e.g. deno task day 2
```
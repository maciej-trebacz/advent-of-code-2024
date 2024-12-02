export async function readInput(day: number): Promise<string> {
  try {
    const data = await Deno.readTextFile(`./inputs/${day}.txt`);
    return data;
  } catch (error) {
    console.error(`Error reading input file for day ${day}:`, error);
    Deno.exit(1);
  }
}

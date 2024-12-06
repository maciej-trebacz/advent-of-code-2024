import { readInput } from '../utils/readInput.ts';

const day = 4;

function countOccurrences(grid: string[], word: string): number {
  const directions = [
      {dx: 1, dy: 0},   // Right
      {dx: -1, dy: 0},  // Left
      {dx: 0, dy: 1},   // Down
      {dx: 0, dy: -1},  // Up
      {dx: 1, dy: 1},   // Diagonal down-right
      {dx: 1, dy: -1},  // Diagonal up-right
      {dx: -1, dy: 1},  // Diagonal down-left
      {dx: -1, dy: -1}  // Diagonal up-left
  ];

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
          if (grid[y][x] === word[0]) {
              for (const {dx, dy} of directions) {
                  let nx = x, ny = y, matched = true;
                  for (let i = 1; i < word.length; i++) {
                      nx += dx; ny += dy;
                      if (nx < 0 || nx >= cols || ny < 0 || ny >= rows || grid[ny][nx] !== word[i]) {
                          matched = false;
                          break;
                      }
                  }
                  if (matched) count++;
              }
          }
      }
  }
  return count;
}

function countXMas(grid: string[]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  // We want to find patterns of an X shape:
  // The center of the X is 'A'.
  // One diagonal: top-left -> A -> bottom-right must form MAS or SAM.
  // The other diagonal: top-right -> A -> bottom-left must form MAS or SAM.
  // This gives us four possible combinations:
  // TL-A-BR: M-A-S or S-A-M
  // TR-A-BL: M-A-S or S-A-M

  // For a center at (x,y), we need positions:
  // TL = (x-1, y-1), TR = (x+1, y-1)
  // BL = (x-1, y+1), BR = (x+1, y+1)

  for (let y = 1; y < rows - 1; y++) {
      for (let x = 1; x < cols - 1; x++) {
          if (grid[y][x] !== 'A') continue;

          const TL = grid[y - 1]?.[x - 1];
          const TR = grid[y - 1]?.[x + 1];
          const BL = grid[y + 1]?.[x - 1];
          const BR = grid[y + 1]?.[x + 1];

          if (!TL || !TR || !BL || !BR) continue;

          // Check first diagonal (TL-A-BR)
          const diag1MAS = (TL === 'M' && BR === 'S') || (TL === 'S' && BR === 'M');
          // Check second diagonal (TR-A-BL)
          const diag2MAS = (TR === 'M' && BL === 'S') || (TR === 'S' && BL === 'M');

          if (diag1MAS && diag2MAS) count++;
      }
  }

  return count;
}

export async function run() {
  const input = await readInput(day);

  const result1 = countOccurrences(input.split('\n'), 'XMAS');
  console.log(`Day ${day} - Part 1:`, result1);

  const result2 = countXMas(input.split('\n'));
  console.log(`Day ${day} - Part 2:`, result2);
}

if (import.meta.main) {
  run();
}

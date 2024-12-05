// src/day5.ts

import { readInput } from '../utils/readInput.ts';

const day = 5;

function isUpdateCorrect(rules: string[], update: string): boolean {
  const pages = update.split(',');
  return rules.every(rule => {
    const rulePages = rule.split('|');
    if (!pages.includes(rulePages[0]) || !pages.includes(rulePages[1])) {
      return true;
    }

    return pages.indexOf(rulePages[0]) < pages.indexOf(rulePages[1]);
  });
}

function sortPages(pages: string[], rules: string[]): string[] {
  return pages.join(',').split(',').sort((a, b) => {
    const rule = rules.find(rule => rule.split('|').includes(a) && rule.split('|').includes(b));
    if (!rule) {
      return 0;
    }
    const rulePages = rule.split('|');
    return a === rulePages[0] ? -1 : 1;
  });
}

function findMiddlePage(pages: string[]): string {
  return pages.at(Math.floor(pages.length / 2)) || '';
}

async function part1(rules: string[], updates: string[]): Promise<number | string> {
  const correctUpdates = updates.filter(update => isUpdateCorrect(rules, update));
  const middlePages = correctUpdates.map(update => update.split(',')).map(pages => findMiddlePage(pages));

  return middlePages.reduce((acc, page) => acc + parseInt(page), 0);
}

async function part2(rules: string[], updates: string[]): Promise<number | string> {
  const incorrectUpdates = updates.filter(update => !isUpdateCorrect(rules, update))

  const sortedPages = incorrectUpdates.map(update => update.split(',')).map(pages => sortPages(pages, rules));

  const middlePages = sortedPages.map(pages => findMiddlePage(pages));

  return middlePages.reduce((acc, page) => acc + parseInt(page), 0);
}

export async function run() {
  const input = (await readInput(day)).split('\n\n');
  const rules = input[0].split('\n');
  const updates = input[1].split('\n');

  const result1 = await part1(rules, updates);
  console.log(`Day ${day} - Part 1:`, result1);

  const result2 = await part2(rules, updates);
  console.log(`Day ${day} - Part 2:`, result2);
}

if (import.meta.main) {
  run();
}
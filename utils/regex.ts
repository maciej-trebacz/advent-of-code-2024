export function overlappingRegex(regex: RegExp, input: string) {
  const matches = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    matches.push(match[0]);
    regex.lastIndex = match.index + 1; // Move the index forward by one for overlap
  }

  return matches.length;
}
import { visibleLetters } from '@beenotung/tslib/random';

function isVisibleChar(c: string): boolean {
  /* TODO support more unicode, e,g, chinese */
  switch (c) {
    case '\n':
    case '\t':
      return true;
    default:
      return visibleLetters.includes(c);
  }
}

export function removeColorCode(s: string): string {
  return s
    .replace(/\u001b\[[0-9;]*m/g, '')
    .split('')
    .filter(c => isVisibleChar(c))
    .join('')
    .split('\n')
    .map(line => {
      const newLine = line.replace(/% {80}]0;.*/, '').replace(/^]0;/, '');
      if (line.length !== 0 && newLine.length === 0) {
        return null;
      }
      return newLine;
    })
    .filter(line => line !== null)
    .join('\n');
}

export function extractTypescriptPlaintext(s: string): string {
  let lines = removeColorCode(s)
    .trim()
    .split('\n');
  lines.pop();
  lines = lines.slice(1);
  lines = lines.map(line => line.replace(/^.*? /, ''));
  const last = lines[lines.length - 1];
  if (last === 'exit') {
    lines.pop();
  }
  return lines.join('\n');
}

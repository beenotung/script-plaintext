#!/usr/bin/env node
import { readFile, writeFile } from '@beenotung/tslib/fs';
import { catchMain } from '@beenotung/tslib/node';
import { extractTypescriptPlaintext } from './core';

const args = process.argv.splice(2);
let infile = '/dev/stdin';
let outfile = '/dev/stdout';
let mode = 0;
let stop = false;
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  switch (arg) {
    case '-h':
      console.log(
        `
script-plaintext

Arguments:
  in-file: input file, optional, if not given, stdin will be used
  out-file: output file, optional, if not given, stdout will be used

Usages:
  script-plaintext <in-file> <out-file>
  script-plaintext -i <in-file> -o <out-file>
  script-plaintext -o <out-file> -i <in-file>

Examples:
  script-plaintext typescript typescript.log
  cat typescript | script-plaintext > typescript.log
`.trim(),
      );
      process.exit(0);
      stop = true;
      break;
    case '-i':
      i++;
      infile = args[i];
      break;
    case '-o':
      i++;
      outfile = args[i];
      break;
    default:
      switch (mode) {
        case 0:
          infile = arg;
          break;
        case 1:
          outfile = arg;
          break;
        default:
          console.error('extra argument:', arg);
          process.exit(1);
          stop = true;
      }
      mode++;
  }
}
if (!stop) {
  catchMain(
    readFile(infile).then(bin => {
      const plaintext = extractTypescriptPlaintext(bin.toString());
      if (outfile === '/dev/stdout') {
        console.log(plaintext);
      } else {
        return writeFile(outfile, plaintext);
      }
    }),
  );
}

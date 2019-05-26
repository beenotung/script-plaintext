import { writeFile } from '@beenotung/tslib/fs';
import { extractTypescriptPlaintext } from '../src/core';
import * as test from 'tape';
import { expectedPlaintext, text } from './test-data';

test('extract typescript plain text', async t => {
  const plaintext = extractTypescriptPlaintext(text);
  await writeFile('example/out.txt', plaintext);
  t.equals(plaintext, expectedPlaintext);
  t.end();
});

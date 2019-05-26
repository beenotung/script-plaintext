import * as fs from 'fs';

const bin = fs.readFileSync('example/typescript');
export const text = bin.toString();
const expectedBin = fs.readFileSync('example/payload.txt');
export const expectedPlaintext = expectedBin.toString().trim();

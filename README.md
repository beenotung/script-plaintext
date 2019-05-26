# script-plaintext

Convert script output with color code into plain text

[![npm Package Version](https://img.shields.io/npm/v/script-plaintext.svg?maxAge=2592000)](https://www.npmjs.com/package/script-plaintext)

## Usage Case
In shell, you can record the cli interaction using the `script` command, it will record the input to a 'typescript' file.
However, this file contains lots of contain characters, e.g. `<Esc>[6m;`.
This cli tools remove the control characters, only preserving plain-text content.

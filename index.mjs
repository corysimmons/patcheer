#!/usr/bin/env node

import { copy } from './copy.mjs';
import { apply } from './apply.mjs';

async function main() {
  const command = process.argv[2];
  const packageName = process.argv[3];

  try {
    switch (command) {
      case 'copy':
        if (!packageName) {
          throw new Error('Please provide a package name to copy.');
        }
        await copy(packageName);
        break;
      case 'apply':
        await apply();
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

main();

// Copies a package (entire directory) from node_modules to ./patches
// Usage: npx patcheer copy lodash

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import * as child_process from 'child_process';

const exec = promisify(child_process.exec);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);

export async function copy(packageName) {
  const sourcePath = path.join('node_modules', packageName);
  const patchesPath = path.join('patches');
  const destPath = path.join(patchesPath, packageName);

  try {
    // Check if ./patches directory exists, if not create it
    if (!await exists(patchesPath)) {
      await mkdir(patchesPath, { recursive: true });
    }

    await exec(`cp -R ${sourcePath} ${destPath}`);
    console.log(`Package ${packageName} copied successfully.`);
  } catch (err) {
    console.error(`Error copying package ${packageName}:`, err);
  }
}

const packageName = process.argv[2];

if (!packageName) {
  console.error('Please provide a package name.');
  process.exit(1);
}
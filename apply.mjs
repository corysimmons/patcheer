// Overwrites all the packages (entire directory) in node_modules with the packages in your ./patches dir.
// It won't touch other directories in node_modules.
// Usage: npx patcheer apply

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import * as child_process from 'child_process';

const exec = promisify(child_process.exec);
const readdir = promisify(fs.readdir);
const exists = promisify(fs.exists);

export async function apply() {
  const patchesPath = path.join('patches');

  try {
    // Check if ./patches directory exists
    if (!await exists(patchesPath)) {
      throw new Error(`The patches directory (${patchesPath}) does not exist.`);
    }

    const patchDirs = await readdir(patchesPath, { withFileTypes: true });

    for (const dir of patchDirs) {
      if (dir.isDirectory()) {
        const sourcePath = path.join(patchesPath, dir.name);
        const destPath = path.join('node_modules', dir.name);
        await exec(`cp -Rf ${sourcePath}/. ${destPath}/`);
        console.log(`Patch applied to ${dir.name} successfully.`);
      }
    }
  } catch (err) {
    console.error('Error applying patches:', err.message);
  }
}
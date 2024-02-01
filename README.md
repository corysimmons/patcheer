# patcheer

Super naive patcher. One command to copy a package folder from `node_modules` to `./patches`. Patch the package. Another command to destructively copy all the patches in `./patches` to `node_modules`.

## Getting started

Let's use lodash as an example.

- `npm i -D patcheer`
- `npm i lodash axios`
- `npx patcheer copy lodash`
- Tweak anything in `./patches/lodash`
- `npx patcheer copy axios`
- Tweak anything in `./patches/axios`
- `npx patcheer apply`

## Postinstall

To have it automatically apply patches after you run `npm install` on a project, just add this to your `package.json` scripts.

`"postinstall": "npx patcheer apply"`

If you're trying to build with Yarn or Bun, you'll need to add [postinstall-postinstall](https://www.npmjs.com/package/postinstall-postinstall) to your dev dependencies.

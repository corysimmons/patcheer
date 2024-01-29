# patcheer

Super naive patcher. One command to copy a package folder from `node_modules` to `./patches`. Patch the package. Another command to destructively copy all the patches in `./patches` to `node_modules`. 

## Getting started

Let's use lodash as an example.
- `npm i lodash axios`
- `npx patcheer copy lodash`
- Tweak anything in `./patches/lodash`
- Tweak anything in `./patches/axios`
- `npx patcheer apply`
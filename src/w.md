---
title: Categorize Your Dependencies
date: 2025-04-28T14:00:00Z
---

When building a project, it's very likely that we will install third-party packages from npm to offload some tasks. On that topic, we know there are two major types of dependencies: `dependencies` (prod) and `devDependencies` (dev). In our `package.json`, it might look something like this:

```json
{
  "name": "my-cool-vue-components",
  "dependencies": {
    "vue": "^3.5.15"
  },
  "devDependencies": {
    "eslint": "^9.15.0"
  }
}
```

The main difference is that [`devDependencies`](https://github.com/npm/npm/blob/2e3776bf5676bc24fec6239a3420f377fe98acde/doc/files/package.json.md#devdependencies) are only needed during the build or development phase, while [`dependencies`](https://github.com/npm/npm/blob/2e3776bf5676bc24fec6239a3420f377fe98acde/doc/files/package.json.md#dependencies) are required for the project to run. For example, `eslint` in the case above only lints our source code; it's no longer needed when we publish the project or deploy it to production.

The concept of `dependencies` and `devDependencies` was originally introduced for **authoring Node.js libraries** (those published to npm). When you install a package like `vite`, npm automatically installs its `dependencies` but not its `devDependencies`. This is because you are consuming `vite` as a dependency and don't need its development tools. So, even if `vite` uses `prettier` during its development, you won't be forced to install `prettier` when you only need `vite` in your project.

As the ecosystem has evolved, we can now build much more complex projects than ever before. We have meta-frameworks for building full-stack websites, bundlers for transpiling and bundling code and dependencies, and so on. Node.js became a lot more than just running JavaScript code and packages on the server side.

I'd roughly categorize projects into three types:

1.  **Apps**: Websites, Electron apps, mobile apps, etc. Here, `package.json` primarily keeps track of dependency information, and the app itself is never published to npm.
2.  **Libraries**: Packages designed to be published to npm, then installed and consumed by other projects.
3.  **Internal**: Packages used within monorepos that are never published.

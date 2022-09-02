# svu

## 0.2.1

### Changes

- FIX: Remove SvelteKit dependency for svu/dev

## 0.2.0

### Changes

- [BREAKING]: Feat: Svu now is no longer dependant on SvelteKit, so should work in the Svelte REPL (or fallback gracefully). This means the svu/svelte export will be removed.
- [BREAKING]: FIX: type KeyMap is now capitalised.
- [BREAKING]: Scoped the default class for use:active. It changed from 'active' to 'svu-active'.
- FIX: localstore was not always working flawlessly
- FEAT: localstore is based on resettable and contains a flag showing wether or not storage api is available
- FEAT: added sessionstore with the same interface as localstore.
- FIX: Fixes a bug in portal where passing in a HTMLElement didn't work.
- DOCS: Various small docstring improvements

## 0.1.5

### Changes

- FIX: patch error in copy/paste action on textarea
- FIX: patch error passing in target by reference in copy/paste action

## 0.1.4

### Changes

- Fix exports
- Add initial set of plain-svelte exports (e.g. for use in REPL).
- Fix reactivity on use:active option (you can now pass in classes as variables).
- Add some better types (a lot more work needs to be done here).
- Add modifier support to keydown and keyup
- Add mediaquery store
- Add media /client stores
- Add os and modKey /client stores
- Docs content + fixes

## 0.1.3

### Changes

Fix Vite config

## 0.1.2

### Changes

Undo path export change from 0.1.1. Turns out [this](https://github.com/sveltejs/kit/issues/2040) was the culprit.

## 0.1.1

### Changes

Rename package in Docs and README. Fix path exports.

## 0.1.0

### Changes

Initial public version. Renamed package from '@nikolai-cc/svutil' to 'svu' Contains a collection of 27 svus (most of which are actions) with documentation.

# @nextui-org/system-rsc

## 2.1.6

### Patch Changes

- [#3559](https://github.com/nextui-org/nextui/pull/3559) [`44e89a077`](https://github.com/nextui-org/nextui/commit/44e89a0779c1c98fe275c864fe12834d19302b9c) Thanks [@awesome-pro](https://github.com/awesome-pro)! - added missing `StringToBoolean<keyof V[K]>[]` (#3530)

## 2.1.5

### Patch Changes

- [#3512](https://github.com/nextui-org/nextui/pull/3512) [`2d2d300a1`](https://github.com/nextui-org/nextui/commit/2d2d300a12dbe20ca7ebd125daf3dce74efcbf34) Thanks [@wingkwong](https://github.com/wingkwong)! - fix conflicting versions in npm

## 2.1.4

### Patch Changes

- [#3503](https://github.com/nextui-org/nextui/pull/3503) [`5591138bf`](https://github.com/nextui-org/nextui/commit/5591138bff4a393f614c4cb0d505901560c4ceea) Thanks [@wingkwong](https://github.com/wingkwong)! - handled defaultVariants null case in extendVariants (#3502)

## 2.1.3

### Patch Changes

- [#3336](https://github.com/nextui-org/nextui/pull/3336) [`0cdfdb48b`](https://github.com/nextui-org/nextui/commit/0cdfdb48bcb7eecb752fc6a3033d3bdd2335872b) Thanks [@winchesHe](https://github.com/winchesHe)! - Fix onSelectionChange type incorrect (#2512)

- [#3299](https://github.com/nextui-org/nextui/pull/3299) [`f785d1fb0`](https://github.com/nextui-org/nextui/commit/f785d1fb0460df73912bcd6614bc78d46db14e6b) Thanks [@wingkwong](https://github.com/wingkwong)! - fixed `extendVariants` when having `defaultVariants` (#3009)

## 2.1.2

### Patch Changes

- [#2915](https://github.com/nextui-org/nextui/pull/2915) [`e3afa4789`](https://github.com/nextui-org/nextui/commit/e3afa4789a1ac0fa929b2acaca5bd9c520567ab8) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - The `cn` utility was moved the `theme` package and updated to support NextUI custom classes.

- [#3018](https://github.com/nextui-org/nextui/pull/3018) [`1109baea6`](https://github.com/nextui-org/nextui/commit/1109baea6ac6aa3feb2be90ef065f61b2c2a06a9) Thanks [@wingkwong](https://github.com/wingkwong)! - fix incorrect tailwind classnames

## 2.1.1

### Patch Changes

- [#2758](https://github.com/nextui-org/nextui/pull/2758) [`74eda3128`](https://github.com/nextui-org/nextui/commit/74eda312883b2e17df26f71442aba9fb3cd240be) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Named exports for rsc packages, "use client;" directive added to "@nextui-org/react" package

## 2.1.0

### Minor Changes

- [#2618](https://github.com/nextui-org/nextui/pull/2618) [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.3.0

### Patch Changes

- [#2618](https://github.com/nextui-org/nextui/pull/2618) [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Calendar component added

  - objectToDeps function applied all across components
  - `useMeasure` hook added
  - `useIntersectionObserver` hook added
  - `framer-transitions` renamed to `framer-utils`
  - `ResizablePanel` component added to `framer-utils`
  - `test-utils` updated

- [#2522](https://github.com/nextui-org/nextui/pull/2522) [`c5049edfd`](https://github.com/nextui-org/nextui/commit/c5049edfde7edaee2081d70e581739be9dcae2f9) Thanks [@wingkwong](https://github.com/wingkwong)! - Fixed unexpected props on a DOM element (#2474)

## 2.0.11

### Patch Changes

- [#1936](https://github.com/nextui-org/nextui/pull/1936) [`a978687b0`](https://github.com/nextui-org/nextui/commit/a978687b0736d1e15943ef46628fc4fa0723ddc7) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1935 size prop added to the omitted HTMLNextUIProps

## 2.0.10

### Patch Changes

- [#1927](https://github.com/nextui-org/nextui/pull/1927) [`6ecdc278a`](https://github.com/nextui-org/nextui/commit/6ecdc278aba927ee38a799679b8eb99cba99cab9) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1921 `extendVariants` function adapted to consider props variants over `defaultVariants`.

## 2.0.9

### Patch Changes

- [#1877](https://github.com/nextui-org/nextui/pull/1877) [`44ed1056e`](https://github.com/nextui-org/nextui/commit/44ed1056e717c56633f60cf289f78e9c7b83b648) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Peer dependencies updated, changeset config changed to update peer dependencies only when out of range

## 2.0.8

### Patch Changes

- [#1874](https://github.com/nextui-org/nextui/pull/1874) [`38af48faf`](https://github.com/nextui-org/nextui/commit/38af48faf5b62d2f81f2402f3d83d78991eb46e0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Peer dependencies updated to avoid the peer conflicts issue.

## 2.0.7

### Patch Changes

- [`25e86fb41`](https://github.com/nextui-org/nextui/commit/25e86fb41770d3cdae6dfdb79306b78fa02d8187) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New version v2.2.0

- Updated dependencies [[`25e86fb41`](https://github.com/nextui-org/nextui/commit/25e86fb41770d3cdae6dfdb79306b78fa02d8187)]:
  - @nextui-org/theme@2.1.10

## 2.0.6

### Patch Changes

- [#1642](https://github.com/nextui-org/nextui/pull/1642) [`f6531c5f6`](https://github.com/nextui-org/nextui/commit/f6531c5f603d7f6308a597962ec6fab62c92fa93) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1541 `extendVariants`function gives more priority to final component props over the `extendVariants` props

## 2.0.5

### Patch Changes

- [#1600](https://github.com/nextui-org/nextui/pull/1600) [`b1b30b797`](https://github.com/nextui-org/nextui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix npm deploy

## 2.0.4

### Patch Changes

- [#1555](https://github.com/nextui-org/nextui/pull/1555) [`d61428d9e`](https://github.com/nextui-org/nextui/commit/d61428d9e6c1c0590593fb1f0136e226051b7e23) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Tailwind variants upgraded to the latest version v0.1.14

## 2.0.3

### Patch Changes

- [`e3e13a09`](https://github.com/nextui-org/nextui/commit/e3e13a095f2347ff279c85e6a5d3798f36c6533f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New package created to exports system RSC-compatible functions
  Component exports changed to named exports

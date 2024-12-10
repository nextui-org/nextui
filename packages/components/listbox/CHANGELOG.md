# @nextui-org/listbox

## 2.3.7

### Patch Changes

- [#4322](https://github.com/nextui-org/nextui/pull/4322) [`78c0928`](https://github.com/nextui-org/nextui/commit/78c09280e30113bd648057ad64ad6198d1e5d58f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #4292 interactive elements were not responding to "onClick" event

- Updated dependencies [[`78c0928`](https://github.com/nextui-org/nextui/commit/78c09280e30113bd648057ad64ad6198d1e5d58f)]:
  - @nextui-org/aria-utils@2.2.5

## 2.3.6

### Patch Changes

- [#4314](https://github.com/nextui-org/nextui/pull/4314) [`5598806`](https://github.com/nextui-org/nextui/commit/5598806216166dc9fff36cafd9112412486b747f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix build

- Updated dependencies []:
  - @nextui-org/divider@2.2.4

## 2.3.5

### Patch Changes

- [#4286](https://github.com/nextui-org/nextui/pull/4286) [`11eae5c`](https://github.com/nextui-org/nextui/commit/11eae5cc808e10db07b509f4e06d30441bb1937a) Thanks [@macci001](https://github.com/macci001)! - Reverts the PR-4168 (#4256, #4246, #4244)

- Updated dependencies []:
  - @nextui-org/divider@2.2.4

## 2.3.4

### Patch Changes

- [#4258](https://github.com/nextui-org/nextui/pull/4258) [`1031e98`](https://github.com/nextui-org/nextui/commit/1031e985b71e69b8a7189ea049b9616257f820b3) Thanks [@wingkwong](https://github.com/wingkwong)! - sync with upstream RA versions

- Updated dependencies [[`1031e98`](https://github.com/nextui-org/nextui/commit/1031e985b71e69b8a7189ea049b9616257f820b3)]:
  - @nextui-org/aria-utils@2.2.4
  - @nextui-org/use-is-mobile@2.2.2
  - @nextui-org/divider@2.2.4

## 2.3.3

### Patch Changes

- [#4255](https://github.com/nextui-org/nextui/pull/4255) [`6a94a12`](https://github.com/nextui-org/nextui/commit/6a94a125d4836b0a18d9cd2cb521c85a6bfa9050) Thanks [@wingkwong](https://github.com/wingkwong)! - fixed incorrect peerDependencies for theme and system package (#4254)

- Updated dependencies [[`6a94a12`](https://github.com/nextui-org/nextui/commit/6a94a125d4836b0a18d9cd2cb521c85a6bfa9050)]:
  - @nextui-org/divider@2.2.3
  - @nextui-org/aria-utils@2.2.3

## 2.3.2

### Patch Changes

- [#4247](https://github.com/nextui-org/nextui/pull/4247) [`551ab18`](https://github.com/nextui-org/nextui/commit/551ab184060b24b2c3a89598f84d4c18599649d0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix peerDeps & core package client on export \*

- Updated dependencies [[`551ab18`](https://github.com/nextui-org/nextui/commit/551ab184060b24b2c3a89598f84d4c18599649d0)]:
  - @nextui-org/divider@2.2.2
  - @nextui-org/aria-utils@2.2.2

## 2.3.1

### Patch Changes

- [`d6eee4a`](https://github.com/nextui-org/nextui/commit/d6eee4a8767556152f47f06dcf04940951abc5af) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.6.2

- Updated dependencies [[`d6eee4a`](https://github.com/nextui-org/nextui/commit/d6eee4a8767556152f47f06dcf04940951abc5af)]:
  - @nextui-org/divider@2.2.1
  - @nextui-org/use-is-mobile@2.2.1
  - @nextui-org/aria-utils@2.2.1
  - @nextui-org/react-utils@2.1.1
  - @nextui-org/shared-utils@2.1.1

## 2.3.0

### Minor Changes

- [`5786897`](https://github.com/nextui-org/nextui/commit/5786897b9950d95c12351dacd2fb41bb1e298201) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - This release includes several improvements and bug fixes:

  - Updated react-aria version across all components
  - Improved Drawer styles and transitions
  - Fixed missing peer dependencies for framer-motion
  - Fixed menu item classNames functionality
  - Added isClearable prop to Textarea component
  - Fixed label placement issues in Input and Select components
  - Improved table keyboard navigation with new isKeyboardNavigationDisabled prop
  - Fixed UI sliding issues with helper wrapper in Input and Select
  - Updated use-image hook to avoid Next.js hydration issues
  - Replaced RTL-specific styles with logical properties
  - Fixed textarea label squish issue
  - Bumped tailwind-merge version
  - Applied tw nested group fixes
  - Fixed fullWidth variant in input and select components
  - Moved circular-progress tv to progress
  - Changed ListboxItem key to optional
  - Fixed autocomplete clear button behavior
  - Updated Select label placement logic
  - Added missing framer-motion peer dependencies
  - Removed layoutNode prop from Table due to react-aria update
  - Virtualization added to Autocomplete

### Patch Changes

- [#4207](https://github.com/nextui-org/nextui/pull/4207) [`6bc616c`](https://github.com/nextui-org/nextui/commit/6bc616caea948431d05eec33c1784e0560524e97) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix the "forwardRef render functions accept exactly two parameters: props and ref. Did you forget to use the ref parameter?" on next.js by changing the way we manage collection base components refs

- [#4206](https://github.com/nextui-org/nextui/pull/4206) [`44958bf`](https://github.com/nextui-org/nextui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8) Thanks [@vinroger](https://github.com/vinroger)! - Fix typecheck

- [#4226](https://github.com/nextui-org/nextui/pull/4226) [`6c0213d`](https://github.com/nextui-org/nextui/commit/6c0213dfc805aa3c793763c0b25f53b2b80c24dc) Thanks [@wingkwong](https://github.com/wingkwong)! - bump `@react-aria/utils` version (#4212)

- [#4198](https://github.com/nextui-org/nextui/pull/4198) [`ffb1e55`](https://github.com/nextui-org/nextui/commit/ffb1e554f7d6b5b1ede66d0838b3b1edeeccdf6b) Thanks [@winchesHe](https://github.com/winchesHe)! - Fix forwardRef render functions not using ref

- [#4206](https://github.com/nextui-org/nextui/pull/4206) [`44958bf`](https://github.com/nextui-org/nextui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8) Thanks [@vinroger](https://github.com/vinroger)! - Virtualization support added to Listbox and Menu

- Updated dependencies [[`6c0213d`](https://github.com/nextui-org/nextui/commit/6c0213dfc805aa3c793763c0b25f53b2b80c24dc), [`5786897`](https://github.com/nextui-org/nextui/commit/5786897b9950d95c12351dacd2fb41bb1e298201)]:
  - @nextui-org/aria-utils@2.2.0
  - @nextui-org/divider@2.2.0
  - @nextui-org/use-is-mobile@2.2.0
  - @nextui-org/react-utils@2.1.0
  - @nextui-org/shared-utils@2.1.0

## 2.2.0-beta.14

### Patch Changes

- [#4168](https://github.com/nextui-org/nextui/pull/4168) [`0b5ceb93c`](https://github.com/nextui-org/nextui/commit/0b5ceb93ce098e5d76409190f2d57cd89c06b7e9) Thanks [@macci001](https://github.com/macci001)! - Fixes missing `<li>` wrapper when `href` prop is passed in `ListboxItem`, `MenuItem`, and `PaginationItem` (#4147)

- Updated dependencies []:
  - @nextui-org/divider@2.1.0-beta.9

## 2.2.0-beta.13

### Patch Changes

- Updated dependencies []:
  - @nextui-org/divider@2.1.0-beta.9
  - @nextui-org/aria-utils@2.1.0-beta.11

## 2.2.0-beta.12

### Patch Changes

- [`9869f2b91`](https://github.com/nextui-org/nextui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27) Thanks [@wingkwong](https://github.com/wingkwong)! - bump version

- Updated dependencies [[`9869f2b91`](https://github.com/nextui-org/nextui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27)]:
  - @nextui-org/divider@2.1.0-beta.9
  - @nextui-org/use-is-mobile@2.1.0-beta.8
  - @nextui-org/aria-utils@2.1.0-beta.10
  - @nextui-org/react-utils@2.0.18-beta.8
  - @nextui-org/shared-utils@2.0.9-beta.8

## 2.2.0-beta.11

### Patch Changes

- [#3036](https://github.com/nextui-org/nextui/pull/3036) [`eafdb7d47`](https://github.com/nextui-org/nextui/commit/eafdb7d475a7fcaa7671af77e86fcdf62f14ae00) Thanks [@ryo-manba](https://github.com/ryo-manba)! - update react-aria version

- Updated dependencies [[`eafdb7d47`](https://github.com/nextui-org/nextui/commit/eafdb7d475a7fcaa7671af77e86fcdf62f14ae00)]:
  - @nextui-org/divider@2.1.0-beta.8
  - @nextui-org/use-is-mobile@2.1.0-beta.7
  - @nextui-org/aria-utils@2.1.0-beta.9

## 2.2.0-beta.10

### Patch Changes

- [#4105](https://github.com/nextui-org/nextui/pull/4105) [`256d46277`](https://github.com/nextui-org/nextui/commit/256d462771c19d6ca5b969d0ec44419fb560f0ac) Thanks [@winchesHe](https://github.com/winchesHe)! - Add truncate class to the list item to avoid overflow the wrapper

- Updated dependencies []:
  - @nextui-org/divider@2.1.0-beta.7

## 2.2.0-beta.9

### Patch Changes

- Updated dependencies []:
  - @nextui-org/aria-utils@2.1.0-beta.8

## 2.2.0-beta.8

### Patch Changes

- [#4094](https://github.com/nextui-org/nextui/pull/4094) [`b9d5d4925`](https://github.com/nextui-org/nextui/commit/b9d5d492519778a4bf071748ec9f2b4e25d8373f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Virtualization support added to Listbox & Autocomplete

- Updated dependencies []:
  - @nextui-org/divider@2.1.0-beta.7

## 2.2.0-beta.7

### Patch Changes

- [#4092](https://github.com/nextui-org/nextui/pull/4092) [`528668db8`](https://github.com/nextui-org/nextui/commit/528668db85b98b46473cb1e214780b7468cdadba) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Test new runner

- Updated dependencies [[`528668db8`](https://github.com/nextui-org/nextui/commit/528668db85b98b46473cb1e214780b7468cdadba)]:
  - @nextui-org/divider@2.1.0-beta.7
  - @nextui-org/use-is-mobile@2.1.0-beta.6
  - @nextui-org/aria-utils@2.1.0-beta.7
  - @nextui-org/react-utils@2.0.18-beta.7
  - @nextui-org/shared-utils@2.0.9-beta.7

## 2.2.0-beta.6

### Patch Changes

- [#4086](https://github.com/nextui-org/nextui/pull/4086) [`f69fe47b5`](https://github.com/nextui-org/nextui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pnpm clean

- Updated dependencies [[`f69fe47b5`](https://github.com/nextui-org/nextui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb)]:
  - @nextui-org/divider@2.1.0-beta.6
  - @nextui-org/use-is-mobile@2.1.0-beta.5
  - @nextui-org/aria-utils@2.1.0-beta.6
  - @nextui-org/react-utils@2.0.18-beta.6
  - @nextui-org/shared-utils@2.0.9-beta.6

## 2.2.0-beta.5

### Patch Changes

- [#4083](https://github.com/nextui-org/nextui/pull/4083) [`35058262c`](https://github.com/nextui-org/nextui/commit/35058262c61628fb42907f529c4417886aa12bb2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix build

- Updated dependencies [[`35058262c`](https://github.com/nextui-org/nextui/commit/35058262c61628fb42907f529c4417886aa12bb2)]:
  - @nextui-org/divider@2.1.0-beta.5
  - @nextui-org/use-is-mobile@2.1.0-beta.4
  - @nextui-org/aria-utils@2.1.0-beta.5
  - @nextui-org/react-utils@2.0.18-beta.5
  - @nextui-org/shared-utils@2.0.9-beta.5

## 2.2.0-beta.4

### Patch Changes

- Updated dependencies [[`5339b2571`](https://github.com/nextui-org/nextui/commit/5339b2571e6d73ca6efe2acd34d88669419db9f7)]:
  - @nextui-org/shared-utils@2.0.9-beta.4
  - @nextui-org/divider@2.1.0-beta.4
  - @nextui-org/aria-utils@2.1.0-beta.4
  - @nextui-org/react-utils@2.0.18-beta.4

## 2.2.0-beta.3

### Patch Changes

- [#4010](https://github.com/nextui-org/nextui/pull/4010) [`ef432eb53`](https://github.com/nextui-org/nextui/commit/ef432eb539714fded6cab86a2185956fb103e0df) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - framer-motion alpha version added

- Updated dependencies [[`ef432eb53`](https://github.com/nextui-org/nextui/commit/ef432eb539714fded6cab86a2185956fb103e0df)]:
  - @nextui-org/divider@2.1.0-beta.3
  - @nextui-org/use-is-mobile@2.1.0-beta.3
  - @nextui-org/aria-utils@2.1.0-beta.3
  - @nextui-org/react-utils@2.0.18-beta.3
  - @nextui-org/shared-utils@2.0.9-beta.3

## 2.2.0-beta.2

### Patch Changes

- [#4008](https://github.com/nextui-org/nextui/pull/4008) [`7c1c0dd8f`](https://github.com/nextui-org/nextui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React 19 added to peerDeps

- Updated dependencies [[`7c1c0dd8f`](https://github.com/nextui-org/nextui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89)]:
  - @nextui-org/divider@2.1.0-beta.2
  - @nextui-org/use-is-mobile@2.1.0-beta.2
  - @nextui-org/aria-utils@2.1.0-beta.2
  - @nextui-org/react-utils@2.0.18-beta.2
  - @nextui-org/shared-utils@2.0.9-beta.2

## 2.2.0-beta.1

### Patch Changes

- [#3990](https://github.com/nextui-org/nextui/pull/3990) [`cb5bc4c74`](https://github.com/nextui-org/nextui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Beta 1

- Updated dependencies [[`cb5bc4c74`](https://github.com/nextui-org/nextui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85)]:
  - @nextui-org/divider@2.1.0-beta.1
  - @nextui-org/use-is-mobile@2.1.0-beta.1
  - @nextui-org/aria-utils@2.1.0-beta.1
  - @nextui-org/react-utils@2.0.18-beta.1
  - @nextui-org/shared-utils@2.0.9-beta.1

## 2.2.0-beta.0

### Minor Changes

- [#3732](https://github.com/nextui-org/nextui/pull/3732) [`67ea2f65e`](https://github.com/nextui-org/nextui/commit/67ea2f65e17f913bdffae4690586a6ae202c8f7d) Thanks [@ryo-manba](https://github.com/ryo-manba)! - update react-aria version

### Patch Changes

- [#3883](https://github.com/nextui-org/nextui/pull/3883) [`a2e562b03`](https://github.com/nextui-org/nextui/commit/a2e562b03f79b52b0b35f07104b3585ea05e2cb6) Thanks [@ryo-manba](https://github.com/ryo-manba)! - change ListboxItem key to optional (#3880)

- Updated dependencies [[`0cf91395c`](https://github.com/nextui-org/nextui/commit/0cf91395c7c66a69fb05c7fca4a30cbad9e1e0f8), [`781b85566`](https://github.com/nextui-org/nextui/commit/781b85566ee5eac3f505625462c4f5f14e36ed3a), [`67ea2f65e`](https://github.com/nextui-org/nextui/commit/67ea2f65e17f913bdffae4690586a6ae202c8f7d), [`38a54ab49`](https://github.com/nextui-org/nextui/commit/38a54ab497781e17799b37f0061ba50f2dc44e09), [`af3c4f706`](https://github.com/nextui-org/nextui/commit/af3c4f706bb88eae02eee594a6db68cdd33bbe88), [`ae73de1a6`](https://github.com/nextui-org/nextui/commit/ae73de1a61c26e78235ce2d4c38159d486b55d56), [`ad6393ab3`](https://github.com/nextui-org/nextui/commit/ad6393ab33362119203455ef5c8ffbfe1ffa96a1), [`3f0d81b56`](https://github.com/nextui-org/nextui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb), [`cb1b3135b`](https://github.com/nextui-org/nextui/commit/cb1b3135bc7e811c9c2e163d4778f9f6eb2ef8c8), [`a5cac4561`](https://github.com/nextui-org/nextui/commit/a5cac45619e529cf9850f02f416b6bc7cba77f3f), [`d90ad05b1`](https://github.com/nextui-org/nextui/commit/d90ad05b13b36617009cb0e5f57f299aa7bb7bd0), [`a0d7141db`](https://github.com/nextui-org/nextui/commit/a0d7141db314c6bea27df6b8beb15dae3b1bcb93), [`3f0d81b56`](https://github.com/nextui-org/nextui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb), [`3f0d81b56`](https://github.com/nextui-org/nextui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb), [`8a33eabb2`](https://github.com/nextui-org/nextui/commit/8a33eabb2583202fcc8fbc33e8f2ed23bb45f1a4), [`559436d46`](https://github.com/nextui-org/nextui/commit/559436d462bdb8739d8c817d1aa98607969d8a07)]:
  - @nextui-org/theme@2.3.0-beta.0
  - @nextui-org/divider@2.1.0-beta.0
  - @nextui-org/system@2.3.0-beta.0
  - @nextui-org/use-is-mobile@2.1.0-beta.0
  - @nextui-org/aria-utils@2.1.0-beta.0
  - @nextui-org/shared-utils@2.0.9-beta.0
  - @nextui-org/react-utils@2.0.18-beta.0

## 2.1.27

### Patch Changes

- Updated dependencies [[`229388422`](https://github.com/nextui-org/nextui/commit/2293884229541e363b1983fea88ba6e3bee6be14)]:
  - @nextui-org/aria-utils@2.0.26
  - @nextui-org/divider@2.0.32

## 2.1.26

### Patch Changes

- [#3726](https://github.com/nextui-org/nextui/pull/3726) [`d621b2923`](https://github.com/nextui-org/nextui/commit/d621b2923e7c90e73bea996e5918b744223e896c) Thanks [@chirokas](https://github.com/chirokas)! - Fix item highlighting in `AutocompleteSection` during keyboard navigation (#3713)

- Updated dependencies [[`123b7fbc9`](https://github.com/nextui-org/nextui/commit/123b7fbc9fb51613d7568572a00982ad230d02ae), [`f36df4362`](https://github.com/nextui-org/nextui/commit/f36df4362f572e8e233d4357f43600265cd5b8d5)]:
  - @nextui-org/aria-utils@2.0.25
  - @nextui-org/shared-utils@2.0.8
  - @nextui-org/divider@2.0.32
  - @nextui-org/react-utils@2.0.17

## 2.1.25

### Patch Changes

- [#3512](https://github.com/nextui-org/nextui/pull/3512) [`2d2d300a1`](https://github.com/nextui-org/nextui/commit/2d2d300a12dbe20ca7ebd125daf3dce74efcbf34) Thanks [@wingkwong](https://github.com/wingkwong)! - fix conflicting versions in npm

- Updated dependencies [[`2d2d300a1`](https://github.com/nextui-org/nextui/commit/2d2d300a12dbe20ca7ebd125daf3dce74efcbf34)]:
  - @nextui-org/divider@2.0.31
  - @nextui-org/use-is-mobile@2.0.9
  - @nextui-org/aria-utils@2.0.24
  - @nextui-org/react-utils@2.0.16
  - @nextui-org/shared-utils@2.0.7

## 2.1.24

### Patch Changes

- Updated dependencies []:
  - @nextui-org/divider@2.0.30
  - @nextui-org/aria-utils@2.0.23

## 2.1.23

### Patch Changes

- Updated dependencies [[`60bb09fe6`](https://github.com/nextui-org/nextui/commit/60bb09fe6455475a16225e776348e9acf0537f9b), [`f5d94f96e`](https://github.com/nextui-org/nextui/commit/f5d94f96e4cffed1d4aeef971c89f8d283effd49)]:
  - @nextui-org/aria-utils@2.0.22
  - @nextui-org/shared-utils@2.0.6
  - @nextui-org/divider@2.0.29
  - @nextui-org/react-utils@2.0.15

## 2.1.22

### Patch Changes

- [#3240](https://github.com/nextui-org/nextui/pull/3240) [`47c2472fb`](https://github.com/nextui-org/nextui/commit/47c2472fb22bfe1c0c357b5ba12e5606eba0d65b) Thanks [@wingkwong](https://github.com/wingkwong)! - bump react-aria dependencies

- Updated dependencies [[`47c2472fb`](https://github.com/nextui-org/nextui/commit/47c2472fb22bfe1c0c357b5ba12e5606eba0d65b), [`47c2472fb`](https://github.com/nextui-org/nextui/commit/47c2472fb22bfe1c0c357b5ba12e5606eba0d65b), [`b9bb06ff3`](https://github.com/nextui-org/nextui/commit/b9bb06ff37f99bfc438e848706ec79b4c7b7c5d3)]:
  - @nextui-org/aria-utils@2.0.21
  - @nextui-org/use-is-mobile@2.0.8
  - @nextui-org/react-utils@2.0.14
  - @nextui-org/divider@2.0.28

## 2.1.21

### Patch Changes

- [#3119](https://github.com/nextui-org/nextui/pull/3119) [`685995a12`](https://github.com/nextui-org/nextui/commit/685995a125cc3db26c6adb67ed9f7245b87e792a) Thanks [@wingkwong](https://github.com/wingkwong)! - bump `@react-aria/utils` version to `3.24.1` and bump `@react-types/shared` to `3.23.1`

- Updated dependencies [[`685995a12`](https://github.com/nextui-org/nextui/commit/685995a125cc3db26c6adb67ed9f7245b87e792a)]:
  - @nextui-org/aria-utils@2.0.20
  - @nextui-org/divider@2.0.28

## 2.1.20

### Patch Changes

- [#2953](https://github.com/nextui-org/nextui/pull/2953) [`c8f792ccd`](https://github.com/nextui-org/nextui/commit/c8f792ccd78a80000e6f5b15e6f22cac947fd531) Thanks [@ryo-manba](https://github.com/ryo-manba)! - Fix update type definition to prevent primitive values as items (#2938)

- [#2929](https://github.com/nextui-org/nextui/pull/2929) [`422770cc6`](https://github.com/nextui-org/nextui/commit/422770cc6bcdd1d4c51257654ab718f3c19d6cb2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Add support for disabling the animations globally.

- Updated dependencies [[`3b14c21e0`](https://github.com/nextui-org/nextui/commit/3b14c21e02fedf15d7d22e911109dac60c4e780e)]:
  - @nextui-org/aria-utils@2.0.19
  - @nextui-org/divider@2.0.28

## 2.1.19

### Patch Changes

- Updated dependencies [[`eccc2f2f3`](https://github.com/nextui-org/nextui/commit/eccc2f2f3d856eefb2cc7c07b94e1c4cefd4d7d0)]:
  - @nextui-org/aria-utils@2.0.18
  - @nextui-org/react-utils@2.0.13
  - @nextui-org/divider@2.0.27

## 2.1.18

### Patch Changes

- Updated dependencies []:
  - @nextui-org/aria-utils@2.0.17
  - @nextui-org/divider@2.0.27
  - @nextui-org/react-utils@2.0.12

## 2.1.17

### Patch Changes

- [#2618](https://github.com/nextui-org/nextui/pull/2618) [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.3.0

- [#2618](https://github.com/nextui-org/nextui/pull/2618) [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Calendar component added
  - objectToDeps function applied all across components
  - `useMeasure` hook added
  - `useIntersectionObserver` hook added
  - `framer-transitions` renamed to `framer-utils`
  - `ResizablePanel` component added to `framer-utils`
  - `test-utils` updated
- Updated dependencies [[`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14), [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14)]:
  - @nextui-org/divider@2.0.26
  - @nextui-org/use-is-mobile@2.0.7
  - @nextui-org/aria-utils@2.0.16
  - @nextui-org/react-utils@2.0.11
  - @nextui-org/shared-utils@2.0.5

## 2.1.16

### Patch Changes

- Updated dependencies []:
  - @nextui-org/divider@2.0.25
  - @nextui-org/aria-utils@2.0.15

## 2.1.15

### Patch Changes

- Updated dependencies []:
  - @nextui-org/divider@2.0.24
  - @nextui-org/aria-utils@2.0.14

## 2.1.14

### Patch Changes

- [#1915](https://github.com/nextui-org/nextui/pull/1915) [`135cc21e6`](https://github.com/nextui-org/nextui/commit/135cc21e6f0f2bee1f19e7e5799b6cea8179b7f5) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1888 `hideSelectedIcon` added to menu and listbox sections.

- Updated dependencies []:
  - @nextui-org/divider@2.0.23

## 2.1.13

### Patch Changes

- [#1877](https://github.com/nextui-org/nextui/pull/1877) [`44ed1056e`](https://github.com/nextui-org/nextui/commit/44ed1056e717c56633f60cf289f78e9c7b83b648) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Peer dependencies updated, changeset config changed to update peer dependencies only when out of range

- Updated dependencies [[`44ed1056e`](https://github.com/nextui-org/nextui/commit/44ed1056e717c56633f60cf289f78e9c7b83b648)]:
  - @nextui-org/divider@2.0.23
  - @nextui-org/aria-utils@2.0.13

## 2.1.12

### Patch Changes

- [#1874](https://github.com/nextui-org/nextui/pull/1874) [`38af48faf`](https://github.com/nextui-org/nextui/commit/38af48faf5b62d2f81f2402f3d83d78991eb46e0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Peer dependencies updated to avoid the peer conflicts issue.

- Updated dependencies [[`38af48faf`](https://github.com/nextui-org/nextui/commit/38af48faf5b62d2f81f2402f3d83d78991eb46e0)]:
  - @nextui-org/divider@2.0.22
  - @nextui-org/system@2.0.12
  - @nextui-org/aria-utils@2.0.12

## 2.1.11

### Patch Changes

- [`25e86fb41`](https://github.com/nextui-org/nextui/commit/25e86fb41770d3cdae6dfdb79306b78fa02d8187) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New version v2.2.0

- Updated dependencies [[`25e86fb41`](https://github.com/nextui-org/nextui/commit/25e86fb41770d3cdae6dfdb79306b78fa02d8187)]:
  - @nextui-org/divider@2.0.21
  - @nextui-org/system@2.0.11
  - @nextui-org/theme@2.1.10
  - @nextui-org/use-aria-press@2.0.1
  - @nextui-org/use-is-mobile@2.0.6
  - @nextui-org/aria-utils@2.0.11
  - @nextui-org/react-utils@2.0.10
  - @nextui-org/shared-utils@2.0.4

## 2.1.10

### Patch Changes

- [#1628](https://github.com/nextui-org/nextui/pull/1628) [`3aa86423a`](https://github.com/nextui-org/nextui/commit/3aa86423aa4b0c56d2e14772bc081f98a5fbdb05) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1625 Listbox item classNames

- Updated dependencies [[`425a034bc`](https://github.com/nextui-org/nextui/commit/425a034bca4aa5a86cfe4bc47c084366a7ad7e87)]:
  - @nextui-org/theme@2.1.9
  - @nextui-org/divider@2.0.20
  - @nextui-org/system@2.0.10
  - @nextui-org/react-utils@2.0.9
  - @nextui-org/aria-utils@2.0.10

## 2.1.9

### Patch Changes

- [#1600](https://github.com/nextui-org/nextui/pull/1600) [`b1b30b797`](https://github.com/nextui-org/nextui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix npm deploy

- Updated dependencies [[`b1b30b797`](https://github.com/nextui-org/nextui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572)]:
  - @nextui-org/divider@2.0.19
  - @nextui-org/system@2.0.9
  - @nextui-org/theme@2.1.8
  - @nextui-org/use-is-mobile@2.0.5
  - @nextui-org/aria-utils@2.0.9
  - @nextui-org/react-utils@2.0.8
  - @nextui-org/shared-utils@2.0.3

## 2.1.8

### Patch Changes

- [#1589](https://github.com/nextui-org/nextui/pull/1589) [`1612532ee`](https://github.com/nextui-org/nextui/commit/1612532eeeabbc49165546b1a2e7aebf89e7a1c2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React aria packages upgraded

- Updated dependencies [[`a3be419cb`](https://github.com/nextui-org/nextui/commit/a3be419cb3c693ae8cace15f9a863274d759ddb1), [`5c30e0481`](https://github.com/nextui-org/nextui/commit/5c30e04811ef9f973d6b59107c909db72d9876b5), [`1612532ee`](https://github.com/nextui-org/nextui/commit/1612532eeeabbc49165546b1a2e7aebf89e7a1c2)]:
  - @nextui-org/theme@2.1.7
  - @nextui-org/aria-utils@2.0.8
  - @nextui-org/use-is-mobile@2.0.4
  - @nextui-org/divider@2.0.18
  - @nextui-org/system@2.0.8

## 2.1.7

### Patch Changes

- Updated dependencies [[`7c8341035`](https://github.com/nextui-org/nextui/commit/7c8341035dbdd120cd78221b3cabab2e40e7478d)]:
  - @nextui-org/theme@2.1.6
  - @nextui-org/divider@2.0.17

## 2.1.6

### Patch Changes

- Updated dependencies [[`d61428d9e`](https://github.com/nextui-org/nextui/commit/d61428d9e6c1c0590593fb1f0136e226051b7e23), [`4db10a47e`](https://github.com/nextui-org/nextui/commit/4db10a47e96ad8315b5b96c2ff15574ac0fdeecc)]:
  - @nextui-org/theme@2.1.5
  - @nextui-org/divider@2.0.16
  - @nextui-org/system@2.0.7
  - @nextui-org/aria-utils@2.0.7

## 2.1.5

### Patch Changes

- [#1544](https://github.com/nextui-org/nextui/pull/1544) [`a9e324b35`](https://github.com/nextui-org/nextui/commit/a9e324b3515bab9883f3911747351ee69f9afb9d) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1503 Listbox dynamic items types fixed

- Updated dependencies [[`043b8420c`](https://github.com/nextui-org/nextui/commit/043b8420cfb659cbb6bb36404807ec3cc8ac8592), [`641bf0885`](https://github.com/nextui-org/nextui/commit/641bf0885b6af2d7f36f27d83716a441975a5ca5)]:
  - @nextui-org/theme@2.1.4
  - @nextui-org/system@2.0.6
  - @nextui-org/divider@2.0.15
  - @nextui-org/aria-utils@2.0.6

## 2.1.4

### Patch Changes

- Updated dependencies [[`5702287e5`](https://github.com/nextui-org/nextui/commit/5702287e5622a8f0a0326c7cc0c200808c7971a8)]:
  - @nextui-org/theme@2.1.3
  - @nextui-org/divider@2.0.14

## 2.1.3

### Patch Changes

- [#1463](https://github.com/nextui-org/nextui/pull/1463) [`904f53877`](https://github.com/nextui-org/nextui/commit/904f5387793cf8cc594d4ff8c32e378439a8e4fa) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React aria utils pkg updated

## 2.1.2

### Patch Changes

- [#1458](https://github.com/nextui-org/nextui/pull/1458) [`4e94c115`](https://github.com/nextui-org/nextui/commit/4e94c115281c2774424d687877e036a9af1bce01) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix dropdown trigger events and popover arrow styles

- Updated dependencies [[`4e94c115`](https://github.com/nextui-org/nextui/commit/4e94c115281c2774424d687877e036a9af1bce01)]:
  - @nextui-org/divider@2.0.13
  - @nextui-org/theme@2.1.2

## 2.1.1

### Patch Changes

- Updated dependencies [[`cc839cdd`](https://github.com/nextui-org/nextui/commit/cc839cdd1fd54931bfba137e2f9b5e8007a7e47d)]:
  - @nextui-org/theme@2.1.1
  - @nextui-org/divider@2.0.12

## 2.1.0

### Minor Changes

- [#1313](https://github.com/nextui-org/nextui/pull/1313) [`baec5502`](https://github.com/nextui-org/nextui/commit/baec55029de7f17ba84d3e6c8c98358fd1f2695e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New components:

  - Select
  - Listbox
  - ScrollShadow

### Patch Changes

- Updated dependencies [[`baec5502`](https://github.com/nextui-org/nextui/commit/baec55029de7f17ba84d3e6c8c98358fd1f2695e)]:
  - @nextui-org/theme@2.1.0
  - @nextui-org/divider@2.0.11
  - @nextui-org/react-utils@2.0.7

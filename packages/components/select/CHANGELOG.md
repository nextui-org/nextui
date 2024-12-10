# @nextui-org/select

## 2.4.7

### Patch Changes

- Updated dependencies [[`78c0928`](https://github.com/nextui-org/nextui/commit/78c09280e30113bd648057ad64ad6198d1e5d58f)]:
  - @nextui-org/use-aria-button@2.2.3
  - @nextui-org/aria-utils@2.2.5
  - @nextui-org/listbox@2.3.7
  - @nextui-org/popover@2.3.7
  - @nextui-org/form@2.1.6

## 2.4.6

### Patch Changes

- Updated dependencies [[`5598806`](https://github.com/nextui-org/nextui/commit/5598806216166dc9fff36cafd9112412486b747f)]:
  - @nextui-org/listbox@2.3.6
  - @nextui-org/form@2.1.6
  - @nextui-org/popover@2.3.6
  - @nextui-org/scroll-shadow@2.3.3
  - @nextui-org/spinner@2.2.4

## 2.4.5

### Patch Changes

- Updated dependencies [[`11eae5c`](https://github.com/nextui-org/nextui/commit/11eae5cc808e10db07b509f4e06d30441bb1937a)]:
  - @nextui-org/listbox@2.3.5
  - @nextui-org/form@2.1.5
  - @nextui-org/popover@2.3.5
  - @nextui-org/scroll-shadow@2.3.3
  - @nextui-org/spinner@2.2.4

## 2.4.4

### Patch Changes

- [#4258](https://github.com/nextui-org/nextui/pull/4258) [`1031e98`](https://github.com/nextui-org/nextui/commit/1031e985b71e69b8a7189ea049b9616257f820b3) Thanks [@wingkwong](https://github.com/wingkwong)! - sync with upstream RA versions

- Updated dependencies [[`b16291b`](https://github.com/nextui-org/nextui/commit/b16291b2200229f0d0a9ea910e38f3f100f7931f), [`1031e98`](https://github.com/nextui-org/nextui/commit/1031e985b71e69b8a7189ea049b9616257f820b3)]:
  - @nextui-org/form@2.1.4
  - @nextui-org/use-aria-multiselect@2.4.2
  - @nextui-org/use-aria-button@2.2.2
  - @nextui-org/aria-utils@2.2.4
  - @nextui-org/listbox@2.3.4
  - @nextui-org/popover@2.3.4
  - @nextui-org/spinner@2.2.4
  - @nextui-org/scroll-shadow@2.3.3

## 2.4.3

### Patch Changes

- [#4255](https://github.com/nextui-org/nextui/pull/4255) [`6a94a12`](https://github.com/nextui-org/nextui/commit/6a94a125d4836b0a18d9cd2cb521c85a6bfa9050) Thanks [@wingkwong](https://github.com/wingkwong)! - fixed incorrect peerDependencies for theme and system package (#4254)

- Updated dependencies [[`6a94a12`](https://github.com/nextui-org/nextui/commit/6a94a125d4836b0a18d9cd2cb521c85a6bfa9050)]:
  - @nextui-org/scroll-shadow@2.3.3
  - @nextui-org/listbox@2.3.3
  - @nextui-org/popover@2.3.3
  - @nextui-org/spinner@2.2.3
  - @nextui-org/form@2.1.3
  - @nextui-org/aria-utils@2.2.3

## 2.4.2

### Patch Changes

- [#4247](https://github.com/nextui-org/nextui/pull/4247) [`551ab18`](https://github.com/nextui-org/nextui/commit/551ab184060b24b2c3a89598f84d4c18599649d0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix peerDeps & core package client on export \*

- Updated dependencies [[`551ab18`](https://github.com/nextui-org/nextui/commit/551ab184060b24b2c3a89598f84d4c18599649d0)]:
  - @nextui-org/scroll-shadow@2.3.2
  - @nextui-org/listbox@2.3.2
  - @nextui-org/popover@2.3.2
  - @nextui-org/spinner@2.2.2
  - @nextui-org/form@2.1.2
  - @nextui-org/aria-utils@2.2.2

## 2.4.1

### Patch Changes

- [`d6eee4a`](https://github.com/nextui-org/nextui/commit/d6eee4a8767556152f47f06dcf04940951abc5af) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.6.2

- Updated dependencies [[`d6eee4a`](https://github.com/nextui-org/nextui/commit/d6eee4a8767556152f47f06dcf04940951abc5af)]:
  - @nextui-org/form@2.1.1
  - @nextui-org/listbox@2.3.1
  - @nextui-org/popover@2.3.1
  - @nextui-org/scroll-shadow@2.3.1
  - @nextui-org/spinner@2.2.1
  - @nextui-org/use-aria-button@2.2.1
  - @nextui-org/use-aria-multiselect@2.4.1
  - @nextui-org/use-safe-layout-effect@2.1.1
  - @nextui-org/aria-utils@2.2.1
  - @nextui-org/react-utils@2.1.1
  - @nextui-org/shared-icons@2.1.1
  - @nextui-org/shared-utils@2.1.1

## 2.4.0

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

- [#4214](https://github.com/nextui-org/nextui/pull/4214) [`af0d20d`](https://github.com/nextui-org/nextui/commit/af0d20d807311b98a49218cb10faff0972a7d2fa) Thanks [@jubar](https://github.com/jubar)! - Update the data-slot attribute of the Select component from "errorMessage" to "error-message" to maintain consistency across all components.

- [#4224](https://github.com/nextui-org/nextui/pull/4224) [`26e478d`](https://github.com/nextui-org/nextui/commit/26e478dd937dedcaf41110171d971a8a3cf2ff52) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Added form support to input-otp, change default validationBehavior to "native" to avoid breaking changes, and fix select with form

- [#4226](https://github.com/nextui-org/nextui/pull/4226) [`6c0213d`](https://github.com/nextui-org/nextui/commit/6c0213dfc805aa3c793763c0b25f53b2b80c24dc) Thanks [@wingkwong](https://github.com/wingkwong)! - bump `@react-aria/utils` version (#4212)

- [#4219](https://github.com/nextui-org/nextui/pull/4219) [`1855ba4`](https://github.com/nextui-org/nextui/commit/1855ba4390186f701c793f76593f31a5dce6da70) Thanks [@Peterl561](https://github.com/Peterl561)! - add hideEmptyContent API to select

- Updated dependencies [[`6bc616c`](https://github.com/nextui-org/nextui/commit/6bc616caea948431d05eec33c1784e0560524e97), [`44958bf`](https://github.com/nextui-org/nextui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8), [`26e478d`](https://github.com/nextui-org/nextui/commit/26e478dd937dedcaf41110171d971a8a3cf2ff52), [`6c0213d`](https://github.com/nextui-org/nextui/commit/6c0213dfc805aa3c793763c0b25f53b2b80c24dc), [`1855ba4`](https://github.com/nextui-org/nextui/commit/1855ba4390186f701c793f76593f31a5dce6da70), [`ffb1e55`](https://github.com/nextui-org/nextui/commit/ffb1e554f7d6b5b1ede66d0838b3b1edeeccdf6b), [`5786897`](https://github.com/nextui-org/nextui/commit/5786897b9950d95c12351dacd2fb41bb1e298201), [`44958bf`](https://github.com/nextui-org/nextui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8)]:
  - @nextui-org/listbox@2.3.0
  - @nextui-org/popover@2.3.0
  - @nextui-org/use-aria-multiselect@2.4.0
  - @nextui-org/form@2.1.0
  - @nextui-org/use-aria-button@2.2.0
  - @nextui-org/aria-utils@2.2.0
  - @nextui-org/scroll-shadow@2.3.0
  - @nextui-org/spinner@2.2.0
  - @nextui-org/use-safe-layout-effect@2.1.0
  - @nextui-org/react-utils@2.1.0
  - @nextui-org/shared-icons@2.1.0
  - @nextui-org/shared-utils@2.1.0

## 2.3.0-beta.19

### Patch Changes

- Updated dependencies [[`004c4a4b3`](https://github.com/nextui-org/nextui/commit/004c4a4b3e44477f148937b12bb542e4b27fd322), [`0b5ceb93c`](https://github.com/nextui-org/nextui/commit/0b5ceb93ce098e5d76409190f2d57cd89c06b7e9)]:
  - @nextui-org/shared-icons@2.0.10-beta.8
  - @nextui-org/listbox@2.2.0-beta.14
  - @nextui-org/popover@2.2.0-beta.12
  - @nextui-org/scroll-shadow@2.2.0-beta.8
  - @nextui-org/spinner@2.1.0-beta.9

## 2.3.0-beta.18

### Patch Changes

- Updated dependencies []:
  - @nextui-org/listbox@2.2.0-beta.13
  - @nextui-org/popover@2.2.0-beta.12
  - @nextui-org/scroll-shadow@2.2.0-beta.8
  - @nextui-org/spinner@2.1.0-beta.9
  - @nextui-org/aria-utils@2.1.0-beta.11

## 2.3.0-beta.17

### Patch Changes

- [`9869f2b91`](https://github.com/nextui-org/nextui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27) Thanks [@wingkwong](https://github.com/wingkwong)! - bump version

- Updated dependencies [[`9869f2b91`](https://github.com/nextui-org/nextui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27)]:
  - @nextui-org/listbox@2.2.0-beta.12
  - @nextui-org/popover@2.2.0-beta.11
  - @nextui-org/scroll-shadow@2.2.0-beta.8
  - @nextui-org/spinner@2.1.0-beta.9
  - @nextui-org/use-aria-button@2.1.0-beta.8
  - @nextui-org/use-aria-multiselect@2.3.0-beta.8
  - @nextui-org/use-safe-layout-effect@2.0.7-beta.5
  - @nextui-org/aria-utils@2.1.0-beta.10
  - @nextui-org/react-utils@2.0.18-beta.8
  - @nextui-org/shared-icons@2.0.10-beta.7
  - @nextui-org/shared-utils@2.0.9-beta.8

## 2.3.0-beta.16

### Patch Changes

- [#4082](https://github.com/nextui-org/nextui/pull/4082) [`1e05a721f`](https://github.com/nextui-org/nextui/commit/1e05a721f9ba25403c023023a1e3efa44ac3bb74) Thanks [@chirokas](https://github.com/chirokas)! - Fix Controlled IsInvalid Prop In Select

## 2.3.0-beta.15

### Patch Changes

- [#3036](https://github.com/nextui-org/nextui/pull/3036) [`eafdb7d47`](https://github.com/nextui-org/nextui/commit/eafdb7d475a7fcaa7671af77e86fcdf62f14ae00) Thanks [@ryo-manba](https://github.com/ryo-manba)! - update react-aria version

- Updated dependencies [[`eafdb7d47`](https://github.com/nextui-org/nextui/commit/eafdb7d475a7fcaa7671af77e86fcdf62f14ae00)]:
  - @nextui-org/listbox@2.2.0-beta.11
  - @nextui-org/popover@2.2.0-beta.10
  - @nextui-org/use-aria-button@2.1.0-beta.7
  - @nextui-org/use-aria-multiselect@2.3.0-beta.7
  - @nextui-org/aria-utils@2.1.0-beta.9
  - @nextui-org/scroll-shadow@2.2.0-beta.7
  - @nextui-org/spinner@2.1.0-beta.8

## 2.3.0-beta.14

### Patch Changes

- Updated dependencies [[`256d46277`](https://github.com/nextui-org/nextui/commit/256d462771c19d6ca5b969d0ec44419fb560f0ac)]:
  - @nextui-org/listbox@2.2.0-beta.10
  - @nextui-org/popover@2.2.0-beta.9
  - @nextui-org/scroll-shadow@2.2.0-beta.7
  - @nextui-org/spinner@2.1.0-beta.7

## 2.3.0-beta.13

### Patch Changes

- [#4126](https://github.com/nextui-org/nextui/pull/4126) [`9e8beabab`](https://github.com/nextui-org/nextui/commit/9e8beababea60dc499cc0989a0720fe25a10a823) Thanks [@tianenpang](https://github.com/tianenpang)! - Fix the label placement when the `Select` has a `placeholder` or `description`.

- Updated dependencies []:
  - @nextui-org/listbox@2.2.0-beta.9
  - @nextui-org/popover@2.2.0-beta.9
  - @nextui-org/scroll-shadow@2.2.0-beta.7
  - @nextui-org/spinner@2.1.0-beta.7

## 2.3.0-beta.12

### Patch Changes

- Updated dependencies []:
  - @nextui-org/listbox@2.2.0-beta.9
  - @nextui-org/popover@2.2.0-beta.9
  - @nextui-org/scroll-shadow@2.2.0-beta.7
  - @nextui-org/aria-utils@2.1.0-beta.8

## 2.3.0-beta.11

### Patch Changes

- Updated dependencies [[`b9d5d4925`](https://github.com/nextui-org/nextui/commit/b9d5d492519778a4bf071748ec9f2b4e25d8373f)]:
  - @nextui-org/listbox@2.2.0-beta.8
  - @nextui-org/popover@2.2.0-beta.8
  - @nextui-org/scroll-shadow@2.2.0-beta.7
  - @nextui-org/spinner@2.1.0-beta.7

## 2.3.0-beta.10

### Patch Changes

- [#4092](https://github.com/nextui-org/nextui/pull/4092) [`528668db8`](https://github.com/nextui-org/nextui/commit/528668db85b98b46473cb1e214780b7468cdadba) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Test new runner

- Updated dependencies [[`528668db8`](https://github.com/nextui-org/nextui/commit/528668db85b98b46473cb1e214780b7468cdadba)]:
  - @nextui-org/listbox@2.2.0-beta.7
  - @nextui-org/popover@2.2.0-beta.8
  - @nextui-org/scroll-shadow@2.2.0-beta.7
  - @nextui-org/spinner@2.1.0-beta.7
  - @nextui-org/use-aria-button@2.1.0-beta.6
  - @nextui-org/use-aria-multiselect@2.3.0-beta.6
  - @nextui-org/use-safe-layout-effect@2.0.7-beta.4
  - @nextui-org/aria-utils@2.1.0-beta.7
  - @nextui-org/react-utils@2.0.18-beta.7
  - @nextui-org/shared-icons@2.0.10-beta.6
  - @nextui-org/shared-utils@2.0.9-beta.7

## 2.3.0-beta.9

### Patch Changes

- [#4086](https://github.com/nextui-org/nextui/pull/4086) [`f69fe47b5`](https://github.com/nextui-org/nextui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pnpm clean

- Updated dependencies [[`f69fe47b5`](https://github.com/nextui-org/nextui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb)]:
  - @nextui-org/listbox@2.2.0-beta.6
  - @nextui-org/popover@2.2.0-beta.7
  - @nextui-org/scroll-shadow@2.2.0-beta.6
  - @nextui-org/spinner@2.1.0-beta.6
  - @nextui-org/use-aria-button@2.1.0-beta.5
  - @nextui-org/use-aria-multiselect@2.3.0-beta.5
  - @nextui-org/use-safe-layout-effect@2.0.7-beta.3
  - @nextui-org/aria-utils@2.1.0-beta.6
  - @nextui-org/react-utils@2.0.18-beta.6
  - @nextui-org/shared-icons@2.0.10-beta.5
  - @nextui-org/shared-utils@2.0.9-beta.6

## 2.3.0-beta.8

### Patch Changes

- [#4083](https://github.com/nextui-org/nextui/pull/4083) [`35058262c`](https://github.com/nextui-org/nextui/commit/35058262c61628fb42907f529c4417886aa12bb2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix build

- Updated dependencies [[`35058262c`](https://github.com/nextui-org/nextui/commit/35058262c61628fb42907f529c4417886aa12bb2)]:
  - @nextui-org/listbox@2.2.0-beta.5
  - @nextui-org/popover@2.2.0-beta.6
  - @nextui-org/scroll-shadow@2.2.0-beta.5
  - @nextui-org/spinner@2.1.0-beta.5
  - @nextui-org/use-aria-button@2.1.0-beta.4
  - @nextui-org/use-aria-multiselect@2.3.0-beta.4
  - @nextui-org/use-safe-layout-effect@2.0.7-beta.2
  - @nextui-org/aria-utils@2.1.0-beta.5
  - @nextui-org/react-utils@2.0.18-beta.5
  - @nextui-org/shared-icons@2.0.10-beta.4
  - @nextui-org/shared-utils@2.0.9-beta.5

## 2.3.0-beta.7

### Patch Changes

- Updated dependencies [[`0f55c491b`](https://github.com/nextui-org/nextui/commit/0f55c491b73da8944f9b38f2ad7486d1b89f8b7a)]:
  - @nextui-org/shared-icons@2.0.10-beta.3
  - @nextui-org/listbox@2.2.0-beta.4
  - @nextui-org/popover@2.2.0-beta.5
  - @nextui-org/scroll-shadow@2.2.0-beta.4
  - @nextui-org/spinner@2.1.0-beta.4

## 2.3.0-beta.6

### Patch Changes

- Updated dependencies [[`5339b2571`](https://github.com/nextui-org/nextui/commit/5339b2571e6d73ca6efe2acd34d88669419db9f7)]:
  - @nextui-org/shared-utils@2.0.9-beta.4
  - @nextui-org/listbox@2.2.0-beta.4
  - @nextui-org/popover@2.2.0-beta.5
  - @nextui-org/scroll-shadow@2.2.0-beta.4
  - @nextui-org/spinner@2.1.0-beta.4
  - @nextui-org/aria-utils@2.1.0-beta.4
  - @nextui-org/react-utils@2.0.18-beta.4

## 2.3.0-beta.5

### Patch Changes

- [#4010](https://github.com/nextui-org/nextui/pull/4010) [`ef432eb53`](https://github.com/nextui-org/nextui/commit/ef432eb539714fded6cab86a2185956fb103e0df) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - framer-motion alpha version added

- Updated dependencies [[`ef432eb53`](https://github.com/nextui-org/nextui/commit/ef432eb539714fded6cab86a2185956fb103e0df)]:
  - @nextui-org/listbox@2.2.0-beta.3
  - @nextui-org/popover@2.2.0-beta.4
  - @nextui-org/scroll-shadow@2.2.0-beta.3
  - @nextui-org/spinner@2.1.0-beta.3
  - @nextui-org/use-aria-button@2.1.0-beta.3
  - @nextui-org/use-aria-multiselect@2.3.0-beta.3
  - @nextui-org/use-safe-layout-effect@2.0.7-beta.1
  - @nextui-org/aria-utils@2.1.0-beta.3
  - @nextui-org/react-utils@2.0.18-beta.3
  - @nextui-org/shared-icons@2.0.10-beta.2
  - @nextui-org/shared-utils@2.0.9-beta.3

## 2.3.0-beta.4

### Patch Changes

- [#4008](https://github.com/nextui-org/nextui/pull/4008) [`7c1c0dd8f`](https://github.com/nextui-org/nextui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React 19 added to peerDeps

- Updated dependencies [[`7c1c0dd8f`](https://github.com/nextui-org/nextui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89)]:
  - @nextui-org/listbox@2.2.0-beta.2
  - @nextui-org/popover@2.2.0-beta.3
  - @nextui-org/scroll-shadow@2.2.0-beta.2
  - @nextui-org/spinner@2.1.0-beta.2
  - @nextui-org/use-aria-button@2.1.0-beta.2
  - @nextui-org/use-aria-multiselect@2.3.0-beta.2
  - @nextui-org/use-safe-layout-effect@2.0.7-beta.0
  - @nextui-org/aria-utils@2.1.0-beta.2
  - @nextui-org/react-utils@2.0.18-beta.2
  - @nextui-org/shared-icons@2.0.10-beta.1
  - @nextui-org/shared-utils@2.0.9-beta.2

## 2.3.0-beta.3

### Patch Changes

- Updated dependencies [[`563c1585a`](https://github.com/nextui-org/nextui/commit/563c1585a3c1a32e8272ec4641cfabeaaac3296c)]:
  - @nextui-org/popover@2.2.0-beta.2

## 2.3.0-beta.2

### Patch Changes

- [#3966](https://github.com/nextui-org/nextui/pull/3966) [`a2d653137`](https://github.com/nextui-org/nextui/commit/a2d653137d61465a88dfa3830bb3a44e3a7faa87) Thanks [@mstfblci](https://github.com/mstfblci)! - - Fixed a UI sliding issue caused by the helper wrapper being rendered when `isInvalid` was false but `errorMessage` was present

- Updated dependencies []:
  - @nextui-org/popover@2.2.0-beta.1
  - @nextui-org/listbox@2.2.0-beta.1

## 2.3.0-beta.1

### Patch Changes

- [#3990](https://github.com/nextui-org/nextui/pull/3990) [`cb5bc4c74`](https://github.com/nextui-org/nextui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Beta 1

- Updated dependencies [[`cb5bc4c74`](https://github.com/nextui-org/nextui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85)]:
  - @nextui-org/listbox@2.2.0-beta.1
  - @nextui-org/popover@2.2.0-beta.1
  - @nextui-org/scroll-shadow@2.2.0-beta.1
  - @nextui-org/spinner@2.1.0-beta.1
  - @nextui-org/use-aria-button@2.1.0-beta.1
  - @nextui-org/use-aria-multiselect@2.3.0-beta.1
  - @nextui-org/aria-utils@2.1.0-beta.1
  - @nextui-org/react-utils@2.0.18-beta.1
  - @nextui-org/shared-icons@2.0.10-beta.0
  - @nextui-org/shared-utils@2.0.9-beta.1

## 2.3.0-beta.0

### Minor Changes

- [#3732](https://github.com/nextui-org/nextui/pull/3732) [`67ea2f65e`](https://github.com/nextui-org/nextui/commit/67ea2f65e17f913bdffae4690586a6ae202c8f7d) Thanks [@ryo-manba](https://github.com/ryo-manba)! - update react-aria version

### Patch Changes

- [#3853](https://github.com/nextui-org/nextui/pull/3853) [`488a18f52`](https://github.com/nextui-org/nextui/commit/488a18f525465817ce56e81db8e502399a7572b7) Thanks [@macci001](https://github.com/macci001)! - update label placement in Select to use `shouldLabelBeOutside` instead of `isOutsideLeft`, resolving multiline label placement issues (#3841).

- [#3523](https://github.com/nextui-org/nextui/pull/3523) [`3f0d81b56`](https://github.com/nextui-org/nextui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb) Thanks [@wingkwong](https://github.com/wingkwong)! - update `framer-motion` versions

- Updated dependencies [[`0cf91395c`](https://github.com/nextui-org/nextui/commit/0cf91395c7c66a69fb05c7fca4a30cbad9e1e0f8), [`a2e562b03`](https://github.com/nextui-org/nextui/commit/a2e562b03f79b52b0b35f07104b3585ea05e2cb6), [`781b85566`](https://github.com/nextui-org/nextui/commit/781b85566ee5eac3f505625462c4f5f14e36ed3a), [`67ea2f65e`](https://github.com/nextui-org/nextui/commit/67ea2f65e17f913bdffae4690586a6ae202c8f7d), [`38a54ab49`](https://github.com/nextui-org/nextui/commit/38a54ab497781e17799b37f0061ba50f2dc44e09), [`af3c4f706`](https://github.com/nextui-org/nextui/commit/af3c4f706bb88eae02eee594a6db68cdd33bbe88), [`ae73de1a6`](https://github.com/nextui-org/nextui/commit/ae73de1a61c26e78235ce2d4c38159d486b55d56), [`ad6393ab3`](https://github.com/nextui-org/nextui/commit/ad6393ab33362119203455ef5c8ffbfe1ffa96a1), [`3f0d81b56`](https://github.com/nextui-org/nextui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb), [`cb1b3135b`](https://github.com/nextui-org/nextui/commit/cb1b3135bc7e811c9c2e163d4778f9f6eb2ef8c8), [`a5cac4561`](https://github.com/nextui-org/nextui/commit/a5cac45619e529cf9850f02f416b6bc7cba77f3f), [`d90ad05b1`](https://github.com/nextui-org/nextui/commit/d90ad05b13b36617009cb0e5f57f299aa7bb7bd0), [`a0d7141db`](https://github.com/nextui-org/nextui/commit/a0d7141db314c6bea27df6b8beb15dae3b1bcb93), [`9f6839faf`](https://github.com/nextui-org/nextui/commit/9f6839faf9fe05c766571bcb71028bd3236d6e3a), [`3f0d81b56`](https://github.com/nextui-org/nextui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb), [`3f0d81b56`](https://github.com/nextui-org/nextui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb), [`8a33eabb2`](https://github.com/nextui-org/nextui/commit/8a33eabb2583202fcc8fbc33e8f2ed23bb45f1a4), [`559436d46`](https://github.com/nextui-org/nextui/commit/559436d462bdb8739d8c817d1aa98607969d8a07)]:
  - @nextui-org/theme@2.3.0-beta.0
  - @nextui-org/listbox@2.2.0-beta.0
  - @nextui-org/popover@2.2.0-beta.0
  - @nextui-org/scroll-shadow@2.2.0-beta.0
  - @nextui-org/spinner@2.1.0-beta.0
  - @nextui-org/system@2.3.0-beta.0
  - @nextui-org/use-aria-button@2.1.0-beta.0
  - @nextui-org/use-aria-multiselect@2.3.0-beta.0
  - @nextui-org/aria-utils@2.1.0-beta.0
  - @nextui-org/shared-utils@2.0.9-beta.0
  - @nextui-org/react-utils@2.0.18-beta.0

## 2.2.7

### Patch Changes

- [#3759](https://github.com/nextui-org/nextui/pull/3759) [`229388422`](https://github.com/nextui-org/nextui/commit/2293884229541e363b1983fea88ba6e3bee6be14) Thanks [@wingkwong](https://github.com/wingkwong)! - rollback pr3467. rescheduled to v2.5.0.

- Updated dependencies [[`4c01d1824`](https://github.com/nextui-org/nextui/commit/4c01d1824d4dde22d89232968a3a4c48fe04678f), [`229388422`](https://github.com/nextui-org/nextui/commit/2293884229541e363b1983fea88ba6e3bee6be14)]:
  - @nextui-org/popover@2.1.29
  - @nextui-org/use-aria-multiselect@2.2.5
  - @nextui-org/aria-utils@2.0.26
  - @nextui-org/listbox@2.1.27
  - @nextui-org/scroll-shadow@2.1.20
  - @nextui-org/spinner@2.0.34

## 2.2.6

### Patch Changes

- [#3568](https://github.com/nextui-org/nextui/pull/3568) [`5c8cc7a42`](https://github.com/nextui-org/nextui/commit/5c8cc7a42d1e7a7957c0273ab21555f01d5bac8f) Thanks [@sohan01fw](https://github.com/sohan01fw)! - Fixed toggle issue while clicking on label of select component unexpectedly open and close the model instantly. The removal of code block containing `group-data-[filled=true]:pointer-events-auto` prevent from any unwanted user interactions and resolve the flickering issue (#3558)

- [#3598](https://github.com/nextui-org/nextui/pull/3598) [`74792f7bf`](https://github.com/nextui-org/nextui/commit/74792f7bff9ffe735d3954e01b5383d969a51caf) Thanks [@wingkwong](https://github.com/wingkwong)! - added missing onChange when there are more than 300 items (#3455)

- [#3467](https://github.com/nextui-org/nextui/pull/3467) [`123b7fbc9`](https://github.com/nextui-org/nextui/commit/123b7fbc9fb51613d7568572a00982ad230d02ae) Thanks [@chirokas](https://github.com/chirokas)! - Refactor overlays to reduce its complexity, while improving stability.

- Updated dependencies [[`123b7fbc9`](https://github.com/nextui-org/nextui/commit/123b7fbc9fb51613d7568572a00982ad230d02ae), [`d621b2923`](https://github.com/nextui-org/nextui/commit/d621b2923e7c90e73bea996e5918b744223e896c), [`19c331be7`](https://github.com/nextui-org/nextui/commit/19c331be75f1d03048c7b2dc92c2c9b62865cc11), [`f36df4362`](https://github.com/nextui-org/nextui/commit/f36df4362f572e8e233d4357f43600265cd5b8d5)]:
  - @nextui-org/popover@2.1.28
  - @nextui-org/use-aria-multiselect@2.2.4
  - @nextui-org/listbox@2.1.26
  - @nextui-org/shared-utils@2.0.8
  - @nextui-org/scroll-shadow@2.1.20
  - @nextui-org/spinner@2.0.34
  - @nextui-org/react-utils@2.0.17

## 2.2.5

### Patch Changes

- [#3512](https://github.com/nextui-org/nextui/pull/3512) [`2d2d300a1`](https://github.com/nextui-org/nextui/commit/2d2d300a12dbe20ca7ebd125daf3dce74efcbf34) Thanks [@wingkwong](https://github.com/wingkwong)! - fix conflicting versions in npm

- Updated dependencies [[`2d2d300a1`](https://github.com/nextui-org/nextui/commit/2d2d300a12dbe20ca7ebd125daf3dce74efcbf34)]:
  - @nextui-org/listbox@2.1.25
  - @nextui-org/popover@2.1.27
  - @nextui-org/scroll-shadow@2.1.19
  - @nextui-org/spinner@2.0.33
  - @nextui-org/use-aria-button@2.0.10
  - @nextui-org/use-aria-multiselect@2.2.3
  - @nextui-org/use-safe-layout-effect@2.0.6
  - @nextui-org/aria-utils@2.0.24
  - @nextui-org/react-utils@2.0.16
  - @nextui-org/shared-icons@2.0.9
  - @nextui-org/shared-utils@2.0.7

## 2.2.4

### Patch Changes

- Updated dependencies []:
  - @nextui-org/spinner@2.0.32
  - @nextui-org/listbox@2.1.24
  - @nextui-org/popover@2.1.26
  - @nextui-org/scroll-shadow@2.1.18
  - @nextui-org/aria-utils@2.0.23

## 2.2.3

### Patch Changes

- [#3336](https://github.com/nextui-org/nextui/pull/3336) [`0cdfdb48b`](https://github.com/nextui-org/nextui/commit/0cdfdb48bcb7eecb752fc6a3033d3bdd2335872b) Thanks [@winchesHe](https://github.com/winchesHe)! - Fix onSelectionChange type incorrect (#2512)

- [#3374](https://github.com/nextui-org/nextui/pull/3374) [`7cc1bd78a`](https://github.com/nextui-org/nextui/commit/7cc1bd78a30045f2e4370df5738ec3e4ae3933f3) Thanks [@wingkwong](https://github.com/wingkwong)! - fixed select closing issue with selector button (#3276)

- [#3368](https://github.com/nextui-org/nextui/pull/3368) [`1cd64b2e2`](https://github.com/nextui-org/nextui/commit/1cd64b2e2e7b0abeac1933ae58e0de997ba78fc4) Thanks [@ryo-manba](https://github.com/ryo-manba)! - Fixed import HiddenSelect and UseSelectProps (#3356)

- Updated dependencies [[`60bb09fe6`](https://github.com/nextui-org/nextui/commit/60bb09fe6455475a16225e776348e9acf0537f9b), [`0462dde0a`](https://github.com/nextui-org/nextui/commit/0462dde0a752e5ee5341c372834be5496296a6cc), [`f5d94f96e`](https://github.com/nextui-org/nextui/commit/f5d94f96e4cffed1d4aeef971c89f8d283effd49), [`444d320db`](https://github.com/nextui-org/nextui/commit/444d320dbc146399eb937c219ce983d427675425)]:
  - @nextui-org/aria-utils@2.0.22
  - @nextui-org/popover@2.1.25
  - @nextui-org/shared-utils@2.0.6
  - @nextui-org/listbox@2.1.23
  - @nextui-org/scroll-shadow@2.1.18
  - @nextui-org/spinner@2.0.31
  - @nextui-org/react-utils@2.0.15

## 2.2.2

### Patch Changes

- [#3177](https://github.com/nextui-org/nextui/pull/3177) [`a0d6a77ef`](https://github.com/nextui-org/nextui/commit/a0d6a77efbe917df406bb309cbd1750629534eaf) Thanks [@wingkwong](https://github.com/wingkwong)! - Add missing `data-invalid` attribute (#3149)

- [#3240](https://github.com/nextui-org/nextui/pull/3240) [`47c2472fb`](https://github.com/nextui-org/nextui/commit/47c2472fb22bfe1c0c357b5ba12e5606eba0d65b) Thanks [@wingkwong](https://github.com/wingkwong)! - bump react-aria dependencies

- [#3157](https://github.com/nextui-org/nextui/pull/3157) [`a06422f37`](https://github.com/nextui-org/nextui/commit/a06422f373a13a0cf9f5fada394dec4739ee57e3) Thanks [@wingkwong](https://github.com/wingkwong)! - set empty string instead of undefined for unsetting value (#3156)

- Updated dependencies [[`47c2472fb`](https://github.com/nextui-org/nextui/commit/47c2472fb22bfe1c0c357b5ba12e5606eba0d65b), [`47c2472fb`](https://github.com/nextui-org/nextui/commit/47c2472fb22bfe1c0c357b5ba12e5606eba0d65b), [`3500147d7`](https://github.com/nextui-org/nextui/commit/3500147d7fbe53bc01ae24749fdeaf87c37c0d12), [`47c2472fb`](https://github.com/nextui-org/nextui/commit/47c2472fb22bfe1c0c357b5ba12e5606eba0d65b), [`b9bb06ff3`](https://github.com/nextui-org/nextui/commit/b9bb06ff37f99bfc438e848706ec79b4c7b7c5d3)]:
  - @nextui-org/popover@2.1.24
  - @nextui-org/aria-utils@2.0.21
  - @nextui-org/shared-icons@2.0.8
  - @nextui-org/listbox@2.1.22
  - @nextui-org/use-aria-button@2.0.9
  - @nextui-org/use-aria-multiselect@2.2.2
  - @nextui-org/react-utils@2.0.14
  - @nextui-org/scroll-shadow@2.1.17
  - @nextui-org/spinner@2.0.30

## 2.2.1

### Patch Changes

- [#3119](https://github.com/nextui-org/nextui/pull/3119) [`685995a12`](https://github.com/nextui-org/nextui/commit/685995a125cc3db26c6adb67ed9f7245b87e792a) Thanks [@wingkwong](https://github.com/wingkwong)! - bump `@react-aria/utils` version to `3.24.1` and bump `@react-types/shared` to `3.23.1`

- Updated dependencies [[`685995a12`](https://github.com/nextui-org/nextui/commit/685995a125cc3db26c6adb67ed9f7245b87e792a)]:
  - @nextui-org/listbox@2.1.21
  - @nextui-org/popover@2.1.23
  - @nextui-org/use-aria-button@2.0.8
  - @nextui-org/use-aria-multiselect@2.2.1
  - @nextui-org/aria-utils@2.0.20
  - @nextui-org/scroll-shadow@2.1.16
  - @nextui-org/spinner@2.0.29

## 2.2.0

### Minor Changes

- [#2987](https://github.com/nextui-org/nextui/pull/2987) [`540aa2124`](https://github.com/nextui-org/nextui/commit/540aa2124b45b65a40e73f5aea2b90405fe1fe9a) Thanks [@ryo-manba](https://github.com/ryo-manba)! - Change validationBehavior from native to aria by default, with the option to change via props.

### Patch Changes

- [#2854](https://github.com/nextui-org/nextui/pull/2854) [`3b14c21e0`](https://github.com/nextui-org/nextui/commit/3b14c21e02fedf15d7d22e911109dac60c4e780e) Thanks [@wingkwong](https://github.com/wingkwong)! - Revise popover-based focus behaviours (#2849, #2834, #2779, #2962, #2872, #2974, #1920, #1287, #3060)

- [#2953](https://github.com/nextui-org/nextui/pull/2953) [`c8f792ccd`](https://github.com/nextui-org/nextui/commit/c8f792ccd78a80000e6f5b15e6f22cac947fd531) Thanks [@ryo-manba](https://github.com/ryo-manba)! - Fix update type definition to prevent primitive values as items (#2938)

- [#2937](https://github.com/nextui-org/nextui/pull/2937) [`a2133009f`](https://github.com/nextui-org/nextui/commit/a2133009f73aa728a0e5deeb9b742aa1defd4de2) Thanks [@ryo-manba](https://github.com/ryo-manba)! - Fix onSelectionChange can handle number (#2926)

- [#3081](https://github.com/nextui-org/nextui/pull/3081) [`31bfaebe2`](https://github.com/nextui-org/nextui/commit/31bfaebe2c53b0a3b9d18c65db4089e6044fe9dc) Thanks [@ryo-manba](https://github.com/ryo-manba)! - Fix: display placeholder text when unselected for controlled (#3062)

- [#2929](https://github.com/nextui-org/nextui/pull/2929) [`422770cc6`](https://github.com/nextui-org/nextui/commit/422770cc6bcdd1d4c51257654ab718f3c19d6cb2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Add support for disabling the animations globally.

- [#3013](https://github.com/nextui-org/nextui/pull/3013) [`06ecd213c`](https://github.com/nextui-org/nextui/commit/06ecd213cf85db2dfaa5fc26c1fed62dcb5fbc85) Thanks [@kosmotema](https://github.com/kosmotema)! - make the VisuallyHidden `elementType` as span when the default parent element accepts only phrasing elements

- Updated dependencies [[`3b14c21e0`](https://github.com/nextui-org/nextui/commit/3b14c21e02fedf15d7d22e911109dac60c4e780e), [`c8f792ccd`](https://github.com/nextui-org/nextui/commit/c8f792ccd78a80000e6f5b15e6f22cac947fd531), [`a2133009f`](https://github.com/nextui-org/nextui/commit/a2133009f73aa728a0e5deeb9b742aa1defd4de2), [`422770cc6`](https://github.com/nextui-org/nextui/commit/422770cc6bcdd1d4c51257654ab718f3c19d6cb2), [`540aa2124`](https://github.com/nextui-org/nextui/commit/540aa2124b45b65a40e73f5aea2b90405fe1fe9a)]:
  - @nextui-org/popover@2.1.22
  - @nextui-org/aria-utils@2.0.19
  - @nextui-org/listbox@2.1.20
  - @nextui-org/use-aria-multiselect@2.2.0
  - @nextui-org/scroll-shadow@2.1.16
  - @nextui-org/spinner@2.0.29

## 2.1.27

### Patch Changes

- Updated dependencies []:
  - @nextui-org/popover@2.1.21
  - @nextui-org/listbox@2.1.19
  - @nextui-org/scroll-shadow@2.1.16
  - @nextui-org/spinner@2.0.28

## 2.1.26

### Patch Changes

- Updated dependencies [[`183a4a6cf`](https://github.com/nextui-org/nextui/commit/183a4a6cfda193a076a4a30550ab93b72d51002d), [`eccc2f2f3`](https://github.com/nextui-org/nextui/commit/eccc2f2f3d856eefb2cc7c07b94e1c4cefd4d7d0)]:
  - @nextui-org/popover@2.1.20
  - @nextui-org/aria-utils@2.0.18
  - @nextui-org/react-utils@2.0.13
  - @nextui-org/listbox@2.1.19
  - @nextui-org/scroll-shadow@2.1.16
  - @nextui-org/spinner@2.0.28

## 2.1.25

### Patch Changes

- Updated dependencies [[`9e5dd8ce3`](https://github.com/nextui-org/nextui/commit/9e5dd8ce37c94c9ca1ba7b2049a6e55f1803fee9)]:
  - @nextui-org/popover@2.1.19

## 2.1.24

### Patch Changes

- Updated dependencies [[`f89356691`](https://github.com/nextui-org/nextui/commit/f89356691cecb8e54f5f820b2b4491537e7c11f3)]:
  - @nextui-org/popover@2.1.18

## 2.1.23

### Patch Changes

- Updated dependencies []:
  - @nextui-org/listbox@2.1.18
  - @nextui-org/popover@2.1.17
  - @nextui-org/scroll-shadow@2.1.15
  - @nextui-org/aria-utils@2.0.17
  - @nextui-org/spinner@2.0.27
  - @nextui-org/react-utils@2.0.12

## 2.1.22

### Patch Changes

- [#2618](https://github.com/nextui-org/nextui/pull/2618) [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.3.0

- [#2618](https://github.com/nextui-org/nextui/pull/2618) [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fixed the issue where only two keyframes were supported with spring and inertia animations.

- [#2618](https://github.com/nextui-org/nextui/pull/2618) [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Calendar component added

  - objectToDeps function applied all across components
  - `useMeasure` hook added
  - `useIntersectionObserver` hook added
  - `framer-transitions` renamed to `framer-utils`
  - `ResizablePanel` component added to `framer-utils`
  - `test-utils` updated

- [#2556](https://github.com/nextui-org/nextui/pull/2556) [`888d86184`](https://github.com/nextui-org/nextui/commit/888d8618410741c7e00500ee812c6431e5239877) Thanks [@wingkwong](https://github.com/wingkwong)! - Fixed isFilled & hasValue logic for state.selectedItems in select

- [#2618](https://github.com/nextui-org/nextui/pull/2618) [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fixed the bug of positioning the label in the `Select` component if the description field was used

- [#2485](https://github.com/nextui-org/nextui/pull/2485) [`aab1f19a9`](https://github.com/nextui-org/nextui/commit/aab1f19a96f0b07ee064bb1ccbdc782bd288fd8a) Thanks [@mrbadri](https://github.com/mrbadri)! - add RTL support to the select component

- [#2536](https://github.com/nextui-org/nextui/pull/2536) [`2b9f89023`](https://github.com/nextui-org/nextui/commit/2b9f89023ac087016083dcc205703ae1b2bc9cb8) Thanks [@wingkwong](https://github.com/wingkwong)! - revise shouldCloseOnInteractOutside for FreeSoloPopover

- [#2618](https://github.com/nextui-org/nextui/pull/2618) [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fixed react-hook-form uncontrolled components (#1969)

- [#2649](https://github.com/nextui-org/nextui/pull/2649) [`e45843255`](https://github.com/nextui-org/nextui/commit/e4584325504fd728cb7177dd2619f1083d80819c) Thanks [@wingkwong](https://github.com/wingkwong)! - Fixed Disabled Select Allows Changes Using Blur + Keyboard (#2345)

- Updated dependencies [[`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14), [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14), [`dc0bcf13a`](https://github.com/nextui-org/nextui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14), [`a05aef0ac`](https://github.com/nextui-org/nextui/commit/a05aef0acb5a7b000c8131e8ba4f50f0adec01e5), [`a60c2d7b2`](https://github.com/nextui-org/nextui/commit/a60c2d7b22b3335084b4a846f9d39f00751e8c24), [`2b9f89023`](https://github.com/nextui-org/nextui/commit/2b9f89023ac087016083dcc205703ae1b2bc9cb8), [`c5049edfd`](https://github.com/nextui-org/nextui/commit/c5049edfde7edaee2081d70e581739be9dcae2f9), [`abf532b54`](https://github.com/nextui-org/nextui/commit/abf532b548235689fb37a3e79f07776ff52f6caf), [`8761168d3`](https://github.com/nextui-org/nextui/commit/8761168d3459cd83ce571f4e65eb8ea6db8516ef), [`eb51bf226`](https://github.com/nextui-org/nextui/commit/eb51bf226170e4bb37ae30990d1c3aa26d8c504b), [`7263daca0`](https://github.com/nextui-org/nextui/commit/7263daca08674338eb28529315070337ba0dfc17), [`2894aecca`](https://github.com/nextui-org/nextui/commit/2894aecca1a2ef0dfb3066b9b8df24ce48c99dae)]:
  - @nextui-org/listbox@2.1.17
  - @nextui-org/popover@2.1.16
  - @nextui-org/scroll-shadow@2.1.14
  - @nextui-org/spinner@2.0.26
  - @nextui-org/use-aria-button@2.0.7
  - @nextui-org/use-aria-multiselect@2.1.5
  - @nextui-org/aria-utils@2.0.16
  - @nextui-org/react-utils@2.0.11
  - @nextui-org/shared-icons@2.0.7
  - @nextui-org/shared-utils@2.0.5
  - @nextui-org/use-safe-layout-effect@2.0.5

## 2.1.21

### Patch Changes

- [#2028](https://github.com/nextui-org/nextui/pull/2028) [`0ba165f0f`](https://github.com/nextui-org/nextui/commit/0ba165f0fd2257f5b8302b32a9f5eb1ecde8d890) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1979 labelPlacement is outside when not having a label for input, autocomplete and select components.

- Updated dependencies [[`d8b0ef528`](https://github.com/nextui-org/nextui/commit/d8b0ef528b341b25c2032fdc4530956d1d15a5ba), [`0b5cde7bc`](https://github.com/nextui-org/nextui/commit/0b5cde7bc4fc71231eb117f44052db2efdbdc595), [`a235e324b`](https://github.com/nextui-org/nextui/commit/a235e324b9ee0c7d4f6af23b086860ac112ff633), [`01aedcf09`](https://github.com/nextui-org/nextui/commit/01aedcf09b63daafef9ff5e0465040c0c91c809e)]:
  - @nextui-org/use-aria-multiselect@2.1.4
  - @nextui-org/spinner@2.0.25
  - @nextui-org/popover@2.1.15
  - @nextui-org/listbox@2.1.16
  - @nextui-org/scroll-shadow@2.1.13

## 2.1.20

### Patch Changes

- Updated dependencies []:
  - @nextui-org/listbox@2.1.16
  - @nextui-org/popover@2.1.14
  - @nextui-org/scroll-shadow@2.1.12
  - @nextui-org/spinner@2.0.24
  - @nextui-org/aria-utils@2.0.15

## 2.1.19

### Patch Changes

- Updated dependencies [[`9189b3fbf`](https://github.com/nextui-org/nextui/commit/9189b3fbf2d6d6cc6566009c71b37d5fcc566291)]:
  - @nextui-org/shared-icons@2.0.6
  - @nextui-org/listbox@2.1.15
  - @nextui-org/popover@2.1.13
  - @nextui-org/scroll-shadow@2.1.12
  - @nextui-org/spinner@2.0.23
  - @nextui-org/aria-utils@2.0.14

## 2.1.18

### Patch Changes

- [#1914](https://github.com/nextui-org/nextui/pull/1914) [`7f6218b97`](https://github.com/nextui-org/nextui/commit/7f6218b97860d267f5208134948dfeadd04505d1) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1910 multiline select fixed, style improved.

- Updated dependencies [[`135cc21e6`](https://github.com/nextui-org/nextui/commit/135cc21e6f0f2bee1f19e7e5799b6cea8179b7f5)]:
  - @nextui-org/listbox@2.1.14
  - @nextui-org/popover@2.1.12
  - @nextui-org/scroll-shadow@2.1.12
  - @nextui-org/spinner@2.0.22

## 2.1.17

### Patch Changes

- [#1901](https://github.com/nextui-org/nextui/pull/1901) [`6a6d426b1`](https://github.com/nextui-org/nextui/commit/6a6d426b10fa7f92dfb20611e261347027393193) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Label position changed for Select and Input, this avoids to break the layout when having long descriptions and no placeholder
  - Input/Select styles improved, label opacity removed
- Updated dependencies []:
  - @nextui-org/popover@2.1.12
  - @nextui-org/listbox@2.1.13
  - @nextui-org/scroll-shadow@2.1.12
  - @nextui-org/spinner@2.0.22

## 2.1.16

### Patch Changes

- [#1877](https://github.com/nextui-org/nextui/pull/1877) [`44ed1056e`](https://github.com/nextui-org/nextui/commit/44ed1056e717c56633f60cf289f78e9c7b83b648) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Peer dependencies updated, changeset config changed to update peer dependencies only when out of range

- Updated dependencies [[`44ed1056e`](https://github.com/nextui-org/nextui/commit/44ed1056e717c56633f60cf289f78e9c7b83b648)]:
  - @nextui-org/scroll-shadow@2.1.12
  - @nextui-org/listbox@2.1.13
  - @nextui-org/popover@2.1.12
  - @nextui-org/spinner@2.0.22
  - @nextui-org/aria-utils@2.0.13

## 2.1.15

### Patch Changes

- [#1874](https://github.com/nextui-org/nextui/pull/1874) [`38af48faf`](https://github.com/nextui-org/nextui/commit/38af48faf5b62d2f81f2402f3d83d78991eb46e0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Peer dependencies updated to avoid the peer conflicts issue.

- Updated dependencies [[`38af48faf`](https://github.com/nextui-org/nextui/commit/38af48faf5b62d2f81f2402f3d83d78991eb46e0)]:
  - @nextui-org/scroll-shadow@2.1.11
  - @nextui-org/listbox@2.1.12
  - @nextui-org/popover@2.1.11
  - @nextui-org/spinner@2.0.21
  - @nextui-org/system@2.0.12
  - @nextui-org/aria-utils@2.0.12

## 2.1.14

### Patch Changes

- [#1869](https://github.com/nextui-org/nextui/pull/1869) [`e84158db6`](https://github.com/nextui-org/nextui/commit/e84158db620954b0f1d71206acbf3d46f43b0b89) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Select without label position fixed
  - Input helperWrapper slot is now relative to its parent
- Updated dependencies [[`e84158db6`](https://github.com/nextui-org/nextui/commit/e84158db620954b0f1d71206acbf3d46f43b0b89)]:
  - @nextui-org/theme@2.1.12
  - @nextui-org/popover@2.1.10
  - @nextui-org/listbox@2.1.11
  - @nextui-org/scroll-shadow@2.1.10
  - @nextui-org/spinner@2.0.20

## 2.1.13

### Patch Changes

- [#1865](https://github.com/nextui-org/nextui/pull/1865) [`1fd5049f5`](https://github.com/nextui-org/nextui/commit/1fd5049f5a0b852862e8ca1816f1e83507fdd8b5) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix multiline select and inputs with description/errorMessage

- Updated dependencies [[`1fd5049f5`](https://github.com/nextui-org/nextui/commit/1fd5049f5a0b852862e8ca1816f1e83507fdd8b5)]:
  - @nextui-org/theme@2.1.11
  - @nextui-org/listbox@2.1.11
  - @nextui-org/popover@2.1.10
  - @nextui-org/scroll-shadow@2.1.10
  - @nextui-org/spinner@2.0.20

## 2.1.12

### Patch Changes

- [`25e86fb41`](https://github.com/nextui-org/nextui/commit/25e86fb41770d3cdae6dfdb79306b78fa02d8187) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New version v2.2.0

- Updated dependencies [[`25e86fb41`](https://github.com/nextui-org/nextui/commit/25e86fb41770d3cdae6dfdb79306b78fa02d8187)]:
  - @nextui-org/listbox@2.1.11
  - @nextui-org/popover@2.1.10
  - @nextui-org/scroll-shadow@2.1.10
  - @nextui-org/spinner@2.0.20
  - @nextui-org/system@2.0.11
  - @nextui-org/theme@2.1.10
  - @nextui-org/use-aria-button@2.0.6
  - @nextui-org/use-aria-multiselect@2.1.3
  - @nextui-org/aria-utils@2.0.11
  - @nextui-org/react-utils@2.0.10
  - @nextui-org/shared-icons@2.0.5
  - @nextui-org/shared-utils@2.0.4

## 2.1.11

### Patch Changes

- [#1631](https://github.com/nextui-org/nextui/pull/1631) [`425a034bc`](https://github.com/nextui-org/nextui/commit/425a034bca4aa5a86cfe4bc47c084366a7ad7e87) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - validationState prop deprecated, "isInvalid" prop adjusted, invalid checkbox and radios state improved

- Updated dependencies [[`3aa86423a`](https://github.com/nextui-org/nextui/commit/3aa86423aa4b0c56d2e14772bc081f98a5fbdb05), [`425a034bc`](https://github.com/nextui-org/nextui/commit/425a034bca4aa5a86cfe4bc47c084366a7ad7e87)]:
  - @nextui-org/listbox@2.1.10
  - @nextui-org/theme@2.1.9
  - @nextui-org/popover@2.1.9
  - @nextui-org/spinner@2.0.19
  - @nextui-org/system@2.0.10
  - @nextui-org/scroll-shadow@2.1.9
  - @nextui-org/react-utils@2.0.9
  - @nextui-org/aria-utils@2.0.10

## 2.1.10

### Patch Changes

- [`8b3998909`](https://github.com/nextui-org/nextui/commit/8b39989090d9cd577e886edde01b081d37e65bb7) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Exported types fixed

- [#1600](https://github.com/nextui-org/nextui/pull/1600) [`b1b30b797`](https://github.com/nextui-org/nextui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix npm deploy

- Updated dependencies [[`8b3998909`](https://github.com/nextui-org/nextui/commit/8b39989090d9cd577e886edde01b081d37e65bb7), [`b1b30b797`](https://github.com/nextui-org/nextui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572)]:
  - @nextui-org/use-aria-multiselect@2.1.2
  - @nextui-org/listbox@2.1.9
  - @nextui-org/popover@2.1.8
  - @nextui-org/scroll-shadow@2.1.8
  - @nextui-org/spinner@2.0.18
  - @nextui-org/system@2.0.9
  - @nextui-org/theme@2.1.8
  - @nextui-org/use-aria-button@2.0.5
  - @nextui-org/aria-utils@2.0.9
  - @nextui-org/react-utils@2.0.8
  - @nextui-org/shared-icons@2.0.4
  - @nextui-org/shared-utils@2.0.3

## 2.1.9

### Patch Changes

- [#1589](https://github.com/nextui-org/nextui/pull/1589) [`1612532ee`](https://github.com/nextui-org/nextui/commit/1612532eeeabbc49165546b1a2e7aebf89e7a1c2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React aria packages upgraded

- Updated dependencies [[`a3be419cb`](https://github.com/nextui-org/nextui/commit/a3be419cb3c693ae8cace15f9a863274d759ddb1), [`5c30e0481`](https://github.com/nextui-org/nextui/commit/5c30e04811ef9f973d6b59107c909db72d9876b5), [`1612532ee`](https://github.com/nextui-org/nextui/commit/1612532eeeabbc49165546b1a2e7aebf89e7a1c2)]:
  - @nextui-org/theme@2.1.7
  - @nextui-org/use-aria-multiselect@2.1.1
  - @nextui-org/use-aria-button@2.0.4
  - @nextui-org/aria-utils@2.0.8
  - @nextui-org/listbox@2.1.8
  - @nextui-org/popover@2.1.7
  - @nextui-org/system@2.0.8
  - @nextui-org/scroll-shadow@2.1.7
  - @nextui-org/spinner@2.0.17

## 2.1.8

### Patch Changes

- Updated dependencies [[`7c8341035`](https://github.com/nextui-org/nextui/commit/7c8341035dbdd120cd78221b3cabab2e40e7478d)]:
  - @nextui-org/theme@2.1.6
  - @nextui-org/listbox@2.1.7
  - @nextui-org/popover@2.1.6
  - @nextui-org/scroll-shadow@2.1.6
  - @nextui-org/spinner@2.0.16

## 2.1.7

### Patch Changes

- Updated dependencies [[`d61428d9e`](https://github.com/nextui-org/nextui/commit/d61428d9e6c1c0590593fb1f0136e226051b7e23), [`4db10a47e`](https://github.com/nextui-org/nextui/commit/4db10a47e96ad8315b5b96c2ff15574ac0fdeecc)]:
  - @nextui-org/theme@2.1.5
  - @nextui-org/spinner@2.0.15
  - @nextui-org/system@2.0.7
  - @nextui-org/listbox@2.1.6
  - @nextui-org/popover@2.1.5
  - @nextui-org/scroll-shadow@2.1.5
  - @nextui-org/aria-utils@2.0.7

## 2.1.6

### Patch Changes

- [#1543](https://github.com/nextui-org/nextui/pull/1543) [`043b8420c`](https://github.com/nextui-org/nextui/commit/043b8420cfb659cbb6bb36404807ec3cc8ac8592) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1492 \n

  - Select and Input spaces fixed on helper wrapper
  - New select wrapper added `mainWrapper` which contains the helperWrapper and the trigger slots
  - Outside input with start content fixed

- Updated dependencies [[`043b8420c`](https://github.com/nextui-org/nextui/commit/043b8420cfb659cbb6bb36404807ec3cc8ac8592), [`a9e324b35`](https://github.com/nextui-org/nextui/commit/a9e324b3515bab9883f3911747351ee69f9afb9d), [`641bf0885`](https://github.com/nextui-org/nextui/commit/641bf0885b6af2d7f36f27d83716a441975a5ca5)]:
  - @nextui-org/theme@2.1.4
  - @nextui-org/listbox@2.1.5
  - @nextui-org/system@2.0.6
  - @nextui-org/popover@2.1.4
  - @nextui-org/scroll-shadow@2.1.4
  - @nextui-org/spinner@2.0.14
  - @nextui-org/aria-utils@2.0.6

## 2.1.5

### Patch Changes

- Updated dependencies [[`5702287e5`](https://github.com/nextui-org/nextui/commit/5702287e5622a8f0a0326c7cc0c200808c7971a8)]:
  - @nextui-org/theme@2.1.3
  - @nextui-org/listbox@2.1.4
  - @nextui-org/popover@2.1.3
  - @nextui-org/scroll-shadow@2.1.3
  - @nextui-org/spinner@2.0.13

## 2.1.4

### Patch Changes

- [#1472](https://github.com/nextui-org/nextui/pull/1472) [`ae9f300d4`](https://github.com/nextui-org/nextui/commit/ae9f300d4571aab367935d996fe95fbbfa36e22b) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1468 size prop fixed in Select component

## 2.1.3

### Patch Changes

- [#1463](https://github.com/nextui-org/nextui/pull/1463) [`904f53877`](https://github.com/nextui-org/nextui/commit/904f5387793cf8cc594d4ff8c32e378439a8e4fa) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React aria utils pkg updated

- Updated dependencies [[`904f53877`](https://github.com/nextui-org/nextui/commit/904f5387793cf8cc594d4ff8c32e378439a8e4fa)]:
  - @nextui-org/listbox@2.1.3

## 2.1.2

### Patch Changes

- [#1458](https://github.com/nextui-org/nextui/pull/1458) [`4e94c115`](https://github.com/nextui-org/nextui/commit/4e94c115281c2774424d687877e036a9af1bce01) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix dropdown trigger events and popover arrow styles

- Updated dependencies [[`4e94c115`](https://github.com/nextui-org/nextui/commit/4e94c115281c2774424d687877e036a9af1bce01)]:
  - @nextui-org/scroll-shadow@2.1.2
  - @nextui-org/listbox@2.1.2
  - @nextui-org/popover@2.1.2
  - @nextui-org/spinner@2.0.12
  - @nextui-org/theme@2.1.2

## 2.1.1

### Patch Changes

- Updated dependencies [[`cc839cdd`](https://github.com/nextui-org/nextui/commit/cc839cdd1fd54931bfba137e2f9b5e8007a7e47d)]:
  - @nextui-org/theme@2.1.1
  - @nextui-org/listbox@2.1.1
  - @nextui-org/popover@2.1.1
  - @nextui-org/scroll-shadow@2.1.1
  - @nextui-org/spinner@2.0.11

## 2.1.0

### Minor Changes

- [#1313](https://github.com/nextui-org/nextui/pull/1313) [`baec5502`](https://github.com/nextui-org/nextui/commit/baec55029de7f17ba84d3e6c8c98358fd1f2695e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New components:

  - Select
  - Listbox
  - ScrollShadow

### Patch Changes

- Updated dependencies [[`baec5502`](https://github.com/nextui-org/nextui/commit/baec55029de7f17ba84d3e6c8c98358fd1f2695e)]:
  - @nextui-org/use-aria-multiselect@2.1.0
  - @nextui-org/scroll-shadow@2.1.0
  - @nextui-org/listbox@2.1.0
  - @nextui-org/popover@2.1.0
  - @nextui-org/theme@2.1.0
  - @nextui-org/shared-icons@2.0.3
  - @nextui-org/spinner@2.0.10
  - @nextui-org/react-utils@2.0.7

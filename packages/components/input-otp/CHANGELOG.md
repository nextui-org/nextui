# @nextui-org/input-otp

## 2.1.0

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

- [#4224](https://github.com/nextui-org/nextui/pull/4224) [`26e478d`](https://github.com/nextui-org/nextui/commit/26e478dd937dedcaf41110171d971a8a3cf2ff52) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Added form support to input-otp, change default validationBehavior to "native" to avoid breaking changes, and fix select with form

- Updated dependencies [[`26e478d`](https://github.com/nextui-org/nextui/commit/26e478dd937dedcaf41110171d971a8a3cf2ff52), [`6c0213d`](https://github.com/nextui-org/nextui/commit/6c0213dfc805aa3c793763c0b25f53b2b80c24dc), [`5786897`](https://github.com/nextui-org/nextui/commit/5786897b9950d95c12351dacd2fb41bb1e298201)]:
  - @nextui-org/form@2.1.0
  - @nextui-org/react-utils@2.1.0
  - @nextui-org/shared-utils@2.1.0

## 2.0.1-beta.0

### Patch Changes

- [#4052](https://github.com/nextui-org/nextui/pull/4052) [`1d5b2b6c1`](https://github.com/nextui-org/nextui/commit/1d5b2b6c1f8672e7339a6f9dc66f0244d7bb2789) Thanks [@macci001](https://github.com/macci001)! - Adding new input-otp component.

- Updated dependencies [[`1d5b2b6c1`](https://github.com/nextui-org/nextui/commit/1d5b2b6c1f8672e7339a6f9dc66f0244d7bb2789)]:
  - @nextui-org/theme@2.3.0-beta.17

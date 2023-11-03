# @nextui-org/react-rsc-utils

## 2.0.10

### Patch Changes

- [`8217639fd`](https://github.com/nextui-org/nextui/commit/8217639fd49b844481aeeb688ea39e2d0ce05520) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New version V2.2.0

  - New component added: Slider #1686
  - New component added: Breadcrumbs #1794
  - New component: Single selection Autocomplete based on [useComboBox](https://react-spectrum.adobe.com/react-aria/useComboBox.html#usecombobox) and [useComboBoxState](https://react-spectrum.adobe.com/react-stately/useComboBoxState.html#usecomboboxstate)
  - React Aria [Client side router](https://react-spectrum.adobe.com/react-aria/routing.html) support added, this allows components such as Link, Tabs, Listbox and Dropdown items to be rendered as links and navigate using the proper navigation function for each framework. #1764
  - RTL Support added to Accordion. #1725
  - RTL Support added to Avatar & AvatarGroup components #1727
  - RTL Support added to ButtonGroup #1726
  - Spacing units changed from `px` to `rem` this improves the mobile components' sizes #1688
  - Tabs/Tab new prop added `shouldSelectOnPressUp` which is enabled by default `true`, this prop defines whether the tabs selection should occur on press up instead of press down. #1688
  - Chip font size changed to `text-tiny` on `sm` size. #1688
  - Button with only the icon now displays only the spinner during loading #1800
  - Popover open state fixed for blur/opaque backdrops #1812
  - The ScrollShadow API has been enhanced with new features. Users can now manage the `visibility` of shadows using the `visibility` and `onVisibilityChange` props. #1819
  - `emptyContent` property added to Listbox/Menu/Dropdown
  - `topContent` and `bottomContent` properties added to Listbox/Menu/Dropdown
  - `baseRef` added to Input, it allows to control the input's parent element ref
  - `tailwind-variants` upgraded to `v0.1.18` it includes slot variants control
  - Custom `usePress` implemented to fix the corner press issue, opened a PR and Issue on react-aria project https://github.com/adobe/react-spectrum/pull/5291
  - Custom `usePress` implemented across all NextUI interactive components
  - Input & Select label animations & position improved
  - react-aria packages and framer-motion upgraded
  - Generic items typescript support added to `Menu` and `DropdownMenu` #1691
  - Popover animation improved
  - Package dependencies were modified to not include the ones already installed through either global or individual installations. This reduces the individual package bundle size. #1848
  - Input outline removed on focus-visible
  - ButtonGroup radius prop fixed
  - `isActive` prop added to `NavbarMenuItem`
  - Pagination custom-items example fixed, key prop added
  - Collection Items are now supported by `extendVariants` function #1761
  - Transition added to menu/listbox items
  - `disableAutosize` prop added to Textarea, this disable the auto resize.
  - Textarea styles fixed
  - Textarea height style animated
  - `hoverOpacity` key added to themes object in the plugin
  - Button hover effect added

## 2.0.9

### Patch Changes

- [#1629](https://github.com/nextui-org/nextui/pull/1629) [`cdc30db14`](https://github.com/nextui-org/nextui/commit/cdc30db14c75d9c2e05d928e52c08a49cc1b6437) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1620 filterDomProps labelable prop is true by default

## 2.0.8

### Patch Changes

- [#1600](https://github.com/nextui-org/nextui/pull/1600) [`b1b30b797`](https://github.com/nextui-org/nextui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix npm deploy

## 2.0.7

### Patch Changes

- [#1313](https://github.com/nextui-org/nextui/pull/1313) [`baec5502`](https://github.com/nextui-org/nextui/commit/baec55029de7f17ba84d3e6c8c98358fd1f2695e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New components:

  - Select
  - Listbox
  - ScrollShadow

## 2.0.6

### Patch Changes

- [#1391](https://github.com/nextui-org/nextui/pull/1391) [`94d65df53`](https://github.com/nextui-org/nextui/commit/94d65df53392f0013438f4ca48716011e79a3c56) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - fix #1388 slot prop added to filter dom props.

## 2.0.5

### Patch Changes

- [#1365](https://github.com/nextui-org/nextui/pull/1365) [`fe03c42f`](https://github.com/nextui-org/nextui/commit/fe03c42fa144b5066ebc8ad39c144aeef437d2c6) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Update react aria types package

- [#1365](https://github.com/nextui-org/nextui/pull/1365) [`fe03c42f`](https://github.com/nextui-org/nextui/commit/fe03c42fa144b5066ebc8ad39c144aeef437d2c6) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pointer events added to the default filter dom props function event list

## 2.0.4

### Patch Changes

- [#1351](https://github.com/nextui-org/nextui/pull/1351) [`d13a14fa`](https://github.com/nextui-org/nextui/commit/d13a14facc1a92dac72e58a93e0452a86a2243c6) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - filterDOMProps function modified to filter non-default event/props this avoid passing non-valid props to HTML elements
  - NavbarMenu onMenuOpenChange open state modified, undefined type removed
  - keepContentMounted prop added to accordion and accordion item
  - Some bug fixes..

## 2.0.3

### Patch Changes

- [#1323](https://github.com/nextui-org/nextui/pull/1323) [`42001647`](https://github.com/nextui-org/nextui/commit/4200164712b6eb4b37a14fe9e005844ff770a180) Thanks [@tianenpang](https://github.com/tianenpang)! - Support for omit-event-names option.

## 2.0.2

### Patch Changes

- [`e3e13a09`](https://github.com/nextui-org/nextui/commit/e3e13a095f2347ff279c85e6a5d3798f36c6533f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New package created to exports system RSC-compatible functions
  Component exports changed to named exports

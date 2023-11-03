# @nextui-org/theme

## 2.2.0

### Minor Changes

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

## 2.1.9

### Patch Changes

- [#1631](https://github.com/nextui-org/nextui/pull/1631) [`425a034bc`](https://github.com/nextui-org/nextui/commit/425a034bca4aa5a86cfe4bc47c084366a7ad7e87) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - validationState prop deprecated, "isInvalid" prop adjusted, invalid checkbox and radios state improved

## 2.1.8

### Patch Changes

- [#1600](https://github.com/nextui-org/nextui/pull/1600) [`b1b30b797`](https://github.com/nextui-org/nextui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix npm deploy

## 2.1.7

### Patch Changes

- [#1563](https://github.com/nextui-org/nextui/pull/1563) [`a3be419cb`](https://github.com/nextui-org/nextui/commit/a3be419cb3c693ae8cace15f9a863274d759ddb1) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1561 Select bottom space removed when having helper components

- [#1590](https://github.com/nextui-org/nextui/pull/1590) [`5c30e0481`](https://github.com/nextui-org/nextui/commit/5c30e04811ef9f973d6b59107c909db72d9876b5) Thanks [@jguddas](https://github.com/jguddas)! - fix: set nowrap in chip

## 2.1.6

### Patch Changes

- [#1558](https://github.com/nextui-org/nextui/pull/1558) [`7c8341035`](https://github.com/nextui-org/nextui/commit/7c8341035dbdd120cd78221b3cabab2e40e7478d) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pagination changeset

## 2.1.5

### Patch Changes

- [#1555](https://github.com/nextui-org/nextui/pull/1555) [`d61428d9e`](https://github.com/nextui-org/nextui/commit/d61428d9e6c1c0590593fb1f0136e226051b7e23) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Tailwind variants upgraded to the latest version v0.1.14

- [`4db10a47e`](https://github.com/nextui-org/nextui/commit/4db10a47e96ad8315b5b96c2ff15574ac0fdeecc) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pagination changes reverted

## 2.1.4

### Patch Changes

- [#1543](https://github.com/nextui-org/nextui/pull/1543) [`043b8420c`](https://github.com/nextui-org/nextui/commit/043b8420cfb659cbb6bb36404807ec3cc8ac8592) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1492 \n

  - Select adn Input spaces fixed on helper wrapper
  - New select wrapper added `mainWrapper` which contains the helperWrapper and the trigger slots
  - Outside input with start content fixed

## 2.1.3

### Patch Changes

- [#1501](https://github.com/nextui-org/nextui/pull/1501) [`5702287e5`](https://github.com/nextui-org/nextui/commit/5702287e5622a8f0a0326c7cc0c200808c7971a8) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix Popover/Tooltip arrow color

## 2.1.2

### Patch Changes

- [#1458](https://github.com/nextui-org/nextui/pull/1458) [`4e94c115`](https://github.com/nextui-org/nextui/commit/4e94c115281c2774424d687877e036a9af1bce01) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix dropdown trigger events and popover arrow styles

## 2.1.1

### Patch Changes

- [#1455](https://github.com/nextui-org/nextui/pull/1455) [`cc839cdd`](https://github.com/nextui-org/nextui/commit/cc839cdd1fd54931bfba137e2f9b5e8007a7e47d) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix select close when clicking the label

## 2.1.0

### Minor Changes

- [#1313](https://github.com/nextui-org/nextui/pull/1313) [`baec5502`](https://github.com/nextui-org/nextui/commit/baec55029de7f17ba84d3e6c8c98358fd1f2695e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New components:

  - Select
  - Listbox
  - ScrollShadow

## 2.0.5

### Patch Changes

- [#1384](https://github.com/nextui-org/nextui/pull/1384) [`d0341020`](https://github.com/nextui-org/nextui/commit/d0341020e6d865ad3f0d3646fa70a24de75a722b) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1382 navbar with search input example, input main wrapper h-full class applied

## 2.0.4

### Patch Changes

- [#1301](https://github.com/nextui-org/nextui/pull/1301) [`d794225c`](https://github.com/nextui-org/nextui/commit/d794225cb75121db3a72f430739b4eaacd1cf8b7) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Plugin types adapted to work with latest version of postcss

## 2.0.3

### Patch Changes

- [`e3e13a09`](https://github.com/nextui-org/nextui/commit/e3e13a095f2347ff279c85e6a5d3798f36c6533f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New package created to exports system RSC-compatible functions
  Component exports changed to named exports

## 2.0.2

### Patch Changes

- [`459ac5ed`](https://github.com/nextui-org/nextui/commit/459ac5ed4537942517803ba14129226a791d6feb) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Modal

  Outside scroll fixed on mobile devices

  - Dropdown

  Next.js key destructuring warning fixed

## 2.0.1

### Patch Changes

- [`e940ec06`](https://github.com/nextui-org/nextui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Introducing NextUI v2.0

- [`e940ec06`](https://github.com/nextui-org/nextui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Introducing v2 - Readmes updated

# @nextui-org/progress

## 3.0.0

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

- Updated dependencies [[`8217639fd`](https://github.com/nextui-org/nextui/commit/8217639fd49b844481aeeb688ea39e2d0ce05520)]:
  - @nextui-org/system@2.1.0
  - @nextui-org/theme@2.2.0
  - @nextui-org/use-is-mounted@2.0.4
  - @nextui-org/react-utils@2.0.10
  - @nextui-org/shared-utils@2.0.4

## 2.0.21

### Patch Changes

- Updated dependencies [[`425a034bc`](https://github.com/nextui-org/nextui/commit/425a034bca4aa5a86cfe4bc47c084366a7ad7e87)]:
  - @nextui-org/theme@2.1.9
  - @nextui-org/system@2.0.10
  - @nextui-org/react-utils@2.0.9

## 2.0.20

### Patch Changes

- [#1600](https://github.com/nextui-org/nextui/pull/1600) [`b1b30b797`](https://github.com/nextui-org/nextui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix npm deploy

- Updated dependencies [[`b1b30b797`](https://github.com/nextui-org/nextui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572)]:
  - @nextui-org/system@2.0.9
  - @nextui-org/theme@2.1.8
  - @nextui-org/use-is-mounted@2.0.3
  - @nextui-org/react-utils@2.0.8
  - @nextui-org/shared-utils@2.0.3

## 2.0.19

### Patch Changes

- [#1589](https://github.com/nextui-org/nextui/pull/1589) [`1612532ee`](https://github.com/nextui-org/nextui/commit/1612532eeeabbc49165546b1a2e7aebf89e7a1c2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React aria packages upgraded

- Updated dependencies [[`a3be419cb`](https://github.com/nextui-org/nextui/commit/a3be419cb3c693ae8cace15f9a863274d759ddb1), [`5c30e0481`](https://github.com/nextui-org/nextui/commit/5c30e04811ef9f973d6b59107c909db72d9876b5), [`1612532ee`](https://github.com/nextui-org/nextui/commit/1612532eeeabbc49165546b1a2e7aebf89e7a1c2)]:
  - @nextui-org/theme@2.1.7
  - @nextui-org/system@2.0.8

## 2.0.18

### Patch Changes

- Updated dependencies [[`7c8341035`](https://github.com/nextui-org/nextui/commit/7c8341035dbdd120cd78221b3cabab2e40e7478d)]:
  - @nextui-org/theme@2.1.6

## 2.0.17

### Patch Changes

- Updated dependencies [[`d61428d9e`](https://github.com/nextui-org/nextui/commit/d61428d9e6c1c0590593fb1f0136e226051b7e23), [`4db10a47e`](https://github.com/nextui-org/nextui/commit/4db10a47e96ad8315b5b96c2ff15574ac0fdeecc)]:
  - @nextui-org/theme@2.1.5
  - @nextui-org/system@2.0.7

## 2.0.16

### Patch Changes

- Updated dependencies [[`043b8420c`](https://github.com/nextui-org/nextui/commit/043b8420cfb659cbb6bb36404807ec3cc8ac8592), [`641bf0885`](https://github.com/nextui-org/nextui/commit/641bf0885b6af2d7f36f27d83716a441975a5ca5)]:
  - @nextui-org/theme@2.1.4
  - @nextui-org/system@2.0.6

## 2.0.15

### Patch Changes

- Updated dependencies [[`5702287e5`](https://github.com/nextui-org/nextui/commit/5702287e5622a8f0a0326c7cc0c200808c7971a8)]:
  - @nextui-org/theme@2.1.3

## 2.0.14

### Patch Changes

- [#1458](https://github.com/nextui-org/nextui/pull/1458) [`4e94c115`](https://github.com/nextui-org/nextui/commit/4e94c115281c2774424d687877e036a9af1bce01) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix dropdown trigger events and popover arrow styles

- Updated dependencies [[`4e94c115`](https://github.com/nextui-org/nextui/commit/4e94c115281c2774424d687877e036a9af1bce01)]:
  - @nextui-org/theme@2.1.2

## 2.0.13

### Patch Changes

- Updated dependencies [[`cc839cdd`](https://github.com/nextui-org/nextui/commit/cc839cdd1fd54931bfba137e2f9b5e8007a7e47d)]:
  - @nextui-org/theme@2.1.1

## 2.0.12

### Patch Changes

- Updated dependencies [[`baec5502`](https://github.com/nextui-org/nextui/commit/baec55029de7f17ba84d3e6c8c98358fd1f2695e)]:
  - @nextui-org/theme@2.1.0
  - @nextui-org/react-utils@2.0.7

## 2.0.11

### Patch Changes

- Updated dependencies []:
  - @nextui-org/react-utils@2.0.6

## 2.0.10

### Patch Changes

- Updated dependencies [[`d0341020`](https://github.com/nextui-org/nextui/commit/d0341020e6d865ad3f0d3646fa70a24de75a722b)]:
  - @nextui-org/theme@2.0.5

## 2.0.9

### Patch Changes

- Updated dependencies []:
  - @nextui-org/react-utils@2.0.5

## 2.0.8

### Patch Changes

- [#1359](https://github.com/nextui-org/nextui/pull/1359) [`a30cec48`](https://github.com/nextui-org/nextui/commit/a30cec4810988fb1962f3a61e0fc0362de08b171) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - \n

  - react-aria packages updgraded to the latest version
  - image storybooks fixed
  - other bug fixes..

- Updated dependencies [[`a30cec48`](https://github.com/nextui-org/nextui/commit/a30cec4810988fb1962f3a61e0fc0362de08b171)]:
  - @nextui-org/system@2.0.5

## 2.0.7

### Patch Changes

- Updated dependencies [[`710395f3`](https://github.com/nextui-org/nextui/commit/710395f3a2ca44238332237a49e948c933abe63d)]:
  - @nextui-org/system@2.0.4

## 2.0.6

### Patch Changes

- Updated dependencies []:
  - @nextui-org/react-utils@2.0.4

## 2.0.5

### Patch Changes

- Updated dependencies []:
  - @nextui-org/react-utils@2.0.3

## 2.0.4

### Patch Changes

- [#1301](https://github.com/nextui-org/nextui/pull/1301) [`d794225c`](https://github.com/nextui-org/nextui/commit/d794225cb75121db3a72f430739b4eaacd1cf8b7) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Plugin types adapted to work with latest version of postcss

- Updated dependencies [[`d794225c`](https://github.com/nextui-org/nextui/commit/d794225cb75121db3a72f430739b4eaacd1cf8b7)]:
  - @nextui-org/theme@2.0.4

## 2.0.3

### Patch Changes

- [`e3e13a09`](https://github.com/nextui-org/nextui/commit/e3e13a095f2347ff279c85e6a5d3798f36c6533f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New package created to exports system RSC-compatible functions
  Component exports changed to named exports
- Updated dependencies [[`eefda8d6`](https://github.com/nextui-org/nextui/commit/eefda8d6e2088526e0dbb2026d807b53d2a97782), [`e3e13a09`](https://github.com/nextui-org/nextui/commit/e3e13a095f2347ff279c85e6a5d3798f36c6533f)]:
  - @nextui-org/react-utils@2.0.2
  - @nextui-org/system@2.0.3
  - @nextui-org/theme@2.0.3
  - @nextui-org/use-is-mounted@2.0.2
  - @nextui-org/shared-utils@2.0.2

## 2.0.2

### Patch Changes

- Updated dependencies [[`459ac5ed`](https://github.com/nextui-org/nextui/commit/459ac5ed4537942517803ba14129226a791d6feb)]:
  - @nextui-org/theme@2.0.2
  - @nextui-org/system@2.0.2

## 2.0.1

### Patch Changes

- [`e940ec06`](https://github.com/nextui-org/nextui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Introducing NextUI v2.0

- [`e940ec06`](https://github.com/nextui-org/nextui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Introducing v2 - Readmes updated

- Updated dependencies [[`e940ec06`](https://github.com/nextui-org/nextui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140), [`e940ec06`](https://github.com/nextui-org/nextui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140)]:
  - @nextui-org/shared-utils@2.0.1
  - @nextui-org/react-utils@2.0.1
  - @nextui-org/use-is-mounted@2.0.1
  - @nextui-org/system@2.0.1
  - @nextui-org/theme@2.0.1

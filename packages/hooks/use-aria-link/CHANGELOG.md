# @nextui-org/use-aria-link

## 2.0.15

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
  - @nextui-org/use-aria-press@2.0.1

## 2.0.14

### Patch Changes

- [#1600](https://github.com/nextui-org/nextui/pull/1600) [`b1b30b797`](https://github.com/nextui-org/nextui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix npm deploy

## 2.0.13

### Patch Changes

- [#1589](https://github.com/nextui-org/nextui/pull/1589) [`1612532ee`](https://github.com/nextui-org/nextui/commit/1612532eeeabbc49165546b1a2e7aebf89e7a1c2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React aria packages upgraded

## 2.0.12

### Patch Changes

- [#1432](https://github.com/nextui-org/nextui/pull/1432) [`453f792a7`](https://github.com/nextui-org/nextui/commit/453f792a7a35ed9dc0234479d55f694ff0f4b21c) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Interal hook created to control the link events

---
"@nextui-org/accordion": patch
"@nextui-org/autocomplete": patch
"@nextui-org/avatar": patch
"@nextui-org/badge": patch
"@nextui-org/breadcrumbs": patch
"@nextui-org/button": patch
"@nextui-org/card": patch
"@nextui-org/checkbox": patch
"@nextui-org/chip": patch
"@nextui-org/code": patch
"@nextui-org/divider": patch
"@nextui-org/dropdown": patch
"@nextui-org/image": patch
"@nextui-org/input": patch
"@nextui-org/kbd": patch
"@nextui-org/link": patch
"@nextui-org/listbox": patch
"@nextui-org/menu": patch
"@nextui-org/modal": patch
"@nextui-org/navbar": patch
"@nextui-org/pagination": patch
"@nextui-org/popover": patch
"@nextui-org/progress": patch
"@nextui-org/radio": patch
"@nextui-org/ripple": patch
"@nextui-org/scroll-shadow": patch
"@nextui-org/select": patch
"@nextui-org/skeleton": patch
"@nextui-org/slider": patch
"@nextui-org/snippet": patch
"@nextui-org/spacer": patch
"@nextui-org/spinner": patch
"@nextui-org/switch": patch
"@nextui-org/table": patch
"@nextui-org/tabs": patch
"@nextui-org/tooltip": patch
"@nextui-org/user": patch
"@nextui-org/react": minor
"@nextui-org/system": minor
"@nextui-org/system-rsc": minor
"@nextui-org/theme": minor
"@nextui-org/use-aria-accordion": patch
"@nextui-org/use-aria-accordion-item": patch
"@nextui-org/use-aria-button": patch
"@nextui-org/use-aria-link": patch
"@nextui-org/use-aria-modal-overlay": patch
"@nextui-org/use-aria-multiselect": patch
"@nextui-org/use-aria-press": patch
"@nextui-org/use-aria-toggle-button": patch
"@nextui-org/use-callback-ref": patch
"@nextui-org/use-clipboard": patch
"@nextui-org/use-data-scroll-overflow": patch
"@nextui-org/use-disclosure": patch
"@nextui-org/use-image": patch
"@nextui-org/use-infinite-scroll": patch
"@nextui-org/use-is-mobile": patch
"@nextui-org/use-is-mounted": patch
"@nextui-org/use-pagination": patch
"@nextui-org/use-real-shape": patch
"@nextui-org/use-ref-state": patch
"@nextui-org/use-resize": patch
"@nextui-org/use-safe-layout-effect": patch
"@nextui-org/use-scroll-position": patch
"@nextui-org/use-ssr": patch
"@nextui-org/use-update-effect": patch
"@nextui-org/aria-utils": patch
"@nextui-org/framer-transitions": patch
"@nextui-org/react-rsc-utils": patch
"@nextui-org/react-utils": patch
"@nextui-org/shared-icons": patch
"@nextui-org/shared-utils": patch
"@nextui-org/stories-utils": patch
"@nextui-org/test-utils": patch
---

New version V2.2.0

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

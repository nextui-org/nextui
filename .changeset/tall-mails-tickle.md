---
"@nextui-org/accordion": minor
"@nextui-org/autocomplete": minor
"@nextui-org/avatar": minor
"@nextui-org/badge": minor
"@nextui-org/breadcrumbs": minor
"@nextui-org/button": minor
"@nextui-org/card": minor
"@nextui-org/checkbox": minor
"@nextui-org/chip": minor
"@nextui-org/code": minor
"@nextui-org/divider": minor
"@nextui-org/dropdown": minor
"@nextui-org/image": minor
"@nextui-org/input": minor
"@nextui-org/kbd": minor
"@nextui-org/link": minor
"@nextui-org/listbox": minor
"@nextui-org/menu": minor
"@nextui-org/modal": minor
"@nextui-org/navbar": minor
"@nextui-org/pagination": minor
"@nextui-org/popover": minor
"@nextui-org/progress": minor
"@nextui-org/radio": minor
"@nextui-org/ripple": minor
"@nextui-org/scroll-shadow": minor
"@nextui-org/select": minor
"@nextui-org/skeleton": minor
"@nextui-org/slider": minor
"@nextui-org/snippet": minor
"@nextui-org/spacer": minor
"@nextui-org/spinner": minor
"@nextui-org/switch": minor
"@nextui-org/table": minor
"@nextui-org/tabs": minor
"@nextui-org/tooltip": minor
"@nextui-org/user": minor
"@nextui-org/react": minor
"@nextui-org/system": minor
"@nextui-org/system-rsc": minor
"@nextui-org/theme": minor
"@nextui-org/use-aria-accordion": minor
"@nextui-org/use-aria-accordion-item": minor
"@nextui-org/use-aria-button": minor
"@nextui-org/use-aria-link": minor
"@nextui-org/use-aria-modal-overlay": minor
"@nextui-org/use-aria-multiselect": minor
"@nextui-org/use-aria-press": minor
"@nextui-org/use-aria-toggle-button": minor
"@nextui-org/use-callback-ref": minor
"@nextui-org/use-clipboard": minor
"@nextui-org/use-data-scroll-overflow": minor
"@nextui-org/use-disclosure": minor
"@nextui-org/use-image": minor
"@nextui-org/use-infinite-scroll": minor
"@nextui-org/use-is-mobile": minor
"@nextui-org/use-is-mounted": minor
"@nextui-org/use-pagination": minor
"@nextui-org/use-real-shape": minor
"@nextui-org/use-ref-state": minor
"@nextui-org/use-resize": minor
"@nextui-org/use-safe-layout-effect": minor
"@nextui-org/use-scroll-position": minor
"@nextui-org/use-ssr": minor
"@nextui-org/use-update-effect": minor
"@nextui-org/aria-utils": minor
"@nextui-org/framer-transitions": minor
"@nextui-org/react-rsc-utils": minor
"@nextui-org/react-utils": minor
"@nextui-org/shared-icons": minor
"@nextui-org/shared-utils": minor
"@nextui-org/stories-utils": minor
"@nextui-org/test-utils": minor
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

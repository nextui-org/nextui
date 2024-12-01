---
"@nextui-org/accordion": minor
"@nextui-org/alert": minor
"@nextui-org/autocomplete": minor
"@nextui-org/avatar": minor
"@nextui-org/badge": minor
"@nextui-org/breadcrumbs": minor
"@nextui-org/button": minor
"@nextui-org/calendar": minor
"@nextui-org/card": minor
"@nextui-org/checkbox": minor
"@nextui-org/chip": minor
"@nextui-org/code": minor
"@nextui-org/date-input": minor
"@nextui-org/date-picker": minor
"@nextui-org/divider": minor
"@nextui-org/drawer": minor
"@nextui-org/dropdown": minor
"@nextui-org/form": minor
"@nextui-org/image": minor
"@nextui-org/input": minor
"@nextui-org/input-otp": minor
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
"@nextui-org/use-aria-menu": minor
"@nextui-org/use-aria-modal-overlay": minor
"@nextui-org/use-aria-multiselect": minor
"@nextui-org/use-aria-toggle-button": minor
"@nextui-org/use-callback-ref": minor
"@nextui-org/use-clipboard": minor
"@nextui-org/use-data-scroll-overflow": minor
"@nextui-org/use-disclosure": minor
"@nextui-org/use-draggable": minor
"@nextui-org/use-image": minor
"@nextui-org/use-infinite-scroll": minor
"@nextui-org/use-intersection-observer": minor
"@nextui-org/use-is-mobile": minor
"@nextui-org/use-is-mounted": minor
"@nextui-org/use-measure": minor
"@nextui-org/use-pagination": minor
"@nextui-org/use-real-shape": minor
"@nextui-org/use-ref-state": minor
"@nextui-org/use-resize": minor
"@nextui-org/use-safe-layout-effect": minor
"@nextui-org/use-scroll-position": minor
"@nextui-org/use-ssr": minor
"@nextui-org/use-theme": minor
"@nextui-org/use-update-effect": minor
"@nextui-org/aria-utils": minor
"@nextui-org/dom-animation": minor
"@nextui-org/framer-utils": minor
"@nextui-org/react-rsc-utils": minor
"@nextui-org/react-utils": minor
"@nextui-org/shared-icons": minor
"@nextui-org/shared-utils": minor
"@nextui-org/stories-utils": minor
"@nextui-org/test-utils": minor
---

This release includes several improvements and bug fixes:

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
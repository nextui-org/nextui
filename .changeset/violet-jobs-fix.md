---
"@nextui-org/react-rsc-utils": patch
"@nextui-org/accordion": patch
"@nextui-org/navbar": patch
---

- filterDOMProps function modified to filter non-default event/props this avoid passing non-valid props to HTML elements
- NavbarMenu onMenuOpenChange open state modified, undefined type removed
- keepContentMounted prop added to accordion and accordion item
- Some bug fixes..

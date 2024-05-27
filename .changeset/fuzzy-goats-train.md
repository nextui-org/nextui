---
"@nextui-org/react-rsc-utils": patch
---

WHAT: Previously, @ts-ignore was used to bypass type errors. 
Refactor the filterDOMProps function to properly handle TypeScript index signature issues by introducing a new type alias, DOMAndAriaProps. 

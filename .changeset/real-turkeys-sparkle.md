---
"@nextui-org/use-aria-menu": major
---

WHAT: Fixed a type error in the onKeyDown event handler for the menu component. WHY: The current implementation uses @ts-ignore to suppress type errors in the onKeyDown event handler. This may result in reduced type safety.

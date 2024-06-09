---
"@nextui-org/theme": patch
---

Used `@ts-ignore` to bypass type checking, and used `Object`, leading to potential type problems and limited flexibility. The function now uses the `StringMap` type for better type safety and flexibility.

---
"@nextui-org/autocomplete": patch
"@nextui-org/date-picker": patch
"@nextui-org/date-input": patch
"@nextui-org/calendar": patch
"@nextui-org/dropdown": patch
"@nextui-org/listbox": patch
"@nextui-org/select": patch
"@nextui-org/menu": patch
"@nextui-org/tabs": patch
---

Fix the "forwardRef render functions accept exactly two parameters: props and ref. Did you forget to use the ref parameter?" on next.js by changing the way we manage collection base components refs

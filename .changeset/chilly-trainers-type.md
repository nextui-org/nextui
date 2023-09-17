---
"@nextui-org/button": patch
"@nextui-org/theme": patch
---

Fix #1626 The 'border-left' is obscured by 'margin-left ml-[calc(theme(borderWidth.medium)*-1)]', and the border is not covered by its neighbor when the button is set to variant='bordered' in the ButtonGroup.


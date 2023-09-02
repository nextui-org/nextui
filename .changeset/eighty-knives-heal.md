---
"@nextui-org/pagination": patch
"@nextui-org/theme": patch
---

fix: resolved cursor issues in pagination

- The cursor does not animate anymore on initial render and non page change prop changes.
- The cursor hover state now looks good with disableAnimation set.
- The animated cursor is now transparent to the cursor (pointer-events: none).

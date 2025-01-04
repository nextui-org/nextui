---
"@nextui-org/tooltip": minor
---

fix tooltip staying open on fast movement by:
- adding unique motion keys to tooltip content for proper animation tracking
- ensuring AnimatePresence component remains mounted until animations complete
- improving render performance during rapid tooltip transitions

No breaking changes or usage changes required.

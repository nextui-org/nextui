---
"@nextui-org/use-aria-multiselect": patch
---

Multiple quick clicks on select trigger was not waiting for animation to complete and starts to process the actions by subsequent clicks to open/close the popover. The PR makes the fix which blocks the actions triggered by the click until a threshold time of 500ms.

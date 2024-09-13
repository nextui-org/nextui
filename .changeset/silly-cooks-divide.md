---
"@nextui-org/menu": patch
---

The condition for data-selectable now includes isHovered along with isSelectable.This ensures that the item can be selected when it is hovered over, addressing the issue where the selection stays in the same place when the cursor moves out of the menu.This change should help fix the dropdown selection functionality on mobile devices and improve the user experience.

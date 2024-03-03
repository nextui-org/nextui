---
"@nextui-org/input": patch
---

Fix #2268, when using a number input and with a 0 for the initial value, the label (default or labelPlacement='inside') does not animate to the correct position. Even when the user is setting the value to 0, the label does not alter its state unless a number other than 0 is inputted.

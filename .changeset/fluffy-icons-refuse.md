---
"@nextui-org/table": patch
---

Currently, whenever any arrow-key keypress is triggered it navigates the focus to other cell/row. This creates an issue when the table cell contains a component which requires this keys for specific purpose (eg. if a table cell contains input component, it might need arrow keys for editing. But it is not possible because whenever the keypress triggers navigation). The PR adds an `isKeyboardNavigationDisabled` prop to disable the navigation.

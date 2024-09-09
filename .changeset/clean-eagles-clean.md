---
"@nextui-org/select": patch
---

Currently, the select component does not pass the `portalContainer` prop to its child pop-over. Consequently, the pop-over defaults to using `document.body` as the `portalContainer`. This causes the pop-over to close immediately when the parent of the select component is scrollable. This fix ensures that the `portalContainer` prop is correctly passed to the pop-over, addressing the issue.

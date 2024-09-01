---
"@nextui-org/select": patch
---

Currently the select component do not pass the portalContainer prop to it's child pop-over. The pop-over hence takes default value of portalContainer i.e document.body. Due to this, when parent of the select component is scrollable, the scroll closes the pop-over immediately due to the scroll. This makes it impossible for the pop-over to open.The PR adds the portalContainer prop to the pop-over.

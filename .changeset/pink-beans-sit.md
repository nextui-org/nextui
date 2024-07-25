---
"@nextui-org/use-image": patch
"@nextui-org/test-utils": patch
---

fix cached image flashing due to use-image always returning pending initially. The fix was to check if the image is loaded instantly through HTMLImageElement.complete attribute and use that to initialize the state.

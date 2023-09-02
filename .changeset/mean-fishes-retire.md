---
"@nextui-org/pagination": patch
---

fix: fixed pagination scale animation

For animations of the pagination cursor to be enabled data-moving needs to be set to true.
We are now setting the data-moving to false 300ms after setting the cursor scale to 1.

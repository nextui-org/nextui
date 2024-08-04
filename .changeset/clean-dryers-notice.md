---
"@nextui-org/select": patch
---

Fix toggle issue while clicking on label of select component unexpectedly open and close the model instantly.The removal of code block containing group-data-[filled=true]:pointer-events-auto prevent from any unwanted user interactions and resolve the flickering issue.

---
"@nextui-org/input": minor
"@nextui-org/theme": patch
---

Fixing Issue 3058. Initially, you cannot present label outside the input component if there is no placeholder. To fix this, I have added a "outside-top" prop which displays the label outside regardless of the placeholder, just like "outside-left" prop.

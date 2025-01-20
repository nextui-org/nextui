---
"@nextui-org/calendar": major
---

### Changes
- Added support for customizing calendar cells.
  - You can now use `children` to customize the content of calendar cells.
  - The default structure of calendar cells has been updated to improve flexibility.

### Breaking Changes
- **WHAT**: The following changes might affect existing implementations:
  1. Style class names have been renamed (e.g., `cellButton` → `cellHeader`).
  2. The internal structure of calendar cells has changed, which may cause existing styles to no longer apply.
- **WHY**: These changes were made to provide better flexibility and support for modern styling and customization.
- **HOW**:
  1. If you are using custom styles, update the class names to the new ones.
  2. Use `children` to customize the content of calendar cells.
  3. Refer to the example below for implementation:

```jsx
<Calendar>
  {(date) => (
    <div style={{ backgroundColor: "lightblue" }}>
      <span>{date.day}</span>
    </div>
  )}
</Calendar>
```
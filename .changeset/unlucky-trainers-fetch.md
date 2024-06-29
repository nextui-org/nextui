---
"@nextui-org/date-input": major
---

Summary : Add format props to component date-input

WHY
If a user wanted to change the date format into this component, he had to use the i18n provider.
The solution is added to format props like "dd/mm/yyyy" to change it easily.

HOW
Add props `format` to change it into date-input component like this.

```
<DateInput {...props} format="dd/mm/yyyy"/>
```

The `format` props is not simple string. Is type with determinated format.

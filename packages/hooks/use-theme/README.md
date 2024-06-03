# @nextui-org/use-theme

React hook to switch between light and dark themes

## Installation

```sh
yarn add @nextui-org/use-theme
# or
npm i @nextui-org/use-theme
```

## Usage

Import `useTheme`

```tsx
import {useTheme} from "@nextui-org/use-theme";
```

### theme

```tsx
// `theme` is either `light` or `dark`
// by default, it will use the one in localStorage.
// if it is no such value in localStorage, `light` theme will be used
const {theme} = useTheme();
```

### isDarkTheme

```tsx
// `isDarkTheme` returns if `theme` is `dark`
const {isDarkTheme} = useTheme();
// ...
console.log(isDarkTheme ? "dark" : "light")
```

### isLightTheme

```tsx
// `isLightTheme` returns if `theme` is `light`
const {isLightTheme} = useTheme();
// ...
console.log(isLightTheme ? "light" : "dark")
```

### setLightTheme

```tsx
// to set `theme` to `light` by using `setLightTheme`
const {setLightTheme} = useTheme();
// ...
setLightTheme()
```

### setDarkTheme

```tsx
// to set `theme` to `dark` by using `setDarkTheme`
const {setDarkTheme} = useTheme();
// ...
setDarkTheme()
```

### toggleTheme

```tsx
// toggle the existing theme by using `toggleTheme`
// i.e. `light` -> `dark` or vice versa
const {toggleTheme} = useTheme();
// ...
toggleTheme()
```


## Contribution

Yes please! See the
[contributing guidelines](https://github.com/nextui-org/nextui/blob/master/CONTRIBUTING.md)
for details.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/nextui-org/nextui/blob/master/LICENSE).

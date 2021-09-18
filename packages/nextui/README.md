<p align="center">
  <a href="https://nextui.org">
      <img width="20%" src="https://raw.githubusercontent.com/jrgarciadev/nextui/main/packages/docs/public/isotipo.png" alt="nextui" />
      <h1 align="center">Nextui</h1>
  </a>
  </p>
  </br>
  <p align="center">
  <a href="https://codecov.io/gh/jrgarciadev/nextui">
    <img src="https://codecov.io/gh/jrgarciadev/nextui/branch/main/graph/badge.svg?token=QJF2QKR5N4" alt="codecov badge">
  </a>
  <a href="https://github.com/nextui-org/nextui/actions/workflows/main.yaml">
    <img src="https://github.com/nextui-org/nextui/actions/workflows/main.yaml/badge.svg" alt="CI/CD nextui">
  </a>
  <a href="https://github.com/jrgarciadev/nextui/blob/main/LICENSE">
    <img src="https://img.shields.io/apm/l/atomic-design-ui.svg?" alt="License">
  </a>
</p>

## Getting Started

Visit <a aria-label="nextui learn" href="https://nextui.org/learn">https://nextui.org/guide</a> to get started with NextUI.

## Documentation

Visit [https://nextui.org/docs](https://nextui.org/docs) to view the full documentation.

## Quick Start

1. Installation: Inside your React project directory, install NextUI by running either of the following:

```bash
yarn add @nextui-org/react
# or
npm i @nextui-org/react
```

2. Setup: For NextUI to work correctly, you need to set up the CssBaseline at the root of your application.

Go to the root of your application and do this:

```jsx
import { CssBaseline } from '@nextui-org/react';

const Application = () => (
  <>
    <CssBaseline /> // ---> Normalize styles
    <AppComponent /> // ---> Your App Component
  </>
);
```

3. Using NextUI components: Once NextUI is installed you can use any of the components as follows.

```jsx
import { Button } from '@next-ui/react';
const Component = () => <Button>Click me</Button>;
```

## Contributing

Contributions are always welcome!

See `CONTRIBUTING.md` for ways to get started.

Please adhere to this project's `CODE_OF_CONDUCT`.

## License

[MIT](https://choosealicense.com/licenses/mit/)

```

```

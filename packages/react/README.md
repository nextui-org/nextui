<p align="center">
  <a href="https://nextui.org">
      <img width="20%" src="https://raw.githubusercontent.com/nextui-org/nextui/main/apps/docs/public/isotipo.png" alt="nextui" />
      <h1 align="center">NextUI</h1>
  </a>
</p>
</br>
<p align="center">
  <a href="https://github.com/jrgarciadev/nextui/blob/main/LICENSE">
    <img src="https://img.shields.io/apm/l/atomic-design-ui.svg?style=flat" alt="License">
  </a>
  <a href="https://codecov.io/gh/jrgarciadev/nextui">
    <img src="https://codecov.io/gh/jrgarciadev/nextui/branch/main/graph/badge.svg?token=QJF2QKR5N4" alt="codecov badge">
  </a>
  <a href="https://github.com/nextui-org/nextui/actions/workflows/main.yaml">
    <img src="https://github.com/nextui-org/nextui/actions/workflows/main.yaml/badge.svg" alt="CI/CD nextui">
  </a>
  <a href="https://www.npmjs.com/package/@nextui-org/react">
    <img src="https://img.shields.io/npm/dm/@nextui-org/react.svg?style=flat-round" alt="npm downloads">
  </a>
</p>

<p align="center">
  <a rel="noopener noreferrer" target="_blank" href="https://www.vercel.com?utm_source=nextui&utm_marketing=oss">
    <img height="34px" src="https://raw.githubusercontent.com/nextui-org/nextui/main/apps/docs/public/images/sponsored-by-vercel.svg" alt="Sponsored by vercel">
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
import { NextUIProvider } from '@nextui-org/react';

const Application = () => (
  <NextUIProvider>
    <AppComponent /> // ---> Your App Component
  </NextUIProvider>
);
```

3. Using NextUI components: Once NextUI is installed you can use any of the components as follows.
   NextUI uses tree-shaking so the unused modules will not be included in the bundle during the build process and
   each component is exported separately.

```jsx
import { Button } from '@nextui-org/react';

const Component = () => <Button>Click me</Button>;
```

4. NextUI allows to manually import components if you need. E.g.

```jsx
import Button from '@nextui-org/react/button';

const Component = () => <Button>Click me</Button>;
```

### Community

We're excited to see the community adopt NextUI, raise issues, and provide feedback.
Whether it's a feature request, bug report, or a project to showcase, please get involved!

- [Discord](https://discord.gg/9b6yyZKmH4)
- [Twitter](https://twitter.com/getnextui)
- [GitHub Discussions](https://github.com/nextui-org/nextui/discussions)

## Contributing

Contributions are always welcome!

See `CONTRIBUTING.md` for ways to get started.

Please adhere to this project's `CODE_OF_CONDUCT`.

## License

[MIT](https://choosealicense.com/licenses/mit/)

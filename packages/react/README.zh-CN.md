<p align="center">
  <a href="https://nextui.org">
      <img width="20%" src="https://raw.githubusercontent.com/nextui-org/nextui/main/apps/docs/public/isotipo.png" alt="nextui" />
      <h1 align="center">NextUI</h1>
  </a>

  <p><a href="./README.md">English</a> | 简体中文</p>
</p>

</br>

<p align="center">
  <a href="https://github.com/jrgarciadev/nextui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@nextui-org/react?style=flat" alt="License">
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
    <img height="34px" src="https://raw.githubusercontent.com/nextui-org/nextui/main/apps/docs/public/deployed-on-vercel.svg" alt="Deployed on vercel">
  </a>
</p>

> **注释:** 这是一个社区项目，与无关 [Vercel](https://vercel.com), 但确实从中获得了一些灵感。

> **警告 🚧:** 这个项目仍在开发中，它可能有错误和破坏性的更改，所以不建议在生产中使用它。

## 入门

访问 <a aria-label="nextui learn" href="https://nextui.org/learn">https://nextui.org/guide</a> 开始使用 NextUI。

## 文档

访问 [https://nextui.org/docs](https://nextui.org/docs) 以查看完整的文档。

## 快速入门

1. 安装：在您的 React 项目目录中，通过运行以下任一命令来安装 NextUI：

```bash
yarn add @nextui-org/react
# 或
npm i @nextui-org/react
```

2. 设置：为了使 NextUI 正常工作，您需要在应用程序的根目录下设置 `NextUIProvider`。

转到应用程序的根目录并执行此操作:

```jsx
import { NextUIProvider } from '@nextui-org/react';

const Application = () => (
  <NextUIProvider>
    <AppComponent /> // ---> Your App Component
  </NextUIProvider>
);
```

3. 使用 NextUI 组件：
   - 安装 NextUI 后，您可以按如下方式使用任何组件~
   - NextUI 使用 [tree-shaking](https://developer.mozilla.org/zh-CN/docs/Glossary/Tree_shaking)，因此在构建过程中未使用的模块不会包含在包中，并且每个组件单独导出。

```jsx
import { Button } from '@nextui-org/react';

const Component = () => <Button>Click me</Button>;
```

4. 如果需要，NextUI 允许手动导入组件，例如：

```jsx
import Button from '@nextui-org/react/button';

const Component = () => <Button>Click me</Button>;
```

### 社区

我们很高兴看到社区采用 NextUI、提出问题并提供反馈。
无论是功能请求、错误报告还是要展示的项目，请参与进来！

- [Discord](https://discord.gg/9b6yyZKmH4)
- [Twitter](https://twitter.com/getnextui)
- [GitHub Discussions](https://github.com/nextui-org/nextui/discussions)

## 贡献

贡献总是受欢迎的！

看 [CONTRIBUTING.md](https://github.com/nextui-org/nextui/blob/main/CONTRIBUTING.MD) 了解入门方法。

请遵守本项目的 [CODE_OF_CONDUCT](https://github.com/nextui-org/nextui/blob/main/CODE_OF_CONDUCT.md)。

## 开源许可

[MIT](https://choosealicense.com/licenses/mit/)

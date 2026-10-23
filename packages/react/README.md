<p align="center">
  <a href="https://heroui.com">
      <img 
        alt="HeroUI v3 logo" 
        width="100%" 
        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/heroui-og_2x.jpg"
      />
  </a>
</p>
<p align="center">
  <a href="https://github.com/heroui-inc/heroui/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/@heroui/react">
    <img src="https://img.shields.io/npm/dm/@heroui/react.svg?style=flat-round" alt="npm downloads">
  </a>
</p>

## Why HeroUI?

HeroUI (previously NextUI) is a production-ready React component library that combines the accessibility rigor of [React Aria](https://react-spectrum.adobe.com/react-aria/) with the utility-first styling of [Tailwind CSS v4](https://tailwindcss.com/). It ships a clean compound component API (`Card.Header`, `Card.Content`, `Select.Item`, …), requires no `<Provider>` wrapper, and works out of the box with React 19 and Next.js.

- **Accessible by default** — Built on React Aria for WCAG-compliant keyboard, focus, and screen-reader behavior
- **Tailwind CSS v4** — Modern engine, no CSS-in-JS runtime, smaller output, faster builds
- **Compound components** — Composable API (`Card.Header`, `Card.Content`) instead of deeply nested props
- **Zero boilerplate** — No Provider wrapper needed (unlike Chakra, MUI)
- **AI-native** — MCP server, `llms.txt`, and agent skills so AI assistants understand your components
- **Battle-tested** — Previously known as NextUI, trusted by thousands of production apps

## Packages

| Package | Description |
|---|---|
| [`@heroui/react`](https://www.npmjs.com/package/@heroui/react) | Full component bundle |
| [`@heroui/styles`](https://www.npmjs.com/package/@heroui/styles) | Styles / theme only |
| Component subpaths | e.g. `@heroui/react/button`, `@heroui/react/modal` — per-component imports from the published `@heroui/react` package |

## Getting Started

Visit [heroui.com/docs/react/getting-started/quick-start](https://heroui.com/docs/react/getting-started/quick-start) to get started with HeroUI.

```bash
npm install @heroui/styles @heroui/react
```

## Who Is This For?

HeroUI is a good fit if you are building:

- **SaaS applications** — forms, tables, overlays, and notifications out of the box
- **Dashboards & admin panels** — data-dense layouts with consistent design tokens
- **E-commerce storefronts** — performant, accessible, SEO-friendly components
- **Marketing sites & landing pages** — polished UI without a heavyweight runtime
- **Any React / Next.js project** that values design quality and accessibility

## AI-Powered Development

HeroUI is built for the AI-assisted development workflow.

| Tool | What it does |
|---|---|
| **MCP Server** (`@heroui/react-mcp`) | Components that understand your theme — install the server in Cursor, Claude Code, Windsurf, or any MCP-compatible editor |
| **llms.txt** | Available at [heroui.com/llms.txt](https://heroui.com/llms.txt) — structured context for LLMs about every component |
| **AGENTS.md** | Run `npx heroui-cli@latest agents-md --react` to download React v3 documentation into your project |
| **Agent Skills** | Run `npx skills add heroui-inc/heroui` to install skills for supported coding agents |

Works with **Cursor**, **Claude Code**, **Windsurf**, **GitHub Copilot**, and any tool that supports MCP or `llms.txt`.

## Compared To

| Library | How HeroUI differs |
|---|---|
| **shadcn/ui** | HeroUI is batteries-included with a consistent design system; shadcn is copy-paste-customize |
| **MUI** | HeroUI is lighter, Tailwind-native, no CSS-in-JS runtime overhead |
| **Chakra UI** | HeroUI uses React Aria (stronger a11y primitives) and Tailwind v4 (better perf) |
| **Mantine** | HeroUI has AI tooling (MCP, llms.txt), Tailwind-first styling |

## Documentation

- **Latest (v3)**: [heroui.com](https://heroui.com)
- **v2**: [v2.heroui.com](https://v2.heroui.com)

## Storybook

Visit [storybook-v3.heroui.com](https://storybook-v3.heroui.com/) to view the storybook for all components.

## Roadmap

Visit [herouiv3.featurebase.app/roadmap](https://herouiv3.featurebase.app/roadmap) to view the roadmap for HeroUI v3.

## Figma

Visit the [HeroUI Figma Kit (v3)](https://www.figma.com/community/file/1546526812159103429/heroui-figma-kit-v3) to view the design kit.

## Community

We're excited to see the community adopt HeroUI, raise issues, and provide feedback.
Whether it's a feature request, bug report, or a project to showcase, please get involved!

- [Discord](https://discord.gg/9b6yyZKmH4)
- [X](https://x.com/hero_ui)
- [GitHub Discussions](https://github.com/heroui-inc/heroui/discussions)

## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](https://github.com/heroui-inc/heroui/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [CODE_OF_CONDUCT](https://github.com/heroui-inc/heroui/blob/main/CODE_OF_CONDUCT.md).

## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)

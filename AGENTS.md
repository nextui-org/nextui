# AGENTS.md

Instructions for AI agents working with the HeroUI v3 repository.

## Repository Overview

HeroUI v3 is a modern React UI library built with **Tailwind CSS v4**, organized as a **pnpm monorepo** managed by **Turborepo**. Components are built on top of [React Aria Components](https://react-spectrum.adobe.com/react-aria/) and follow a compound component pattern similar to Radix UI.

### Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22+ | Runtime |
| pnpm | 10.26.2 | Package manager (via corepack) |
| React | 19+ | UI framework |
| Tailwind CSS | 4.x | Styling |
| TypeScript | 5.x | Type safety |
| Turborepo | 2.x | Build orchestration |
| Storybook | Latest | Component development |
| Vitest | 4.x | Testing |
| React Aria Components | Latest | Accessibility primitives |
| tailwind-variants | Latest | Variant-based styling (includes twMerge) |

Use the workspace manifests and lockfile as the source of truth for exact dependency versions.

### Monorepo Structure

```
/
├── apps/
│   └── docs/              # Documentation site (Next.js + Fumadocs)
├── packages/
│   ├── react/             # Main UI library (@heroui/react)
│   │   ├── src/components/  # All components
│   │   ├── src/utils/       # Shared utilities
│   │   └── scripts/         # Build & codegen scripts
│   ├── styles/            # CSS styles & variants (@heroui/styles)
│   │   ├── components/      # Per-component .css files (flat, e.g. button.css)
│   │   ├── themes/          # Theme variables
│   │   └── src/components/  # Per-component .styles.ts (tailwind-variants)
│   ├── standard/          # Shared ESLint, Prettier, TS configs
│   ├── storybook/         # Storybook configuration
│   └── testing/           # Shared test harness (@heroui/testing)
├── turbo.json
└── pnpm-workspace.yaml
```

## Commands

| Action | Command |
|---|---|
| Install dependencies | `pnpm i --hoist` |
| Build libraries (styles + React) | `pnpm build` |
| Build React and its dependencies | `pnpm build:react` |
| Build docs | `pnpm build:docs` |
| Build Storybook | `pnpm build:storybook` |
| Dev (Storybook, port 6006) | `pnpm dev` |
| Dev (Docs site, port 3000) | `pnpm dev:docs` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| Test all (jsdom + browser) | `pnpm test` |
| Test one file (filter) | `pnpm --filter @heroui/react exec vitest run button` |
| Test with coverage | `pnpm test:coverage` (jsdom floors only — not “done”) |
| Test changed files (local) | `pnpm --filter @heroui/react test:changed` (jsdom only; not a gate) |
| Check formatting | `pnpm run format` |
| Fix formatting | `pnpm run format:fix` |
| Bump version | `pnpm version:bump` |
| Scaffold a new component | `cd packages/react && pnpm add:component ComponentName` |

## Behavioral tests (`@heroui/react`)

- Suites live in `packages/react/tests/components/<name>/`:
  - `*.test.tsx` — jsdom (~90% of contracts)
  - `*.ssr.test.tsx` — Client SSR smoke via `ssrSmoke()` (not RSC)
  - `*.browser.test.tsx` — Playwright (overlays + high-risk portals; not every component)
  - optional `fixtures.tsx` — shared JSX across layers
- Import harness from `@heroui/testing/helpers` (`render`, `setupUser`, `runAllTimers`, `ssrSmoke`, `User`). Browser suites: `render` from `@heroui/testing/browser` (wraps `vitest-browser-react`; owned by `@heroui/testing`). Prefer `@/` for sources. Pattern testers: `const user = new User(...); user.createTester(...)` — not a top-level export.
- Query: `getByRole` / label / text first; `data-testid` when needed; avoid class-primary queries.
- Assert: roles/names, HeroUI `data-*` hooks, callbacks, focus, light BEM + documented `data-slot` on compound parts — not colors, full class lists, or RAC internals.
- Fake timers: per-suite only; wire `advanceTimers` into `setupUser` + `User`; use `runAllTimers()`.
- Pattern testers for groups / overlays / collections; skip for Button / Checkbox / Switch / TextField.
- Naming: `describe("Component")`; nested concern; `it` as `supports…` / `calls…` / `exposes…` / `renders…`. SSR: `"Component SSR"`; browser: `"Component (browser)"`.
- Intentional skips (no dedicated suite required): internals (`rac`, `icons`), non-exported helpers (`color-input-group`, `date-input-group`), in-progress `calendar-year-picker`, parent-covered parts (`list-box-item`, `menu-item`, `menu-section`, `list-box-section`), Toast SSR (client portal only — covered by jsdom + browser). Public `input-group` has its own suite. SSR and browser are risk-based, not universal.
- Browser setup (once locally): `pnpm --filter @heroui/testing exec playwright install chromium` before `pnpm test`. PR QA installs Chromium with `pnpm --filter @heroui/testing exec playwright install --with-deps chromium`, then runs `pnpm test:browser` + `pnpm test:coverage`. Release CI installs Chromium and runs `pnpm test`.
- Commands: `pnpm test` (jsdom + browser, needs Chromium); filter with `pnpm --filter @heroui/react exec vitest run <name>`.
- Coverage (`pnpm test:coverage`): jsdom only; `src/components/**` minus barrels. Thresholds are **CI floors** (statements/lines can pass with thin smoke). Green coverage ≠ sufficient depth — still require role/callback/focus (and browser for high-risk portals). Browser suites contribute **nothing** to the coverage number, so a component can be well covered by Playwright and still read as a gap in the report.
- Floors are a **ratchet**: they sit ~1pt under the current measured run. Raise them when coverage improves; never lower them to make a red build pass.
- `test:changed`: local jsdom-only shortcut (`vitest related --changed`). Does **not** run browser suites; never use it as the merge gate — use `pnpm test` / CI.

### When a component needs an SSR or browser suite

SSR and browser suites are risk-based. Add one only when a criterion below applies, and skip it deliberately otherwise.

Add a `*.ssr.test.tsx` when the component renders on the server path: it is exported for use outside `"use client"` boundaries, reads `document`/`window` during render, generates ids, or has previously hydrated inconsistently.

Add a `*.browser.test.tsx` when correctness depends on something jsdom does not implement:

| Trigger | Why jsdom is not enough | Example |
|---|---|---|
| Real layout / measurement | `offsetWidth`, `offsetHeight`, and scroll sizes are always `0` | Tabs overflow chevrons, `scroll-shadow` |
| Pointer capture / drag | `setPointerCapture` and pointer event sequencing are not simulated | Drawer swipe-to-dismiss, `color-area` |
| Portals with focus containment | Focus trap and dismiss ordering differ from a real browser | Modal, popover, toast |
| Actual paint or transitions | `transitionend` and animation timing do not fire | Drawer snap-back |

If a coverage gap traces to one of those rows, write the browser test — do **not** contort a jsdom test with mocked geometry just to move the coverage number.

## Git Commit Convention

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) and are validated by Husky + commitlint. Pre-commit also runs `lint-staged`.

```
<type>(<scope>): <message>
```

**Allowed types:** `feat`, `feature`, `fix`, `refactor`, `style`, `docs`, `build`, `test`, `ci`, `chore`, `revert`

Examples:

```
feat(components): add select component
fix(button): resolve disabled state not applying
docs: update installation guide
```

## Component Architecture

### File Structure

Each component lives in `packages/react/src/components/<component-name>/`:

```
component-name/
├── component-name.tsx          # Component implementation (uses React Aria)
├── component-name.stories.tsx  # Storybook stories
└── index.ts                    # Barrel exports
```

Styling lives in `@heroui/styles`, split across two locations:

| Path | Contents |
|---|---|
| `packages/styles/src/components/<component-name>/<component-name>.styles.ts` | The `tv()` map from variant props to BEM class names |
| `packages/styles/components/<component-name>.css` | The BEM class definitions (flat directory, one file per component) |

Note that `.styles.ts` files do **not** live alongside the component in `packages/react`.

### Creating a New Component

Always use the scaffold script:

```bash
cd packages/react
pnpm add:component ComponentName
```

The scaffold is a starting point and still emits legacy patterns. Before using the generated component:

1. Move `<component-name>.styles.ts` to `packages/styles/src/components/<component-name>/`, replace utility-based variants with BEM class mappings, and use the existing `componentNameVariants` / `ComponentNameVariants` naming convention.
2. Add that directory's `index.ts` and export it from `packages/styles/src/components/index.ts`.
3. Create `packages/styles/components/<component-name>.css` and import it in `packages/styles/components/index.css`. Import shared primitives before components that override them.
4. Update the component and React barrel to import/re-export variants from `@heroui/styles` instead of the generated local styles path.
5. Replace generated `forwardRef` with React 19 ref-as-prop handling, use the appropriate React Aria primitive, and forward remaining DOM/ARIA/event props. Add documented `data-slot` hooks and follow the named compound export pattern below.
6. Update Storybook examples and add behavioral tests, including SSR/browser coverage when the risk criteria above apply.

Build from the repository root after wiring these files:

```bash
# From packages/react after scaffolding
cd ../..
pnpm build
```

Development package exports point to source. Building produces `dist/`; it does not rewrite package exports. React's `prepack` hook runs `clean-package` and `scripts/update-exports.mjs` to generate published exports during `pnpm pack`. The `postpack` hook restores the development manifest.

### Compound Component Pattern

HeroUI uses a compound component pattern. Each component exports its sub-parts so users can compose and style them independently.

```tsx
// Context shares state/styles across parts
const ComponentContext = createContext<{slots?: ReturnType<typeof componentVariants>}>({});

// Root wraps children with context (React 19: ref is a regular prop)
const ComponentRoot = ({children, className, ref, ...props}: ComponentPropsWithRef<"div">) => {
  const slots = useMemo(() => componentVariants({...}), [...]);
  const contextValue = useMemo(() => ({slots}), [slots]);
  return (
    <ComponentContext value={contextValue}>
      <ReactAriaPrimitive {...props} ref={ref} className={composeTwRenderProps(className, slots.base())}>
        {children}
      </ReactAriaPrimitive>
    </ComponentContext>
  );
};

// Child parts consume context
const ComponentItem = ({className, ref, ...props}: ComponentPropsWithRef<"div">) => {
  const {slots} = useContext(ComponentContext);
  return (
    <ReactAriaPrimitive {...props} ref={ref} className={composeTwRenderProps(className, slots?.item())}>
      {props.children}
    </ReactAriaPrimitive>
  );
};
```

Compound components use named `Object.assign` exports in their component barrel, including a `.Root` alias:

```tsx
export const Component = Object.assign(ComponentRoot, {
  Root: ComponentRoot,
  Item: ComponentItem,
  Trigger: ComponentTrigger,
});

export {ComponentRoot, ComponentItem, ComponentTrigger};
export type {ComponentRootProps, ComponentItemProps, ComponentTriggerProps} from "./component";
```

Also expose the compound props type namespace (for example, `Accordion.Props` and `Accordion.ItemProps`) and root props alias (`AccordionProps`). Use `packages/react/src/components/accordion/index.ts` as the complete reference.

### Export Strategy

```tsx
// Package-wide barrel: preserve named component and type exports
export * from "./component-name";

// Direct exports for simple components
export {Component, type ComponentProps} from "./component";

// Always export variants
export {componentVariants, type ComponentVariants} from "@heroui/styles";
```

### Styling Rules

1. **Variant mappings go in `.styles.ts` files** under `packages/styles/src/components/` using `tv()` from `tailwind-variants`; BEM declarations go in `packages/styles/components/*.css`. Keep component styling out of implementation `.tsx` files.
2. **Import from `tailwind-variants`**, never from `@heroui/standard`.
3. **Never use `twMerge` manually** — `tailwind-variants` already includes it.
4. **Add `"use client"` directive** at the top of every component `.tsx` file.
5. **Display names** follow: `HeroUI.ComponentName` or `HeroUI.Component.SubPart`.

### CSS / BEM Naming

Components use BEM-style CSS class names:

- **Block**: `button`, `card`, `alert`
- **Element**: `card__header`, `alert__icon`
- **Modifier**: `button--primary`, `button--lg`, `button--icon-only`

### Default Size Pattern (Critical)

Components with size variants must include default dimensions in base classes so they work without explicit size props. Medium modifiers should avoid duplicating those dimensions, but may define supporting custom properties such as Avatar's `--avatar-size`:

```css
.avatar {
  @apply relative flex size-10 shrink-0 overflow-hidden rounded-full;
  /* size-10 is the default (equivalent to --md) */
}

.avatar--sm { --avatar-size: 2rem; @apply size-8; }
.avatar--md { --avatar-size: 2.5rem; /* no duplicate layout styles */ }
.avatar--lg { --avatar-size: 3rem; @apply size-12; }
```

### Interactive State Pattern

All interactive components must support both pseudo-classes and data attributes:

```css
.component {
  &:hover,
  &[data-hovered="true"] { @apply ...; }

  &:active,
  &[data-pressed="true"] { @apply ...; }

  &:focus-visible:not([data-focused]),
  &[data-focus-visible="true"] {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }
}
```

For RAC-managed controls, use the `data-focus-visible` state as the authority and guard the native fallback with `:not([data-focused])`, as in `button.css`. Do not add `:focus:not(:focus-visible)` to a keyboard focus-ring rule. Follow each primitive's state hooks; text-field focus styling can intentionally differ.

### React Aria className Patterns

React Aria components differ in how they accept `className`:

- **Render-prop components** (Button, Checkbox, Switch, Popover, Tooltip, Tabs, Link, Menu, Input, TextArea, Label, Text, OverlayArrow, etc.) — use `composeTwRenderProps(className, slots.foo())`.
- **String-only components** (Heading, Dialog) — pass `className` directly: `slots?.heading({className})`.

Verify against the installed `react-aria-components` types rather than this list: a component accepts render props when its resolved `className` type accepts a function (for example, `ClassNameOrFunction<…>`). Check for explicit string-only overrides even when props extend `StyleRenderProps` / `DOMRenderProps`. Upstream has been widening render-prop support over time, so treat this list as a snapshot of RAC 1.21.1.

### Composition Over Duplication

Do **not** create component-specific Label/Description/FieldError sub-components. Instead, compose with the existing shared primitives:

```tsx
import {Label} from "@/components/label";
import {Description} from "@/components/description";

<div className="flex items-center gap-3">
  <Checkbox id="terms"><Checkbox.Indicator /></Checkbox>
  <Label htmlFor="terms">Accept terms</Label>
</div>
```

### Tailwind Class Detection

Tailwind CSS scans files as plain text. **Never construct class names dynamically**:

```tsx
// BAD — Tailwind won't detect this
<div className={`text-${color}-600`} />
<span className={`button--${size}`} />

// GOOD — use complete class name mappings
const colorClasses = {
  blue: "text-blue-600",
  red: "text-red-600",
};
```

### Storybook

All stories must use the `"Components"` group in their title:

```tsx
export default { title: "Components/Button" };
```

Storybook is the primary dev workflow — run with `pnpm dev` (port 6006).

### Icon Library

HeroUI uses **Iconify** with **gravity-ui** as the default icon set.

## Documentation and External References

- Before editing `apps/docs/`, read [apps/docs/AGENTS.md](apps/docs/AGENTS.md) and applicable nested guidance. It requires consulting the relevant bundled Next.js guide under `apps/docs/node_modules/next/dist/docs/` before writing code.
- MCP documentation/search tools are optional and depend on the current environment. Discover available tools before invoking them; fall back to installed types/source and official documentation when unavailable.

## Current Components

### Completed

accordion, alert, alert-dialog, autocomplete, avatar, avatar-group, badge, breadcrumbs, button, button-group, calendar, card, checkbox, checkbox-group, chip, close-button, color-area, color-field, color-picker, color-slider, color-swatch, color-swatch-picker, combo-box, date-field, date-picker, date-range-picker, description, disclosure, disclosure-group, drawer, dropdown, empty-state, error-message, field-error, fieldset, form, header, input, input-group, input-otp, kbd, label, link, list-box, list-box-item, list-box-section, menu, menu-item, menu-section, meter, modal, number-field, pagination, popover, progress-bar, progress-circle, radio, radio-group, range-calendar, scroll-shadow, search-field, select, separator, skeleton, slider, spinner, surface, switch, switch-group, table, tabs, tag, tag-group, textarea, textfield, time-field, toast, toggle-button, toggle-button-group, toolbar, tooltip, typography

### In Progress

calendar-year-picker

Source of truth: `packages/react/src/components/index.ts`. Keep this inventory and the corresponding list in `CLAUDE.md` synchronized when adding components.

## Non-obvious Gotchas

1. **`pnpm i` runs docs typegen only** — The `postinstall` hook is just `pnpm typegen:docs`. It does **not** build `@heroui/styles` (and there is no `@heroui/docs-cn` package — Chinese docs live under `apps/docs`). Run `pnpm build` (or `pnpm --filter @heroui/styles build`) when you need `styles/dist/`, or rely on `pnpm test` / Turbo `^build`.

2. **Build order matters** — `@heroui/styles` must build before `@heroui/react`. Running `pnpm build` from root handles this via Turbo's `^build` dependency.

3. **Native addons allowlist** — `onlyBuiltDependencies` in root `pnpm-workspace.yaml` allows native compilation for `esbuild`, `@swc/core`, `@parcel/watcher`, etc. If this list is missing, you'll see "Ignored build scripts" warnings.

4. **Behavioral tests** — see [Behavioral tests](#behavioral-tests-herouireact) above. Harness lives in `@heroui/testing`; suites in `packages/react/tests/`.

5. **Commit hooks** — Husky runs `lint-staged` on pre-commit and `commitlint` on commit-msg. Non-conforming commits are rejected.

6. **Run checks before committing** — `pnpm lint && pnpm typecheck && pnpm test`

## Cursor Cloud Specific

- **Node.js v22+** is installed via binary tarball to `/usr/local/`.
- **pnpm** is activated via `corepack` — the `packageManager` field in root `package.json` declares `pnpm@10.26.2`.
- Full command reference and component architecture details are also in `CLAUDE.md`.

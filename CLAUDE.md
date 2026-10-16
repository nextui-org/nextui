# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

HeroUI v3 is a modern React UI library built with Tailwind CSS v4, using a pnpm monorepo structure managed by Turborepo.

### Key Technical Stack

- **Node.js**: v22+ required
- **pnpm**: v10.26.2 (package manager)
- **React**: v19+
- **Tailwind CSS**: v4.3.3
- **TypeScript**: v5.9.3
- **Turborepo**: Build orchestration
- **Storybook**: Component development
- **Vitest**: Testing framework

Use the workspace manifests and lockfile as the source of truth for exact dependency versions.

## Development Commands

### Core Development Commands

```bash
# Install dependencies (use --hoist flag)
pnpm i --hoist

# Start Storybook for component development
pnpm dev

# Start documentation site
pnpm dev:docs

# Build libraries (styles + React)
pnpm build

# Build React and its dependencies
pnpm build:react

# Build docs or Storybook
pnpm build:docs
pnpm build:storybook

# Run linting
pnpm lint

# Run tests (turbo → packages with a test script; jsdom + browser)
pnpm test

# Filter by file name (e.g. button.test.tsx)
pnpm --filter @heroui/react exec vitest run button

# Coverage (jsdom floors only — not a depth bar)
pnpm test:coverage

# Changed-set (local jsdom only; not a merge gate)
pnpm --filter @heroui/react test:changed

# Check formatting
pnpm run format

# Apply formatting fixes
pnpm run format:fix

# Run type checking
pnpm typecheck
```

### Behavioral tests (`@heroui/react`)

- Suites: `packages/react/tests/components/<name>/` — `*.test.tsx` (jsdom), `*.ssr.test.tsx` (Client SSR via `ssrSmoke()`, not RSC), `*.browser.test.tsx` (Playwright for high-risk portals/overlays; not universal), optional `fixtures.tsx`
- Harness: `@heroui/testing/helpers` (`render`, `setupUser`, `runAllTimers`, `ssrSmoke`, `User`); browser `render` from `@heroui/testing/browser`. Sources via `@/`. Pattern testers: `user.createTester(...)` — do not import `createTester` directly
- Query/assert: role/label/text first; HeroUI `data-*` + light BEM + documented `data-slot` on compound parts; no colors, full class lists, or RAC internals
- Timers: fake timers per-suite only; wire `advanceTimers` into `setupUser` + `User`
- Naming: `describe("Component")`; nested concern; `it` as `supports…` / `calls…` / `exposes…` / `renders…`. SSR: `"Component SSR"`; browser: `"Component (browser)"`
- Intentional skips: internals (`rac`, `icons`), non-exported helpers (`color-input-group`, `date-input-group`), in-progress `calendar-year-picker`, parent-covered parts (`list-box-item`, `menu-item`, …), Toast SSR (client portal — jsdom + browser). Public `input-group` has its own suite. SSR/browser are risk-based
- Browser setup (once locally): `pnpm --filter @heroui/testing exec playwright install chromium` before `pnpm test`. PR QA uses the same command with `--with-deps`, then `pnpm test:browser` + `pnpm test:coverage`. Release CI installs Chromium and runs `pnpm test`
- Commands: `pnpm test` (jsdom + browser, needs Chromium); filter with `pnpm --filter @heroui/react exec vitest run <name>`
- Coverage: jsdom-only floors — green ≠ depth. Browser suites contribute nothing to the coverage number. Floors are a ratchet kept ~1pt under the measured run: raise them as coverage improves, never lower them to go green. `test:changed`: local jsdom shortcut only, not a merge gate
- SSR/browser suites are risk-based — see "When a component needs an SSR or browser suite" in `AGENTS.md`. Add a browser suite when correctness depends on real layout, pointer capture, portal focus containment, or transitions; do not fake geometry in jsdom to chase coverage

### Package-Specific Commands

- For a specific package and its build dependencies, run `pnpm exec turbo build --filter=<package-name>` from the root. The root `pnpm build` script already filters to styles and React; use `build:docs` / `build:storybook` for those apps.
- Main packages: `@heroui/react`, `@heroui/styles`, `@heroui/docs`, `@heroui/storybook`

## Git Commit Convention

**IMPORTANT**: This repository uses conventional commits with strict validation. All commits must follow this format:

```
<type>(<scope>): <message>
```

### Allowed Types:

- `feat` / `feature`: New features
- `fix`: Bug fixes
- `refactor`: Code refactoring
- `style`: Code style changes
- `revert`: Revert previous changes
- `docs`: Documentation changes
- `build`: Build system changes
- `test`: Test changes
- `ci`: CI configuration changes
- `chore`: Other changes

### Examples:

```bash
git commit -m "feat(components): add new prop to avatar component"
git commit -m "fix(button): resolve click handler issue"
git commit -m "docs: update installation guide"
git commit -m "ci: add Claude Code GitHub Action workflow"
```

**Note**: Commits without proper format will be rejected by git hooks.

## Repository Architecture

### Monorepo Structure

```
/
├── apps/
│   └── docs/          # Documentation site (Next.js + Fumadocs)
├── packages/
│   ├── react/         # Main UI component library (@heroui/react)
│   ├── styles/        # CSS styles & variants (@heroui/styles)
│   │   ├── components/     # Per-component .css files (flat, e.g. button.css)
│   │   ├── themes/         # Theme variables
│   │   └── src/components/ # Per-component .styles.ts (tailwind-variants)
│   ├── standard/      # Shared ESLint, Prettier, TypeScript configs
│   ├── storybook/     # Storybook configuration
│   └── testing/       # Shared test harness (@heroui/testing)
├── turbo.json         # Turborepo configuration
└── pnpm-workspace.yaml # Workspace definition
```

### Component Architecture Pattern

Each component in `packages/react/src/components/` follows this structure:

```
component-name/
├── component-name.tsx      # Main component (uses React Aria)
├── component-name.stories.tsx # Storybook stories (title: "Components/ComponentName")
└── index.ts               # Barrel exports
```

Styling lives in `@heroui/styles`, not next to the component:

```
packages/styles/src/components/component-name/component-name.styles.ts  # tv() props → BEM class names
packages/styles/components/component-name.css                           # BEM class definitions
```

**IMPORTANT**: All Storybook stories must use the "Components" group in their title. For example: `title: "Components/Card"`, `title: "Components/Button"`, etc.

### CSS Class Naming Convention

**IMPORTANT**: HeroUI v3 uses BEM (Block Element Modifier) style for CSS classes to ensure predictable and maintainable styling:

- **Block**: The main component class (e.g., `button`, `card`, `alert`)
- **Modifier**: Variations of the component using double dashes (e.g., `button--primary`, `button--lg`, `button--icon-only`)
- **Element**: Child elements within a component (e.g., `card__header`, `alert__icon`)

**CSS-based Styling**:

- Component BEM declarations live in `packages/styles/components/*.css` across the library
- Components use `tv()` from `tailwind-variants` in `packages/styles/src/components/` to map variant props to BEM class names
- Register each stylesheet in `packages/styles/components/index.css`; shared primitives must be imported before components that override them
- Export variants through the per-component styles barrel and `packages/styles/src/components/index.ts`

**Default Size Pattern**:

**CRITICAL**: Components with size variants MUST include default dimensions in their base classes to prevent broken appearances when no size modifier is specified. Follow this pattern:

- **Base classes** include default dimensions (equivalent to the `--md` variant)
- **Medium variants** (`--md`) avoid duplicating default dimensions; supporting custom properties are allowed (for example, Avatar's `--avatar-size`)
- **Size modifiers** override the defaults when specified

Example implementation:

```css
/* Base component with default size */
.avatar {
  @apply relative flex size-10 shrink-0 overflow-hidden rounded-full;
  /* size-10 is the default, equivalent to --md */
}

/* Size variants */
.avatar--sm {
  --avatar-size: 2rem;
  @apply size-8; /* Override default */
}

.avatar--md {
  --avatar-size: 2.5rem;
  /* No duplicate layout styles as this is the default size */
}

.avatar--lg {
  --avatar-size: 3rem;
  @apply size-12; /* Override default */
}
```

This ensures components work properly without explicit size classes:

- `<div className="avatar">` → Works perfectly (size-10)
- `<div className="avatar avatar--lg">` → Override to large (size-12)

### Core Component Design Principles

**IMPORTANT**: HeroUI v3 follows a compound component pattern similar to Radix UI, built on top of React Aria Components primitives. This enables maximum flexibility and customization for users.

### React Aria Components Integration

**CRITICAL**: Before implementing any component, you MUST:

1. Visit React Aria Components docs: https://react-spectrum.adobe.com/react-aria/
2. Study the specific component's API and examples
3. Understand its accessibility features and ARIA patterns
4. Plan the transformation from React Aria's prop-based API to Radix UI's composition-based API

React Aria provides the accessibility foundation, but we transform their API to match Radix UI's compound component pattern for better customization.

#### 1. **Compound Component Pattern**:

- Export all internal component pieces (Root, Item, Trigger, Content, etc.)
- Each piece can be styled and composed independently
- Users can customize render logic without accessing internal code
- Examples: Accordion (Root, Item, Heading, Trigger, Panel, Indicator, Body), Alert (Root, Icon, Title, Description, Action, Close)

#### 2. **Export Strategy**:

```typescript
// Package-wide barrel: preserve named component and type exports
export * from "./component-name";

// Direct exports for simple components
export {Component, type ComponentProps} from "./component";

// Always export variants
export {componentVariants, type ComponentVariants} from "@heroui/styles";
```

#### 3. **Component Structure for Compound Components**:

```typescript
// Context for sharing state/styles
const ComponentContext = createContext<{slots?: ReturnType<typeof componentVariants>}>({});

// Root component wraps with context (React 19: ref is a regular prop)
const ComponentRoot = ({children, className, ref, ...props}: ComponentPropsWithRef<"div">) => {
  const slots = React.useMemo(() => componentVariants({...}), [...]);
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <ComponentContext value={contextValue}>
      <ReactAriaComponent {...props} ref={ref} className={composeTwRenderProps(className, slots.base())}>
        {children}
      </ReactAriaComponent>
    </ComponentContext>
  );
};

// Child components consume context
const ComponentItem = ({className, ref, ...props}: ComponentPropsWithRef<"div">) => {
  const {slots} = useContext(ComponentContext);

  return (
    <ReactAriaComponent {...props} ref={ref} className={composeTwRenderProps(className, slots?.item())}>
      {props.children}
    </ReactAriaComponent>
  );
};

// Named parts are also exported alongside the compound component
export {ComponentRoot, ComponentItem};
```

#### 4. **Key Implementation Details**:

1. **Styling with Tailwind Variants**:
   - Styles defined in `.styles.ts` files using `tv()` function from `tailwind-variants`
   - **IMPORTANT**: Always import from `tailwind-variants`, never from `@heroui/standard` (the workspace package for shared tooling configs)
   - **CRITICAL**: tailwind-variants already includes `twMerge` functionality, so NEVER manually use `twMerge`
   - **RULE**: Variant mappings belong in `.styles.ts` files under `packages/styles/src/components/`; BEM declarations belong in `packages/styles/components/*.css`. Keep component styling out of implementation files
   - Component implementation files (`.tsx`) should only contain logic and React Aria primitives
   - Example imports:
     ```typescript
     import type {VariantProps} from "tailwind-variants";
     import {tv} from "tailwind-variants";
     ```
   - Support for variants (primary, secondary, etc.)
   - Compound variants for conditional styling
   - Slot system for complex components

2. **Component Features**:
   - Built on React Aria Components for accessibility
   - Accept `ref` as a regular prop (React 19) — do not use `forwardRef`
   - Display names follow: `HeroUI.ComponentName` or `HeroUI.Component.SubPart`
   - Support render props from React Aria when available

3. **Type Exports**:

   ```typescript
   // Export props for each component part
   export type ComponentRootProps = {...}
   export type ComponentItemProps = {...}
   export type ComponentVariants = VariantProps<typeof componentVariants>
   ```

4. **Utilities** (`packages/react/src/utils/`):
   - `composeTwRenderProps`: Merge Tailwind classes with render props
   - `focusRingClasses`: Consistent focus styling
   - `disabledClasses`: Disabled state styling
   - `mapPropsVariants`: Separate variant props from component props

5. **React Aria Components className Patterns**:

   **CRITICAL**: React Aria components have different className prop behaviors:

   **Components that support render props** (use `composeTwRenderProps`):
   - Button, TextField, FieldError, Checkbox, CheckboxGroup
   - Switch, RadioGroup, Radio, Slider (and Track, Thumb, Output)
   - Popover, Tooltip, Tabs (and Tab, TabList, TabPanel)
   - Link, Menu, MenuItem, Accordion (DisclosureGroup)
   - Input, TextArea, Label, Text, OverlayArrow

   **Components that ONLY accept string className** (pass className directly):
   - Heading, Dialog

   As of RAC 1.21.1, `Input` and `TextArea` type `className` as `ClassNameOrFunction`, and `Label`
   and `Text` extend `DOMRenderProps` — all four accept render props. Upstream keeps widening this,
   so check the installed `react-aria-components` types instead of trusting this list.

   **Usage examples**:

   ```typescript
   // For render prop components - use composeTwRenderProps
   <ButtonPrimitive
     className={composeTwRenderProps(className, slots?.button())}
   />

   // For string-only components - pass className directly
   <HeadingPrimitive
     className={slots?.heading({className})}
   />
   // OR
   <HeadingPrimitive
     className={headingVariants({className})}
   />
   ```

   **How to check**: Inspect the installed primitive's resolved `className` type. Heading and Dialog explicitly override it with `string` even though they extend `DOMRenderProps`; inheritance alone does not establish render-prop support.

6. **Composition Pattern with Existing Components**:

   **CRITICAL**: HeroUI follows a composition-based approach. Components should reuse existing primitives rather than creating component-specific versions.

   **Key Principles**:
   - **DO NOT** create component-specific Label, Description, or FieldError components
   - **DO** reuse the existing `Label`, `Description`, and `FieldError` components
   - **DO** use standard HTML composition patterns with `htmlFor`/`id` attributes

   **Example Pattern**:

   ```typescript
   // ❌ WRONG - Component-specific label
   export const Checkbox = {
     Root: CheckboxRoot,
     Label: CheckboxLabel, // Don't create this!
   };

   // ✅ CORRECT - Compose with existing components
   import { Label } from "@/components/label";
   import { Description } from "@/components/description";

   // Usage:
   <div className="flex items-center gap-3">
     <Checkbox id="terms">
       <Checkbox.Indicator />
     </Checkbox>
     <Label htmlFor="terms">Accept terms</Label>
   </div>

   // With description:
   <div className="flex gap-3">
     <Checkbox className="mt-0.5" id="notifications">
       <Checkbox.Indicator />
     </Checkbox>
     <div className="flex flex-col gap-1">
       <Label htmlFor="notifications">Email notifications</Label>
       <Description>Get notified when someone mentions you</Description>
     </div>
   </div>
   ```

   **Components that follow this pattern**:
   - Checkbox - uses external Label/Description
   - Radio - uses external Label/Description
   - Switch - uses external Label/Description
   - TextField - provides slots for Label/Description/FieldError

### Current Components

**Completed**: accordion, alert, alert-dialog, autocomplete, avatar, avatar-group, badge, breadcrumbs, button, button-group, calendar, card, checkbox, checkbox-group, chip, close-button, color-area, color-field, color-picker, color-slider, color-swatch, color-swatch-picker, combo-box, date-field, date-picker, date-range-picker, description, disclosure, disclosure-group, drawer, dropdown, empty-state, error-message, field-error, fieldset, form, header, input, input-group, input-otp, kbd, label, link, list-box, list-box-item, list-box-section, menu, menu-item, menu-section, meter, modal, number-field, pagination, popover, progress-bar, progress-circle, radio, radio-group, range-calendar, scroll-shadow, search-field, select, separator, skeleton, slider, spinner, surface, switch, switch-group, table, tabs, tag, tag-group, textarea, textfield, time-field, toast, toggle-button, toggle-button-group, toolbar, tooltip, typography

**In Progress**: calendar-year-picker

> Source of truth: `packages/react/src/components/index.ts`.

## Development Workflow

### Standard Feature Development Process

**IMPORTANT**: When working on any feature or improvement, Claude Code MUST follow this systematic workflow to ensure accuracy and code quality:

1. **Research Phase**:
   - Thoroughly research the feature/component requirements
   - Study relevant documentation (React Aria, Tailwind CSS, etc.)
   - Analyze existing similar implementations in the codebase
   - Identify all dependencies and integration points

2. **Planning Phase**:
   - Create a detailed implementation plan with a comprehensive checklist
   - Break down the task into specific, measurable steps
   - Include testing and verification steps in the plan
   - Present the plan for review before proceeding

3. **Review & Correction Phase**:
   - Review the plan for completeness and accuracy
   - Make necessary corrections or adjustments
   - Ensure all edge cases are considered
   - Confirm the plan aligns with HeroUI patterns and conventions

4. **Execution Phase**:
   - Start executing the plan step by step
   - Use the TodoWrite tool to track progress automatically
   - Mark todos as in_progress when starting a task
   - Mark todos as completed immediately after finishing each step
   - Never batch completions - update status in real-time

5. **Verification Phase**:
   - Manually verify all changes work as expected
   - Test API calls if backend changes were made
   - Check frontend rendering and interactions
   - Run lint and type checks: `pnpm lint && pnpm typecheck`
   - Ensure all tests pass: `pnpm test`

**Example Workflow**:

```
User: "Add a new Select component"

Claude:
1. Research: Studies React Aria Select, existing patterns
2. Plan: Creates detailed checklist with 15+ items
3. Review: Presents plan for feedback
4. Execute: Implements step-by-step with todo updates
5. Verify: Tests component, runs checks, confirms functionality
```

This workflow ensures thorough understanding, proper planning, and high-quality implementation with full transparency throughout the process.

### Component Development Workflow

1. **Creating New Components**:

   **CRITICAL: Research & Design Phase**:
   - **FIRST**: Check the Figma design for the component breakdown (e.g., Menu Container, Menu Item, etc.)
   - **SECOND**: Research the React Aria Components documentation at https://react-spectrum.adobe.com/react-aria/
   - Find the appropriate React Aria primitive (e.g., CheckboxGroup, Dialog, Select, etc.)
   - Understand the React Aria API, props, and accessibility features
   - Map Figma component pieces to React Aria components and plan the compound structure
   - Plan how to adapt it to follow Radix UI's compound component pattern

   **Component Creation - ALWAYS USE THE SCRIPT**:

   ```bash
   # Navigate to packages/react directory
   cd packages/react

   # Use the add:component script
   pnpm add:component ComponentName

   # Examples:
   pnpm add:component Menu
   pnpm add:component Select
   pnpm add:component DatePicker
   ```

   This script will:
   - Create starter component, styles, story, and barrel files
   - Add the export to `src/components/index.ts`
   - Generate TypeScript boilerplate that still needs the migration steps below

   The scaffold still emits legacy patterns. Complete these migration steps:
   - Move `<component-name>.styles.ts` to `packages/styles/src/components/<component-name>/`; replace utility-based variants with BEM mappings and use `componentNameVariants` / `ComponentNameVariants` naming.
   - Add the styles directory's `index.ts` and export it from `packages/styles/src/components/index.ts`.
   - Create `packages/styles/components/<component-name>.css` and register it in `packages/styles/components/index.css`, after any shared primitives it overrides.
   - Update component imports and React barrel re-exports to use `@heroui/styles` instead of the generated local styles path.
   - Replace generated `forwardRef` with React 19 ref-as-prop handling, choose the appropriate React Aria primitive, and forward remaining DOM/ARIA/event props.
   - Add documented `data-slot` hooks, named compound exports where appropriate, current Storybook examples, and behavioral tests (SSR/browser when the risk criteria apply).

   After creating the component:

   ```bash
   # Return to the repository root and build styles before React via Turbo
   cd ../..
   pnpm build
   ```

   Development package exports point to source. Building produces `dist/`; React's `prepack` hook runs `clean-package` and `scripts/update-exports.mjs` to generate published exports during `pnpm pack`. The `postpack` hook restores the development manifest.

   **Implementation Steps**:
   - Study existing HeroUI components (accordion, alert) to understand the compound pattern
   - Use React Aria Components as the foundation for accessibility
   - Transform React Aria's API to match Radix UI patterns:
     - Single component → Multiple exported parts (Item, Trigger, Content, etc.)
     - Props-based API → Composition-based API
     - Internal state → Context-based state sharing
   - Create Context for sharing styles across component parts
   - Export ALL component parts for maximum customization
   - Define styles in separate `.styles.ts` file with slot system
   - Add "use client" directive at the top of component file
   - Create comprehensive Storybook stories showing all variants and compositions
   - Use named `Object.assign` exports in component barrels and `export * from "./component-name"` in the package component barrel

   **Example Transformation**:

   ```typescript
   // React Aria: Group with a label and checkbox children
   <CheckboxGroup value={selected} onChange={setSelected}>
     <Label>Options</Label>
     <Checkbox value="1">Option 1</Checkbox>
   </CheckboxGroup>

   // HeroUI: Compose shared primitives with the group's RAC onChange callback
   <CheckboxGroup value={selected} onChange={setSelected}>
     <Label>Options</Label>
     <Checkbox value="1">
       <Checkbox.Control>
         <Checkbox.Indicator />
       </Checkbox.Control>
       <Checkbox.Content>
         <Label>Option 1</Label>
       </Checkbox.Content>
     </Checkbox>
   </CheckboxGroup>
   ```

   **Example of a compound component exports**

   ```typescript
   export const Accordion = Object.assign(AccordionRoot, {
     Root: AccordionRoot,
     Item: AccordionItem,
     Heading: AccordionHeading,
     Trigger: AccordionTrigger,
     Panel: AccordionPanel,
     Indicator: AccordionIndicator,
     Body: AccordionBody,
   });

   export type {
     AccordionRootProps,
     AccordionRootProps as AccordionProps,
     AccordionItemProps,
     AccordionHeadingProps,
     AccordionTriggerProps,
     AccordionPanelProps,
     AccordionIndicatorProps,
     AccordionBodyProps,
   } from "./accordion";

   export {
     AccordionRoot,
     AccordionItem,
     AccordionHeading,
     AccordionTrigger,
     AccordionPanel,
     AccordionIndicator,
     AccordionBody,
   };
   export {accordionVariants, type AccordionVariants} from "@heroui/styles";
   ```

   **IMPORTANT**: Use named exports, including `.Root`. Also expose the compound props type namespace (`Accordion.Props`, `Accordion.ItemProps`, etc.); see `packages/react/src/components/accordion/index.ts` for the complete implementation.

2. **Testing**:
   - Follow Behavioral tests conventions above (semantics-first, `setupUser`, `data-*` state hooks)
   - Run `pnpm test` for jsdom + browser; filter with `pnpm --filter @heroui/react exec vitest run <name>`
   - Place tests under `packages/react/tests/components/<name>/` (`*.test.tsx` / `*.ssr.test.tsx` / `*.browser.test.tsx`, optional `fixtures.tsx`)
   - Prefer arrow functions for harness helpers and test fixtures

3. **Documentation**:
   - Read [apps/docs/AGENTS.md](apps/docs/AGENTS.md) and applicable nested guidance before editing the docs app. Consult the relevant bundled Next.js guide under `apps/docs/node_modules/next/dist/docs/` before writing code.
   - Docs live in `apps/docs/content/`
   - Uses MDX format
   - HeroUI components are pre-imported

4. **Version Management**:
   - Uses [bumpp](https://github.com/antfu/bumpp) for version bumping
   - Run `pnpm version:bump` to interactively bump the version, commit, and tag
   - Pushing a `v*` tag triggers the release CI workflow
   - Follow semantic versioning

## Icon Library

**IMPORTANT**: HeroUI uses Iconify with gravity-ui as the default icon set.

## Important Notes

- Always prefer editing existing files over creating new ones
- **NEVER** create documentation files (_.md, _.mdx, README files) unless explicitly requested by the user
- Follow the established component patterns and conventions
- Ensure accessibility with React Aria Components
- Maintain TypeScript type safety
- Use the commit convention to avoid git hook failures
- Run lint and type checks before committing: `pnpm lint && pnpm typecheck`

## Tailwind CSS Class Detection Rules

**CRITICAL**: Tailwind CSS scans files as plain text and requires complete class names to be statically detectable.

### Key Rules:

1. **Never construct class names dynamically**

   ❌ **BAD** - Dynamic string concatenation:

   ```jsx
   // These patterns will NOT work:
   <div className={`text-${color}-600`} />
   <button className={`bg-${variant}-500`} />
   <span className={`button--${size}`} />
   ```

   ✅ **GOOD** - Complete class names:

   ```jsx
   // Use complete strings or object mappings:
   <div className={error ? "text-red-600" : "text-green-600"} />
   ```

2. **Use object mappings for dynamic classes**

   ❌ **BAD** - Props in template literals:

   ```jsx
   function Button({color}) {
     return <button className={`bg-${color}-600 hover:bg-${color}-500`} />;
   }
   ```

   ✅ **GOOD** - Map props to complete classes:

   ```jsx
   function Button({color}) {
     const colorVariants = {
       blue: "bg-blue-600 hover:bg-blue-500",
       red: "bg-red-600 hover:bg-red-500",
     };
     return <button className={colorVariants[color]} />;
   }
   ```

3. **For BEM-style classes, use complete mappings**

   ✅ **GOOD** - Complete class name mappings:

   ```jsx
   const sizeClasses = {
     sm: "button--sm",
     md: "button--md",
     lg: "button--lg",
   };

   // Use the mapping:
   className={sizeClasses[size]}
   ```

### Why This Matters:

- Tailwind generates CSS only for classes it can detect in your source files
- Dynamic concatenation prevents Tailwind from finding the complete class names
- Missing classes = missing styles in production

## Figma Integration & MCP Server Rules

### Figma Dev Mode MCP Server

**IMPORTANT**: When creating components with Figma designs:

1. **Component Breakdown**: Figma designs are already broken down into component pieces (e.g., Menu Container, Menu Item, etc.). Use these as reference for:
   - Component structure and naming (adapt to code conventions)
   - Visual styling and spacing
   - Component composition patterns

2. **MCP Server Rules**:
   - The Figma Dev Mode MCP Server provides an assets endpoint for images and SVG assets
   - **CRITICAL**: If the Figma MCP Server returns a localhost source for an image or SVG, use that source directly
   - **DO NOT** import or add new icon packages - all assets should come from the Figma payload
   - **DO NOT** use or create placeholders if a localhost source is provided
   - Always use the actual assets from Figma MCP Server

3. **Workflow**:
   - Check Figma for component visual design and breakdown
   - Map Figma component names to appropriate React Aria primitives
   - Use Figma assets (icons, images) directly from the MCP Server
   - Implement styles based on Figma design tokens and specifications

## Library Documentation with Context7 MCP

Context7 MCP availability depends on the environment. Discover the installed tools and their schemas before invoking them. If unavailable, use installed types/source and official documentation for the repository's dependency versions.

### When to Use Context7

Use Context7 MCP when working with external libraries, especially:

- **Tailwind CSS v4**: When working with Tailwind CSS v4 features, use Context7 to get the latest documentation at https://context7.com/context7/tailwindcss
- **Fumadocs**: When working on the documentation site in `apps/docs/`, use Context7 to get the latest Fumadocs framework documentation
- **Next.js**: For Next.js specific features and APIs used in the docs app
- Any other third-party libraries where up-to-date documentation is needed

### How to Use Context7

1. If Context7 is available, resolve the library ID using its exposed lookup tool
2. Fetch or query documentation using the exposed documentation tool and resolved ID; tool names can vary by installation
3. Check examples against the installed dependency versions before applying them

### Example Usage Areas

- Implementing new documentation features in `apps/docs/`
- Configuring Fumadocs settings in `source.config.ts`
- Working with MDX components and layouts
- Setting up search functionality
- Implementing documentation navigation and structure

## GitHub Repository Search with Grep MCP

Grep MCP is optional. If available, inspect its current search tool schema before using it. Otherwise use local `rg` searches, installed dependency source, and official examples; do not assume a specific MCP server is configured.

### When to Use Grep MCP

When available, use Grep MCP's GitHub search tool for complex problems that require:

- **Real-world implementation examples**: Finding how other developers solve similar problems
- **Best practices and patterns**: Discovering production-ready code patterns
- **Library usage examples**: Understanding how specific APIs or libraries are used in practice
- **Complex integrations**: Seeing how different libraries work together
- **Error handling patterns**: Learning from battle-tested error handling approaches

### How to Use Grep MCP

The Grep MCP searches for **literal code patterns**, not keywords. Use actual code syntax:

**Good examples**:

- `'useState('` - Find React hooks usage
- `'import { tv } from "tailwind-variants"'` - Find tailwind-variants imports
- `'forwardRef<'` - Find forwardRef usage patterns
- `'(?s)useEffect\\(\\(\\) => {.*return.*}'` - Find useEffect with cleanup (regex)

**Bad examples**:

- `'react best practices'` - This is a keyword, not code
- `'how to use tailwind'` - Use actual import statements instead

### Example Use Cases

1. **Complex Component Patterns**:
   - Search: `'compound.*component'` with language=['TypeScript', 'TSX']
   - Find how others implement compound component patterns

2. **Accessibility Implementations**:
   - Search: `'AriaProps'` or `'useAriaLabel'`
   - Discover accessibility patterns in React apps

3. **Monorepo Configurations**:
   - Search: `'pnpm-workspace.yaml'` with path='pnpm-workspace.yaml'
   - Study monorepo setups similar to HeroUI

4. **Tailwind CSS v4 Patterns**:
   - Search: `'@import "tailwindcss"'` with language=['CSS']
   - Find Tailwind CSS v4 usage patterns

5. **React Aria Components Usage**:
   - Search: `'from "react-aria-components"'`
   - See how others integrate React Aria Components

### Best Practices

- Use language filters to narrow results (e.g., `language=['TypeScript', 'TSX']`)
- Use regex patterns with `useRegexp=true` for flexible matching
- Filter by well-known repositories for quality examples (e.g., `repo='vercel/'`)
- Combine with file path filters for specific file types

## Agent-Specific Guidelines

### For style-migrator and tailwind-v4-css-expert Agents

When working with HeroUI CSS components, follow these critical patterns:

#### Default Size Implementation

**REQUIRED**: CSS components with size variants MUST follow the default size pattern:

1. **Base classes** include default dimensions equivalent to `--md` variant
2. **Medium variant** (`--md`) avoids duplicate dimensions; supporting custom properties are allowed
3. **Size variants** override the base defaults

**Template for CSS components with size variants:**

```css
/* Base component styles */
.component {
  /* Base styling */
  @apply [base-styles];

  /* Default size - matches component--md variant */
  @apply [default-size-classes];
}

/* Size variants */
.component--sm {
  @apply [small-size-overrides];
}

.component--md {
  /* No styles as this is the default size */
}

.component--lg {
  @apply [large-size-overrides];
}
```

#### Pseudo-Class Fallback Pattern

**REQUIRED**: All interactive components MUST include both pseudo-class and data-attribute support:

```css
/* Interactive states - both approaches */
.component {
  /* Hover states */
  &:hover,
  &[data-hovered="true"] {
    @apply [hover-styles];
  }

  /* Active/pressed states */
  &:active,
  &[data-pressed="true"] {
    @apply [active-styles];
  }

  /* Focus states */
  &:focus-visible:not([data-focused]),
  &[data-focus-visible="true"] {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }
}
```

For RAC-managed controls, use `data-focus-visible` as the authority and guard the native fallback with `:not([data-focused])`, as in `button.css`. Do not add `:focus:not(:focus-visible)` to keyboard focus-ring rules. Follow each primitive's state hooks; text-field focus styling can intentionally differ.

#### Component Examples

- **button.css**: Base has `h-10 md:h-9`, empty `.button--md` variant
- **avatar.css**: Base has `size-10`; `.avatar--md` sets `--avatar-size` without duplicating layout styles
- **spinner.css**: Base has `size-6`, empty `.spinner--md` variant

These patterns ensure components never appear broken and maintain consistency across the design system.

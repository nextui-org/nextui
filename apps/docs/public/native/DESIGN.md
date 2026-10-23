---
name: HeroUI Native Default Theme
library: heroui-native
styles: heroui-native/styles
platforms:
  - ios
  - android
modes:
  - light
  - dark
source: "https://github.com/heroui-inc/heroui-native/blob/main/src/styles/variables.css"
---

# HeroUI Native Default Theme

Use this file as the visual implementation contract when building a mobile product with HeroUI Native. It describes the default theme for designers and coding agents. The installed HeroUI Native styles remain the source of truth.

## Setup

HeroUI Native uses Tailwind CSS v4 through Uniwind. Import the library styles in the app's CSS entry:

```css
@import "tailwindcss";
@import "uniwind";
@import "heroui-native/styles";
```

Wrap the app so gesture-driven components, portals, safe areas, animation settings, and toasts work correctly:

```tsx
import {HeroUINativeProvider} from "heroui-native";
import {View} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <HeroUINativeProvider>
        <View className="flex-1 bg-background">{/* App content */}</View>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
```

Uniwind selects light or dark mode from the system preference and supports manual switching with `Uniwind.setTheme()`.

## Design Direction

- Build calm, focused mobile interfaces with a clear content hierarchy.
- Prefer spacing, typography, and surface levels over decoration.
- Use one strong accent for primary actions and reserve status colors for meaning.
- Compose interfaces from HeroUI Native components before creating custom primitives.
- Design for touch, safe areas, the on-screen keyboard, and platform accessibility.
- Let semantic tokens adapt the same component code between light and dark modes.

## Colors

Use semantic HeroUI Native tokens and Uniwind utilities in product code. Raw values are included for design handoff and visual QA only. Do not branch component code by color mode.

| Role | Uniwind utilities | CSS variables | Light | Dark | Purpose |
| --- | --- | --- | --- | --- | --- |
| Canvas | `bg-background text-foreground` | `--background`, `--foreground` | `oklch(0.9702 0 0)`, `oklch(0.2103 0.0059 285.89)` | `oklch(12% 0.005 285.823)`, `oklch(0.9911 0 0)` | Screen background and primary content |
| Surface | `bg-surface text-surface-foreground` | `--surface`, `--surface-foreground` | white, foreground | `oklch(0.2103 0.0059 285.89)`, foreground | Cards and non-floating containers |
| Secondary surface | `bg-surface-secondary` | `--surface-secondary` | `oklch(0.9524 0.0013 286.37)` | `oklch(0.257 0.0037 286.14)` | Nested or lower-emphasis regions |
| Tertiary surface | `bg-surface-tertiary` | `--surface-tertiary` | `oklch(0.9373 0.0013 286.37)` | `oklch(0.2721 0.0024 247.91)` | Stronger surface separation |
| Overlay | `bg-overlay text-overlay-foreground` | `--overlay`, `--overlay-foreground` | white, foreground | `oklch(0.2103 0.0059 285.89)`, foreground | Dialogs, menus, popovers, and sheets |
| Backdrop | `bg-backdrop` | `--backdrop` | black at 20% | black at 20% | Content dimming behind overlays |
| Muted content | `text-muted` | `--muted` | `oklch(0.5517 0.0138 285.94)` | `oklch(70.5% 0.015 286.067)` | Supporting text and secondary icons |
| Neutral action | `bg-default text-default-foreground` | `--default`, `--default-foreground` | `oklch(94% 0.001 286.375)`, eclipse | `oklch(27.4% 0.006 286.033)`, snow | Neutral controls and selected states |
| Accent | `bg-accent text-accent-foreground` | `--accent`, `--accent-foreground` | `oklch(0.6204 0.195 253.83)`, snow | same as light | Primary actions, focus, and emphasis |
| Success | `bg-success text-success-foreground` | `--success`, `--success-foreground` | `oklch(0.7329 0.1935 150.81)`, eclipse | same as light | Positive outcomes and completed states |
| Warning | `bg-warning text-warning-foreground` | `--warning`, `--warning-foreground` | `oklch(0.7819 0.1585 72.33)`, eclipse | `oklch(0.8203 0.1388 76.34)`, eclipse | Caution and attention |
| Danger | `bg-danger text-danger-foreground` | `--danger`, `--danger-foreground` | `oklch(0.6532 0.2328 25.74)`, snow | `oklch(0.594 0.1967 24.63)`, snow | Errors and destructive actions |
| Field | `bg-field text-field-foreground` | `--field-background`, `--field-foreground` | white, eclipse | eclipse, foreground | Inputs and interactive fields |
| Border | `border-border` | `--border` | `oklch(90% 0.004 286.32)` | `oklch(28% 0.006 286.033)` | Component boundaries |
| Separator | `border-separator` | `--separator` | `oklch(74% 0.004 286.32)` | `oklch(40% 0.006 286.033)` | Visible structural dividers on mobile screens |

Hover, focus, soft, inverse, and secondary or tertiary border colors are derived with `color-mix()`. Use semantic utilities such as `bg-accent-hover`, `bg-accent-soft`, `text-accent-soft-foreground`, `border-border-secondary`, and `border-separator-secondary` instead of recreating those formulas.

## Typography

HeroUI Native text is rendered through React Native text primitives and respects the provider's font-scaling configuration.

- React Native text styles do not inherit from `View` or `Pressable`. Apply typography and text-color utilities directly to text-based parts such as `Button.Label`, `Card.Title`, and `Card.Description`.
- Style a component's root for layout, background, border, and spacing; style its text slot separately for color, font family, weight, size, line height, and alignment.
- Keep `allowFontScaling` enabled unless a documented product requirement says otherwise.
- Keep body copy readable, concise, and comfortably spaced on small screens.
- Use tabular numbers for changing metrics, prices, counters, and aligned numeric data.
- When using custom fonts, define all four families together: `--font-normal`, `--font-medium`, `--font-semibold`, and `--font-bold`.

## Layout

HeroUI Native uses Tailwind spacing utilities through Uniwind rather than a HeroUI-specific spacing token.

- Design the unprefixed layout for narrow phone screens. Add Uniwind breakpoint variants only when adapting for tablets, foldables, landscape layouts, or other wide windows; phone-only screens may not need breakpoints.
- Respect safe-area insets for screen edges, floating controls, sheets, and toasts.
- Account for the on-screen keyboard around forms and bottom-aligned actions.
- Keep related controls and content visually grouped with consistent gaps and padding.
- Prefer flex layouts and content-driven sizing over fixed screen dimensions.
- Use logical start and end positioning so layouts remain correct in RTL languages.

## Shapes

The base radius is `--radius: 0.5rem` (8px). The current default field radius is `--field-radius: calc(var(--radius) * 1.75)` (14px).

| Utility | Formula | Default value |
| --- | --- | --- |
| `rounded-xs` | `calc(var(--radius) * 0.25)` | 2px |
| `rounded-sm` | `calc(var(--radius) * 0.5)` | 4px |
| `rounded-md` | `calc(var(--radius) * 0.75)` | 6px |
| `rounded-lg` | `calc(var(--radius) * 1)` | 8px |
| `rounded-xl` | `calc(var(--radius) * 1.5)` | 12px |
| `rounded-2xl` | `calc(var(--radius) * 2)` | 16px |
| `rounded-3xl` | `calc(var(--radius) * 3)` | 24px |
| `rounded-4xl` | `calc(var(--radius) * 4)` | 32px |

Use the scale consistently. Inner media and nested surfaces should have a visibly related, usually smaller, radius than their parent.

## Elevation and Depth

- Use `shadow-surface` for cards and raised screen content.
- Use `shadow-overlay` for floating layers such as dialogs, menus, popovers, and sheets.
- Use `shadow-field` when the field component applies it.
- Dark mode intentionally removes surface and field shadows and gives overlays a subtle inset edge.
- Do not stack custom shadows on HeroUI Native components that already provide elevation.

## Components

- **Buttons:** Use semantic variants. `primary` is the main action, `secondary` is an alternative, `tertiary` is dismissive or low emphasis, `outline` is a bordered low-emphasis action, `ghost` is an unbordered low-emphasis action, `danger` is destructive, and `danger-soft` is a quieter destructive action. Put label styling on `Button.Label`, prefer one primary action per context, and reach for an existing variant instead of restyling a button.
- **Cards and surfaces:** Use `Card`, `Surface`, and semantic surface utilities. Create hierarchy with surface levels and spacing before adding borders.
- **Forms:** Use HeroUI Native field components so input, label, placeholder, validation, disabled, and keyboard behavior stay consistent.
- **Status:** Use success, warning, and danger only for their semantic meanings. Pair color with text or an accessibility label.
- **Overlays:** Use the compound `Dialog`, `Popover`, `Menu`, `Select`, and `BottomSheet` APIs. Keep overlay content inside its portal and preserve the overlay, content, trigger, and close parts.
- **Compound components:** Compose dot-notation parts such as `Accordion.Item`, `Tabs.Trigger`, and `Button.Label`. Use `asChild` when a HeroUI part must delegate to another pressable without an extra wrapper.
- **Custom components:** Reuse exported `classNames` functions when custom primitives should visually match HeroUI Native.

## Interaction and Accessibility

- Use `onPress` and native pressable behavior rather than web click handlers.
- Preserve accessibility roles, labels, hints, selected state, disabled state, and live feedback for VoiceOver and TalkBack.
- Keep touch targets comfortable; use a component's `hitSlop` when the visible control is intentionally compact.
- Keep the default `--opacity-disabled: 0.5` and do not make disabled controls interactive.
- Preserve text scaling and test layouts with larger accessibility font sizes.
- Keep interactive state local to portalled content when parent re-renders could disrupt inputs or suggestions.
- Test gesture-driven controls on both iOS and Android.

## Motion

HeroUI Native motion is implemented with React Native Reanimated and React Native Gesture Handler.

- Customize built-in motion through a component's `animation` prop instead of overriding animated styles.
- Animated styles and the React Native `style` prop take precedence over `className`.
- Preserve the library's response to the device Reduce Motion setting.
- Use `animation="disable-all"` on a component, or the provider animation setting, when motion must be disabled.
- Use animation to explain presses, selection, expansion, dismissal, and spatial movement—not as decoration.

## Do

- Use HeroUI Native components and documented variants before writing custom primitives.
- Use semantic tokens as implementation handles and raw values only for reference or migration.
- Use the same token in light and dark modes and let Uniwind resolve the current value.
- Design from a mobile-first baseline and verify both iOS and Android behavior.
- Establish hierarchy with content order, spacing, type, and surface level.
- Reserve accent for meaningful emphasis and keep status colors semantic.
- Preserve safe areas, touch behavior, font scaling, RTL layout, and reduced-motion preferences.

## Don't

- Don't hardcode colors, shadows, or radii when a HeroUI Native token or Uniwind utility exists.
- Don't use raw neutral palette classes such as `gray-*` where a semantic surface or content token applies.
- Don't place text styles only on a compound component's non-text root.
- Don't replace `onPress`, gesture handling, portals, or accessibility behavior with web-oriented patterns.
- Don't use color alone to communicate state or hierarchy.
- Don't mix unrelated radius, padding, or elevation systems in one screen.
- Don't let floating controls, sheets, or toasts overlap safe areas or the keyboard.
- Don't override an animated property with `className`; use the component's `animation` prop.

## Source of Truth

- Default theme variables: https://github.com/heroui-inc/heroui-native/blob/main/src/styles/variables.css
- Uniwind token mappings: https://github.com/heroui-inc/heroui-native/blob/main/src/styles/theme.css
- Component documentation: https://heroui.com/docs/native/components
- Quick start: https://heroui.com/docs/native/getting-started/quick-start
- Colors: https://heroui.com/docs/native/getting-started/colors
- Theming: https://heroui.com/docs/native/getting-started/theming
- Design principles: https://heroui.com/docs/native/getting-started/design-principles

When this file and the installed package disagree, follow the installed HeroUI Native version and its styles.

import type {Meta} from "@storybook/react";

import React from "react";

const meta: Meta = {
  title: "Color System",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

interface ColorItemProps {
  name: string;
  variable: string;
  cssVariable?: string;
}

const ColorItem = ({cssVariable, name, variable}: ColorItemProps) => {
  const computedColor =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement)
          .getPropertyValue(cssVariable || variable)
          .trim()
      : "";

  return (
    <div className="flex items-center gap-4 rounded-3xl bg-surface p-4 shadow-surface">
      <div
        className="size-12 shrink-0 rounded-xl border border-border"
        style={{backgroundColor: `var(${variable})`}}
      />
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <code className="text-xs text-muted">{variable}</code>
      </div>
      {!!computedColor && (
        <div className="text-end">
          <code className="font-mono text-xs text-muted">{computedColor}</code>
        </div>
      )}
    </div>
  );
};

interface ColorSectionProps {
  title: string;
  colors: ColorItemProps[];
}

const ColorSection = ({colors, title}: ColorSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      <div className="grid gap-3">
        {colors.map((color) => (
          <ColorItem key={color.variable} {...color} />
        ))}
      </div>
    </div>
  );
};

export const AllColors = () => {
  const baseColors: ColorItemProps[] = [
    {name: "Background", variable: "--color-background"},
    {name: "Foreground", variable: "--color-foreground"},
    {name: "Surface", variable: "--color-surface"},
    {name: "Surface Foreground", variable: "--color-surface-foreground"},
    {name: "Surface Hover", variable: "--color-surface-hover"},
    {name: "Overlay", variable: "--color-overlay"},
    {name: "Overlay Foreground", variable: "--color-overlay-foreground"},
  ];

  const brandColors: ColorItemProps[] = [
    {name: "Accent", variable: "--color-accent"},
    {name: "Accent Foreground", variable: "--color-accent-foreground"},
  ];

  const semanticColors: ColorItemProps[] = [
    {name: "Default", variable: "--color-default"},
    {name: "Default Foreground", variable: "--color-default-foreground"},
    {name: "Success", variable: "--color-success"},
    {name: "Success Foreground", variable: "--color-success-foreground"},
    {name: "Warning", variable: "--color-warning"},
    {name: "Warning Foreground", variable: "--color-warning-foreground"},
    {name: "Danger", variable: "--color-danger"},
    {name: "Danger Foreground", variable: "--color-danger-foreground"},
  ];

  const componentColors: ColorItemProps[] = [
    {name: "Muted", variable: "--color-muted"},
    {name: "Border", variable: "--color-border"},
    {name: "Separator", variable: "--color-separator"},
    {name: "Focus", variable: "--color-focus"},
    {name: "Link", variable: "--color-link"},
    {name: "Segment", variable: "--color-segment"},
    {name: "Segment Foreground", variable: "--color-segment-foreground"},
  ];

  const formFieldColors: ColorItemProps[] = [
    {name: "Field Background", variable: "--color-field"},
    {name: "Field Foreground", variable: "--color-field-foreground"},
    {name: "Field Placeholder", variable: "--color-field-placeholder"},
    {name: "Field Border", variable: "--color-field-border"},
  ];

  const primitiveColors: ColorItemProps[] = [
    {name: "White", variable: "--white"},
    {name: "Black", variable: "--black"},
    {name: "Snow", variable: "--snow"},
    {name: "Eclipse", variable: "--eclipse"},
  ];

  const calculatedBackgroundColors: ColorItemProps[] = [
    {name: "Background Secondary", variable: "--color-background-secondary"},
    {name: "Background Tertiary", variable: "--color-background-tertiary"},
    {name: "Background Inverse", variable: "--color-background-inverse"},
  ];

  const calculatedHoverColors: ColorItemProps[] = [
    {name: "Default Hover", variable: "--color-default-hover"},
    {name: "Accent Hover", variable: "--color-accent-hover"},
    {name: "Success Hover", variable: "--color-success-hover"},
    {name: "Warning Hover", variable: "--color-warning-hover"},
    {name: "Danger Hover", variable: "--color-danger-hover"},
  ];

  const calculatedSoftColors: ColorItemProps[] = [
    {name: "Accent Soft", variable: "--color-accent-soft"},
    {name: "Accent Soft Foreground", variable: "--color-accent-soft-foreground"},
    {name: "Accent Soft Hover", variable: "--color-accent-soft-hover"},
    {name: "Danger Soft", variable: "--color-danger-soft"},
    {name: "Danger Soft Foreground", variable: "--color-danger-soft-foreground"},
    {name: "Danger Soft Hover", variable: "--color-danger-soft-hover"},
    {name: "Warning Soft", variable: "--color-warning-soft"},
    {name: "Warning Soft Foreground", variable: "--color-warning-soft-foreground"},
    {name: "Warning Soft Hover", variable: "--color-warning-soft-hover"},
    {name: "Success Soft", variable: "--color-success-soft"},
    {name: "Success Soft Foreground", variable: "--color-success-soft-foreground"},
    {name: "Success Soft Hover", variable: "--color-success-soft-hover"},
  ];

  const calculatedSurfaceColors: ColorItemProps[] = [
    {name: "Surface", variable: "--color-surface"},
    {name: "Surface Secondary", variable: "--color-surface-secondary"},
    {name: "Surface Tertiary", variable: "--color-surface-tertiary"},
  ];

  const calculatedFieldColors: ColorItemProps[] = [
    {name: "Field Hover", variable: "--color-field-hover"},
    {name: "Field Focus", variable: "--color-field-focus"},
    {name: "Field Border Hover", variable: "--color-field-border-hover"},
    {name: "Field Border Focus", variable: "--color-field-border-focus"},
  ];

  const calculatedInSurfaceColors: ColorItemProps[] = [
    {name: "On Surface", variable: "--color-on-surface"},
    {name: "On Surface Foreground", variable: "--color-on-surface-foreground"},
    {name: "On Surface Hover", variable: "--color-on-surface-hover"},
    {name: "On Surface Focus", variable: "--color-on-surface-focus"},
  ];

  const calculatedInSurfaceSecondaryColors: ColorItemProps[] = [
    {name: "On Surface Secondary", variable: "--color-on-surface-secondary"},
    {name: "On Surface Secondary Foreground", variable: "--color-on-surface-secondary-foreground"},
    {name: "On Surface Secondary Hover", variable: "--color-on-surface-secondary-hover"},
    {name: "On Surface Secondary Focus", variable: "--color-on-surface-secondary-focus"},
  ];

  const calculatedInSurfaceTertiaryColors: ColorItemProps[] = [
    {name: "On Surface Tertiary", variable: "--color-on-surface-tertiary"},
    {name: "On Surface Tertiary Foreground", variable: "--color-on-surface-tertiary-foreground"},
    {name: "On Surface Tertiary Hover", variable: "--color-on-surface-tertiary-hover"},
    {name: "On Surface Tertiary Focus", variable: "--color-on-surface-tertiary-focus"},
  ];

  const calculatedSeparatorColors: ColorItemProps[] = [
    {name: "Separator", variable: "--color-separator"},
    {name: "Separator Secondary", variable: "--color-separator-secondary"},
    {name: "Separator Tertiary", variable: "--color-separator-tertiary"},
  ];

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Color System</h1>
        <p className="text-muted">HeroUI's color palette with CSS variables and computed values</p>
      </div>

      <ColorSection colors={baseColors} title="Base Colors" />
      <ColorSection colors={brandColors} title="Brand Colors" />
      <ColorSection colors={semanticColors} title="Semantic Colors" />
      <ColorSection colors={componentColors} title="Component Colors" />
      <ColorSection colors={formFieldColors} title="Form Field Colors" />
      <ColorSection colors={primitiveColors} title="Primitive Colors" />

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Calculated Colors</h2>
        <p className="mb-6 text-sm text-muted">
          These colors are dynamically calculated using color-mix() from base colors
        </p>
        <ColorSection colors={calculatedBackgroundColors} title="Background Shades" />
        <ColorSection colors={calculatedHoverColors} title="Hover States" />
        <ColorSection colors={calculatedSoftColors} title="Soft Variants" />
        <ColorSection colors={calculatedSurfaceColors} title="Surface Levels" />
        <ColorSection colors={calculatedInSurfaceColors} title="On Surface Colors" />
        <ColorSection
          colors={calculatedInSurfaceSecondaryColors}
          title="On Surface Colors - Secondary"
        />
        <ColorSection
          colors={calculatedInSurfaceTertiaryColors}
          title="On Surface Colors - Tertiary"
        />
        <ColorSection colors={calculatedSeparatorColors} title="Separator Colors" />
        <ColorSection colors={calculatedFieldColors} title="Field States" />
      </div>
    </div>
  );
};

AllColors.parameters = {
  docs: {
    description: {
      story:
        "A comprehensive overview of all color tokens available in the HeroUI design system. Each color shows its CSS variable name and computed value.",
    },
  },
};

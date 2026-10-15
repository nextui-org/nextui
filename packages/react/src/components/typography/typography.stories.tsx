import type {Meta, StoryObj} from "@storybook/react";

import {Typography} from "./index";

const meta: Meta<typeof Typography> = {
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end", "justify"],
    },
    color: {
      control: "select",
      options: ["default", "muted"],
    },
    type: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "body", "body-sm", "body-xs", "code"],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
    },
  },
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Typography",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "HeroUI Typography",
    type: "body",
  },
};

export const HeadingScale: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <Typography.Heading level={1}>Heading Level 1</Typography.Heading>
      <Typography.Heading level={2}>Heading Level 2</Typography.Heading>
      <Typography.Heading level={3}>Heading Level 3</Typography.Heading>
      <Typography.Heading level={4}>Heading Level 4</Typography.Heading>
      <Typography.Heading level={5}>Heading Level 5</Typography.Heading>
      <Typography.Heading level={6}>Heading Level 6</Typography.Heading>
    </div>
  ),
};

export const BodySizes: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <Typography color="muted" type="body-xs" weight="semibold">
          BODY — DEFAULT (BASE)
        </Typography>
        <Typography.Paragraph>
          Until now, trying to style an article, document, or blog post with Tailwind has been a
          tedious task that required a keen eye for typography and a lot of complex custom CSS.
        </Typography.Paragraph>
      </div>
      <div>
        <Typography color="muted" type="body-xs" weight="semibold">
          BODY — SMALL
        </Typography>
        <Typography.Paragraph size="sm">
          By default, Tailwind removes all of the default browser styling from paragraphs, headings,
          lists and more. This ends up being really useful for building application UIs because you
          spend less time undoing user-agent styles.
        </Typography.Paragraph>
      </div>
      <div>
        <Typography color="muted" type="body-xs" weight="semibold">
          BODY — EXTRA SMALL
        </Typography>
        <Typography.Paragraph size="xs">
          Fine print, captions, and secondary information are rendered at the smallest body size.
          This size is ideal for metadata, timestamps, or auxiliary details that should not compete
          with the primary content.
        </Typography.Paragraph>
      </div>
    </div>
  ),
};

export const InlineCode: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <Typography.Paragraph>
        Install the package with <Typography.Code>pnpm add @heroui/react</Typography.Code> and
        import <Typography.Code>{"<Typography>"}</Typography.Code> from the library.
      </Typography.Paragraph>
      <Typography.Paragraph size="sm">
        The <Typography.Code>typographyVariants</Typography.Code> function accepts{" "}
        <Typography.Code>type</Typography.Code>, <Typography.Code>align</Typography.Code>,{" "}
        <Typography.Code>color</Typography.Code>, and <Typography.Code>weight</Typography.Code>{" "}
        props.
      </Typography.Paragraph>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <Typography color="muted" type="body-xs" weight="semibold">
          START (DEFAULT)
        </Typography>
        <Typography align="start">
          Text aligned to the start edge. In LTR layouts this means left-aligned; in RTL it flips
          automatically.
        </Typography>
      </div>
      <div>
        <Typography color="muted" type="body-xs" weight="semibold">
          CENTER
        </Typography>
        <Typography align="center">
          Center-aligned text works well for hero sections, headings, and call-to-action blocks
          where symmetry is important.
        </Typography>
      </div>
      <div>
        <Typography color="muted" type="body-xs" weight="semibold">
          END
        </Typography>
        <Typography align="end">
          End-aligned text is useful for numerical columns, timestamps, or any content that benefits
          from right-alignment in LTR contexts.
        </Typography>
      </div>
      <div>
        <Typography color="muted" type="body-xs" weight="semibold">
          JUSTIFY
        </Typography>
        <Typography align="justify">
          Justified text stretches each line so that both left and right edges are flush. This style
          is common in print design and long-form reading experiences where a clean text block is
          desired.
        </Typography>
      </div>
    </div>
  ),
};

export const WeightScale: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <Typography weight="normal">Normal weight — the browser default for body text.</Typography>
      <Typography weight="medium">Medium weight — slightly heavier for subtle emphasis.</Typography>
      <Typography weight="semibold">Semibold weight — used for subheadings and labels.</Typography>
      <Typography weight="bold">Bold weight — strong emphasis for important content.</Typography>
    </div>
  ),
};

export const MutedColor: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <Typography.Heading level={3}>Account Settings</Typography.Heading>
      <Typography.Paragraph>
        Manage your account preferences and personal information below.
      </Typography.Paragraph>
      <Typography.Paragraph color="muted" size="sm">
        Changes to your profile may take up to 24 hours to propagate across all services. Contact
        support if you need immediate assistance.
      </Typography.Paragraph>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <Typography color="muted" type="body-xs" weight="semibold">
        WITHOUT TRUNCATION
      </Typography>
      <Typography>
        This is a long piece of text that will wrap naturally across multiple lines in a narrow
        container without any truncation applied.
      </Typography>
      <Typography color="muted" type="body-xs" weight="semibold">
        WITH TRUNCATION
      </Typography>
      <Typography truncate>
        This is a long piece of text that will be truncated with an ellipsis when it exceeds the
        available width of its container.
      </Typography>
    </div>
  ),
};

export const ArticleExample: Story = {
  render: () => (
    <article className="flex max-w-2xl flex-col gap-4">
      <Typography.Heading level={1}>Crafting a Design System</Typography.Heading>
      <Typography.Paragraph color="muted" size="sm">
        Published May 2026 · 8 min read
      </Typography.Paragraph>
      <Typography.Paragraph>
        A design system is more than a collection of reusable components. It is a shared language
        that unifies product teams, accelerates development, and ensures visual consistency at every
        level of an application.
      </Typography.Paragraph>
      <Typography.Heading level={2}>Why Typography Matters</Typography.Heading>
      <Typography.Paragraph>
        Typography accounts for roughly 95% of web design. The typefaces you choose, the scale you
        define, and the rhythm you establish between headings and body text determine how users
        perceive your product before they interact with a single button or form.
      </Typography.Paragraph>
      <Typography.Paragraph>
        A well-tuned type scale creates a clear visual hierarchy. Readers can scan a page, locate
        the information they need, and absorb your content without friction.
      </Typography.Paragraph>
      <Typography.Heading level={3}>Building the Scale</Typography.Heading>
      <Typography.Paragraph>
        Start with a base size — <Typography.Code>16px</Typography.Code> (1rem) is the industry
        standard — and derive heading sizes using a consistent ratio. HeroUI uses a tracking-tight
        heading stack from <Typography.Code>text-base</Typography.Code> through{" "}
        <Typography.Code>text-4xl</Typography.Code>, giving six levels of hierarchy.
      </Typography.Paragraph>
      <Typography.Heading level={3}>Readable Body Copy</Typography.Heading>
      <Typography.Paragraph>
        Good body text should feel effortless to read. A line height of 1.75 (Tailwind's{" "}
        <Typography.Code>leading-7</Typography.Code>) paired with a measure of roughly 65 characters
        keeps readers comfortable across long passages.
      </Typography.Paragraph>
      <Typography.Paragraph color="muted" size="sm">
        Shorter paragraphs, generous whitespace, and intentional weight contrast all contribute to
        readability. These defaults work out of the box with HeroUI's Typography primitive.
      </Typography.Paragraph>
    </article>
  ),
};

export const ProseBlock: Story = {
  render: () => (
    <Typography.Prose className="max-w-2xl">
      <h1>Getting Started with HeroUI</h1>
      <p>
        HeroUI is a modern React component library built on top of <strong>Tailwind CSS v4</strong>{" "}
        and <strong>React Aria</strong>. It provides accessible, customizable primitives that you
        can compose into complex interfaces.
      </p>

      <h2>Installation</h2>
      <p>
        Add the library to your project using your preferred package manager. The{" "}
        <code>@heroui/react</code> package includes every component:
      </p>
      <pre>
        <code>pnpm add @heroui/react</code>
      </pre>

      <h3>Quick Setup</h3>
      <p>
        Import the stylesheet in your application entry point and wrap your app with the provider:
      </p>

      <blockquote>
        Good design is as little design as possible. Less, but better — because it concentrates on
        the essential aspects, and the products are not burdened with non-essentials.
      </blockquote>

      <h3>Key Features</h3>
      <ul>
        <li>Fully accessible components built on React Aria primitives</li>
        <li>Compound component API inspired by Radix UI for maximum flexibility</li>
        <li>Tailwind CSS v4 styling with BEM-inspired class naming</li>
        <li>TypeScript-first with comprehensive type exports</li>
        <li>Dark mode support out of the box via CSS custom properties</li>
      </ul>

      <h3>Component Categories</h3>
      <ol>
        <li>
          <strong>Layout</strong> — Card, Surface, Header, Separator
        </li>
        <li>
          <strong>Navigation</strong> — Tabs, Accordion, Breadcrumbs, Link
        </li>
        <li>
          <strong>Forms</strong> — TextField, Checkbox, Radio, Select, Switch
        </li>
        <li>
          <strong>Feedback</strong> — Alert, Spinner, Toast, Progress
        </li>
        <li>
          <strong>Typography</strong> — Typography, Heading, Code, Prose
        </li>
      </ol>

      <hr />

      <h2>Next Steps</h2>
      <p>
        Explore the <a href="https://heroui.com">component stories</a> in Storybook to see every
        variant and composition in action. Each component ships with comprehensive documentation and
        live examples.
      </p>
    </Typography.Prose>
  ),
};

export const CompoundPrimitives: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      <Typography.Heading level={1}>Dashboard</Typography.Heading>
      <Typography.Paragraph>
        Convenience primitives are thin wrappers over Typography for explicit composition. Use{" "}
        <Typography.Code>Typography.Heading</Typography.Code>,{" "}
        <Typography.Code>Typography.Paragraph</Typography.Code>, and{" "}
        <Typography.Code>Typography.Code</Typography.Code> when you want the semantic element chosen
        automatically.
      </Typography.Paragraph>
      <Typography.Heading level={2}>Recent Activity</Typography.Heading>
      <Typography.Paragraph color="muted" size="sm">
        No new notifications. Check back later for updates on your projects and team activity.
      </Typography.Paragraph>
    </div>
  ),
};

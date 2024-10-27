// src/components/Grid/Grid.stories.tsx
import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Grid from "../src/Grid";
import GridItem from "../src/GridItem";

export default {
  title: "Components/Grid",
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible Grid component that supports container layout and responsive design.",
      },
<<<<<<< HEAD
    },
  },
  argTypes: {
    container: {
      control: "boolean",
      defaultValue: false,
      description: "Enable container layout mode",
    },
    columns: {control: {type: "number", min: 1, max: 6}, defaultValue: 2},
    gap: {control: {type: "text"}, defaultValue: "20px"},
    itemShape: {
      control: {type: "select"},
      options: ["square", "rounded", "circular"],
      defaultValue: "rounded",
=======
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
    },
  },
  argTypes: {
    // existing argTypes configuration
  },
} as ComponentMeta<typeof Grid>;

<<<<<<< HEAD
const Template: ComponentStory<typeof Grid> = (args) => {
  const getShapeStyle = () => {
    switch (args.itemShape) {
      case "circular":
        return {borderRadius: "50%"};
      case "rounded":
        return {borderRadius: "12px"};
      default:
        return {borderRadius: "0"};
    }
  };

  return (
    <div
      aria-label="Grid Layout"
      role="region"
      style={{
        padding: args.containerPadding,
        backgroundColor: args.containerBackground,
        border: `3px solid ${args.containerBorder}`,
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        {...args}
        style={{
          display: "grid",
          gap: args.gap,
          gridTemplateColumns: {
            base: "1fr",
            sm: `repeat(${Math.min(2, args.columns)}, 1fr)`,
            md: `repeat(${args.columns}, 1fr)`,
          },
          padding: args.gap,
        }}
      >
        {[...new Array(args.columns * 2)].map((_, index) => (
          <GridItem
            key={index}
            role="gridcell"
            style={{
              backgroundColor: args.itemBackground,
              color: args.itemTextColor,
              padding: "1rem",
              textAlign: "center",
              border: `2px solid ${args.itemBorder}`,
              boxShadow: args.itemShadow,
              ...getShapeStyle(),
            }}
          >
            Item {index + 1}
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
=======
const Template: ComponentStory<typeof Grid> = (args) => (
  <div
    aria-label="Grid Layout"
    role="region"
    style={{
      padding: args.containerPadding,
      backgroundColor: args.containerBackground,
      border: `3px solid ${args.containerBorder}`,
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Grid {...args} style={{gap: args.gap, padding: args.gap}}>
      {args.children}
    </Grid>
  </div>
);
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)

// Default Grid
export const Default = Template.bind({});
Default.args = {
  columns: 2,
  gap: "20px",
  itemShape: "rounded",
  itemBackground: "#4CAF50",
  itemTextColor: "#FFFFFF",
  itemBorder: "#388E3C",
  itemShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  containerBackground: "#212121",
  containerBorder: "#333",
  containerPadding: "1rem",
};
Default.parameters = {
  docs: {
    description: {
      story: "Basic grid layout with default configuration.",
    },
  },
};

// Add additional stories for edge cases and errors

// Story for zero columns (empty state)
export const ZeroColumns = Template.bind({});
ZeroColumns.args = {
  ...Default.args,
  columns: 0,
  children: [],
};
ZeroColumns.parameters = {
  docs: {
    description: {
      story: "Shows the grid behavior with zero columns, rendering an empty state.",
    },
  },
};
CircularItems.parameters = {
  docs: {
    description: {
      story: "Grid layout with circular items.",
    },
  },
};

// Story for invalid props (handled gracefully)
export const InvalidProps = Template.bind({});
InvalidProps.args = {
  ...Default.args,
  columns: "invalid", // intentionally invalid
  gap: "invalid", // intentionally invalid
  children: [<GridItem key="1">Item 1</GridItem>, <GridItem key="2">Item 2</GridItem>],
};
InvalidProps.parameters = {
  docs: {
    description: {
      story: "Shows how the grid handles invalid prop values gracefully.",
    },
  },
};

// Story for loading state (shows skeletons or placeholders)
export const LoadingState = Template.bind({});
LoadingState.args = {
  ...Default.args,
  children: Array.from({length: 6}, (_, index) => (
    <GridItem
      key={index}
      style={{
        backgroundColor: "#e0e0e0",
        color: "#c1c1c1",
        padding: "1rem",
        textAlign: "center",
        borderRadius: "12px",
      }}
    >
      Loading...
    </GridItem>
  )),
};
LoadingState.parameters = {
  docs: {
    description: {
      story: "Shows a loading state with placeholder items.",
    },
  },
};

// Story for an empty grid (no items provided)
export const EmptyState = Template.bind({});
EmptyState.args = {
  ...Default.args,
  children: [],
};
EmptyState.parameters = {
  docs: {
    description: {
      story: "Displays an empty grid when no items are provided.",
    },
  },
};
FourColumns.parameters = {
  docs: {
    description: {
      story: "Grid layout with four columns.",
    },
  },
};

// Story with container layout
export const ContainerLayout = Template.bind({});
ContainerLayout.args = {
  ...Default.args,
  container: true,
};
ContainerLayout.parameters = {
  docs: {
    description: {
      story:
        "Demonstrates the grid with container layout that centers content within specified breakpoints.",
    },
  },
};

// Story with responsive behavior
export const ResponsiveGrid = Template.bind({});
ResponsiveGrid.args = {
  ...Default.args,
  columns: {
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
  },
};
ResponsiveGrid.parameters = {
  docs: {
    description: {
      story: "Shows how the grid adapts to different screen sizes.",
    },
  },
};

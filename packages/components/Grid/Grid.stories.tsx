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
    },
    itemBackground: {control: "color", defaultValue: "#4CAF50"},
    itemTextColor: {control: "color", defaultValue: "#FFFFFF"},
    itemBorder: {control: "color", defaultValue: "#388E3C"},
    itemShadow: {control: "text", defaultValue: "0 4px 8px rgba(0, 0, 0, 0.2)"},
    containerBackground: {control: "color", defaultValue: "#212121"},
    containerBorder: {control: "color", defaultValue: "#333"},
    containerPadding: {control: "text", defaultValue: "1rem"},
  },
} as ComponentMeta<typeof Grid>;

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

// Story with circular items
export const CircularItems = Template.bind({});
CircularItems.args = {
  ...Default.args,
  itemShape: "circular",
  itemBackground: "#03A9F4",
  itemBorder: "#0288D1",
};
CircularItems.parameters = {
  docs: {
    description: {
      story: "Grid layout with circular items.",
    },
  },
};

// Story with four columns
export const FourColumns = Template.bind({});
FourColumns.args = {
  ...Default.args,
  columns: 4,
  itemBackground: "#FF5722",
  itemBorder: "#E64A19",
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

// src/components/Grid/Grid.stories.tsx
import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Grid from "../src/Grid";
import GridItem from "../src/GridItem";

export default {
  title: "Components/Grid",
  component: Grid,
  argTypes: {
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
  // Shape styling based on selection
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
          gridTemplateColumns: `repeat(${args.columns}, 1fr)`,
          padding: args.gap,
        }}
      >
        {Array.from({length: args.columns * 2}).map((_, index) => (
          <GridItem
            key={index}
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

// Story with circular items
export const CircularItems = Template.bind({});
CircularItems.args = {
  ...Default.args,
  itemShape: "circular",
  itemBackground: "#03A9F4",
  itemBorder: "#0288D1",
};

// Story with four columns
export const FourColumns = Template.bind({});
FourColumns.args = {
  ...Default.args,
  columns: 4,
  itemBackground: "#FF5722",
  itemBorder: "#E64A19",
};

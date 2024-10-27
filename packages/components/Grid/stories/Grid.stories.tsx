// Grid.stories.tsx
import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Grid from "../src/Grid";
import GridItem from "../src/GridItem";

export default {
  title: "Components/Grid",
  component: Grid,
  argTypes: {
    container: {
      control: "boolean",
      defaultValue: false,
      description: "Enable container layout mode",
    },
    columns: {
      control: {type: "number", min: 1, max: 12},
      defaultValue: 3,
      description: "Number of columns in the grid",
    },
    gap: {
      control: "select",
      options: ["0", "0.5rem", "1rem", "1.5rem", "2rem"],
      defaultValue: "1rem",
      description: "Gap between grid items",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A flexible Grid component that supports container layout and responsive design.",
      },
    },
  },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => (
  <Grid {...args}>
    <GridItem>Item 1</GridItem>
    <GridItem>Item 2</GridItem>
    <GridItem>Item 3</GridItem>
    <GridItem>Item 4</GridItem>
  </Grid>
);

export const Default = Template.bind({});
Default.args = {
  columns: 3,
  gap: "1rem",
  container: false,
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  columns: 2,
  gap: "1rem",
  container: false,
};

export const FourColumns = Template.bind({});
FourColumns.args = {
  columns: 4,
  gap: "1rem",
  container: true,
};

export const ResponsiveGrid = Template.bind({});
ResponsiveGrid.args = {
  columns: {
    "@initial": 1,
    "@sm": 2,
    "@md": 4,
  },
  gap: {
    "@initial": "0.5rem",
    "@sm": "1rem",
    "@md": "1.5rem",
  },
  container: true,
};
ResponsiveGrid.parameters = {
  docs: {
    description: {
      story: "Responsive grid that adjusts column count and gap based on screen size.",
    },
  },
};

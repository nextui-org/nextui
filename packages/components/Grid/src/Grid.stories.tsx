// Grid.stories.tsx
<<<<<<< HEAD
=======
// This file defines Storybook stories for the Grid component, showcasing its different configurations and responsiveness.
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Grid from "./Grid";
import GridItem from "./GridItem";

export default {
  title: "Components/Grid", // Title for the Storybook sidebar
  component: Grid, // Component being documented
  argTypes: {
<<<<<<< HEAD
    columns: {control: {type: "number", min: 1, max: 6}, defaultValue: 3},
    gap: {control: {type: "text"}, defaultValue: "10px"},
=======
    /**
     * Configures the number of columns in the grid layout.
     * The number can range between 1 and 6.
     */
    columns: {
      control: {type: "number", min: 1, max: 6},
      description: "Number of columns in the grid",
      table: {defaultValue: {summary: 3}},
    },
    /**
     * Defines the gap between grid items, which can be any CSS length value.
     */
    gap: {
      control: "text",
      description: "Gap between grid items",
      table: {defaultValue: {summary: "10px"}},
    },
    /**
     * Enables the container layout mode for the grid, allowing items to be centered within a max-width container.
     */
    container: {
      control: "boolean",
      description: "Enable container layout mode",
      table: {defaultValue: {summary: false}},
    },
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
  },
} as ComponentMeta<typeof Grid>;

/**
 * Template function for the Grid component stories, which renders a grid with customizable items.
 */
const Template: ComponentStory<typeof Grid> = (args) => (
  <Grid {...args}>
<<<<<<< HEAD
    <GridItem>Item 1</GridItem>
    <GridItem>Item 2</GridItem>
    <GridItem>Item 3</GridItem>
    <GridItem>Item 4</GridItem>
    <GridItem>Item 5</GridItem>
    <GridItem>Item 6</GridItem>
=======
    <GridItem style={{padding: "20px", border: "1px solid #eaeaea"}}>
      <div
        style={{
          height: "100px",
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Card 1
      </div>
    </GridItem>
    {/* Add additional GridItems as needed for variations */}
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
  </Grid>
);

/**
 * Default story showcasing a simple grid with three columns and a gap of 10px.
 */
export const Default = Template.bind({});
Default.args = {
  columns: 3,
  gap: "10px",
};

<<<<<<< HEAD
=======
/**
 * Story showing a two-column layout with a larger gap between items.
 */
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
export const TwoColumns = Template.bind({});
TwoColumns.args = {
  columns: 2,
  gap: "20px",
};

<<<<<<< HEAD
=======
/**
 * Story with a four-column grid and a smaller gap, demonstrating a denser layout.
 */
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
export const FourColumns = Template.bind({});
FourColumns.args = {
  columns: 4,
  gap: "5px",
<<<<<<< HEAD
=======
};

/**
 * Demonstrates the container layout mode, centering the grid within a constrained width.
 */
export const WithContainer = Template.bind({});
WithContainer.args = {
  columns: 3,
  gap: "10px",
  container: true,
};

/**
 * Responsive story adjusting the number of columns based on viewport size.
 * - 1 column on initial (small) screens
 * - 2 columns on small screens
 * - 3 columns on medium screens
 * - 4 columns on large screens
 */
export const Responsive = Template.bind({});
Responsive.args = {
  columns: {
    "@initial": 1,
    "@sm": 2,
    "@md": 3,
    "@lg": 4,
  },
  gap: "10px",
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
};

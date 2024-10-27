// Grid.stories.tsx
import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Grid from "./Grid";
import GridItem from "./GridItem";

export default {
  title: "Components/Grid",
  component: Grid,
  argTypes: {
    columns: {control: {type: "number", min: 1, max: 6}, defaultValue: 3},
    gap: {control: {type: "text"}, defaultValue: "10px"},
  },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => (
  <Grid {...args}>
    <GridItem>Item 1</GridItem>
    <GridItem>Item 2</GridItem>
    <GridItem>Item 3</GridItem>
    <GridItem>Item 4</GridItem>
    <GridItem>Item 5</GridItem>
    <GridItem>Item 6</GridItem>
  </Grid>
);

export const Default = Template.bind({});
Default.args = {
  columns: 3,
  gap: "10px",
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  columns: 2,
  gap: "20px",
};

export const FourColumns = Template.bind({});
FourColumns.args = {
  columns: 4,
  gap: "5px",
};

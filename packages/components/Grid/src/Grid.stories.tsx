// src/components/Grid/Grid.stories.tsx
import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Grid from "./Grid";
import GridItem from "./GridItem";

export default {
  title: "Components/Grid",
  component: Grid,
  argTypes: {
    columns: {control: {type: "number", min: 1, max: 6}},
    gap: {control: "text"},
  },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => (
  <Grid {...args}>
    <GridItem>Item 1</GridItem>
    <GridItem>Item 2</GridItem>
    <GridItem>Item 3</GridItem>
  </Grid>
);

export const Default = Template.bind({});
Default.args = {
  columns: 3,
  gap: "1rem",
};

import React from "react";

import Grid from "./Grid";
import GridItem from "./GridItem";

const Home = () => {
  return (
    <Grid columns={3} gap="20px">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
    </Grid>
  );
};

export default Home;

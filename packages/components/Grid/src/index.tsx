import React from "react";

import Grid from "./Grid";
import GridItem from "./GridItem";

// Example component showcasing different Grid configurations
const GridExample = () => {
  return (
    <Grid
      container
      columns={{
        "@initial": 1,
        "@sm": 2,
        "@md": 3,
      }}
      gap={{
        "@initial": "10px",
        "@sm": "20px",
        "@md": "30px",
      }}
    >
      <GridItem>Item 1</GridItem>
      <GridItem span={2}>Item 2 (span 2 columns)</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>
        <Grid container columns={2} gap="10px">
          <GridItem>Nested Item 4.1</GridItem>
          <GridItem>Nested Item 4.2</GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

// Export the core Grid components and example
<<<<<<< HEAD
export {Grid, GridItem, GridExample};
=======
export {Grid, GridItem, GridExample}; // Include GridExample in exports
>>>>>>> 9207c6d06 (feat: grid component updates with fixes)
export type {GridProps} from "./Grid";
export type {GridItemProps} from "./GridItem";

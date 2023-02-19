// import React from "react";
// import {Meta} from "@storybook/react";
// import {Grid} from "@nextui-org/grid";

// import {Button} from "../src";

// export default {
//   title: "General/ButtonGroup",
//   component: Button,
//   decorators: [
//     (Story) => (
//       <Grid.Container direction="column" gap={2} justify="center">
//         <Story />
//       </Grid.Container>
//     ),
//   ],
// } as Meta;

// export const Default = () => (
//   <Button.Group>
//     <Button>One</Button>
//     <Button>Two</Button>
//     <Button>Three</Button>
//   </Button.Group>
// );

// export const Loading = () => (
//   <Button.Group>
//     <Button>One</Button>
//     <Button>Two</Button>
//     <Button>Three</Button>
//   </Button.Group>
// );

// export const Variants = () => (
//   <>
//     <Button.Group color="success">
//       <Button>One</Button>
//       <Button disabled>Two</Button>
//       <Button>Three</Button>
//     </Button.Group>
//     <Button.Group color="gradient">
//       <Button>One</Button>
//       <Button disabled>Two</Button>
//       <Button>Three</Button>
//     </Button.Group>
//     <Button.Group color="error">
//       <Button>One</Button>
//       <Button>Two</Button>
//       <Button disabled>Three</Button>
//     </Button.Group>
//     <Button.Group bordered color="primary">
//       <Button disabled>Action1</Button>
//       <Button>Action2</Button>
//       <Button>Action3</Button>
//     </Button.Group>
//     <Button.Group bordered color="gradient">
//       <Button disabled>Action1</Button>
//       <Button>Action2</Button>
//       <Button>Action3</Button>
//     </Button.Group>
//     <Button.Group flat color="warning">
//       <Button>Action1</Button>
//       <Button disabled>Action2</Button>
//       <Button>Action2</Button>
//     </Button.Group>
//     <Button.Group color="secondary" size="sm">
//       <Button disabled>One</Button>
//       <Button>Two</Button>
//       <Button>Three</Button>
//     </Button.Group>
//     <Button.Group light color="secondary">
//       <Button>One</Button>
//       <Button disabled>Two</Button>
//       <Button>Three</Button>
//     </Button.Group>
//     <Button.Group ghost color="gradient">
//       <Button>One</Button>
//       <Button disabled>Two</Button>
//       <Button>Three</Button>
//     </Button.Group>
//   </>
// );

// export const Sizes = () => (
//   <>
//     <Button.Group size="xs">
//       <Button>One</Button>
//       <Button>Two</Button>
//     </Button.Group>
//     <Button.Group size="sm">
//       <Button>One</Button>
//       <Button>Two</Button>
//       <Button>Three</Button>
//     </Button.Group>
//     <Button.Group size="md">
//       <Button>One</Button>
//       <Button>Two</Button>
//       <Button>Three</Button>
//     </Button.Group>
//     <Button.Group size="lg">
//       <Button>One</Button>
//       <Button>Two</Button>
//       <Button>Three</Button>
//     </Button.Group>
//     <Button.Group size="xl">
//       <Button>One</Button>
//       <Button>Two</Button>
//       <Button>Three</Button>
//     </Button.Group>
//   </>
// );

// export const Vertical = () => (
//   <>
//     <Button.Group vertical size="sm">
//       <Button>One</Button>
//       <Button>Two</Button>
//       <Button>Three</Button>
//       <Button>Four</Button>
//     </Button.Group>
//   </>
// );

// export const Disabled = () => (
//   <>
//     <Button.Group disabled size="sm">
//       <Button>One</Button>
//       <Button>Two</Button>
//       <Button>Three</Button>
//     </Button.Group>
//   </>
// );

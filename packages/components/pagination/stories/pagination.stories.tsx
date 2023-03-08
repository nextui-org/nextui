import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {pagination} from "@nextui-org/theme";

import {Pagination, PaginationProps} from "../src";

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["solid", "bordered", "light", "flat", "faded", "shadow", "dot"],
      },
    },
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Pagination>;

const defaultProps = {
  ...pagination.defaultVariants,
  total: 10,
  initialPage: 1,
};

const Template: ComponentStory<typeof Pagination> = (args: PaginationProps) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

// import {Grid} from "@nextui-org/grid";

// import {Pagination} from "../src";

// export default {
//   title: "Navigation/Pagination",
//   component: Pagination,
// } as Meta;

// export const Default = () => <Pagination initialPage={1} total={20} />;

// export const Colors = () => (
//   <>
//     <Grid xs={12}>
//       <Pagination color="primary" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination color="secondary" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination color="success" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination color="warning" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination color="error" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination color="gradient" total={10} />
//     </Grid>
//   </>
// );

// export const Sizes = () => (
//   <>
//     <Grid xs={12}>
//       <Pagination size="xs" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination size="sm" total={5} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination initialPage={6} size="md" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination initialPage={6} size="lg" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination initialPage={6} size="xl" total={30} />
//     </Grid>
//   </>
// );

// export const Rounded = () => (
//   <>
//     <Grid xs={12}>
//       <Pagination rounded size="xs" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination rounded size="sm" total={5} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination rounded initialPage={6} size="md" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination rounded initialPage={6} size="lg" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination rounded initialPage={6} size="xl" total={30} />
//     </Grid>
//   </>
// );

// export const Bordered = () => (
//   <>
//     <Grid xs={12}>
//       <Pagination bordered initialPage={1} total={20} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination bordered rounded initialPage={1} total={20} />
//     </Grid>
//   </>
// );

// export const Shadow = () => (
//   <>
//     <Grid xs={12}>
//       <Pagination shadow color="primary" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination rounded shadow color="secondary" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination shadow color="success" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination rounded shadow color="warning" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination shadow color="error" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination rounded shadow color="gradient" total={10} />
//     </Grid>
//   </>
// );

// export const OnlyDots = () => (
//   <>
//     <Grid xs={12}>
//       <Pagination onlyDots color="primary" size="xs" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination onlyDots shadow color="secondary" size="sm" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination onlyDots color="success" size="md" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination onlyDots shadow color="warning" size="lg" total={10} />
//     </Grid>
//     <Grid xs={12}>
//       <Pagination onlyDots color="error" size="xl" total={10} />
//     </Grid>
//   </>
// );

// export const Loop = () => (
//   <>
//     <Grid xs={12}>
//       <Pagination loop initialPage={1} total={6} />
//     </Grid>
//   </>
// );

// export const NoMargin = () => (
//   <>
//     <Grid xs={12}>
//       <Pagination noMargin shadow color="secondary" initialPage={1} total={6} />
//     </Grid>
//   </>
// );

// export const NoControls = () => (
//   <>
//     <Grid xs={12}>
//       <Pagination shadow color="success" controls={false} initialPage={1} total={20} />
//     </Grid>
//   </>
// );

// export const NoAnimated = () => (
//   <>
//     <Grid xs={12}>
//       <Pagination animated={false} initialPage={1} total={6} />
//     </Grid>
//   </>
// );

import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {button, pagination} from "@nextui-org/theme";

import {Pagination, PaginationProps} from "../src";

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    page: {
      control: {
        type: "number",
      },
    },
    siblings: {
      control: {
        type: "number",
      },
    },
    boundaries: {
      control: {
        type: "number",
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["flat", "bordered", "light", "faded"],
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
    showShadow: {
      control: {
        type: "boolean",
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
  siblings: 1,
  boundaries: 1,
  initialPage: 1,
};

const Template: ComponentStory<typeof Pagination> = (args: PaginationProps) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithControls = Template.bind({});
WithControls.args = {
  ...defaultProps,
  showControls: true,
};

export const PaginationLoop = Template.bind({});
PaginationLoop.args = {
  ...defaultProps,
  showControls: true,
  loop: true,
};

export const InitialPage = Template.bind({});
InitialPage.args = {
  ...defaultProps,
  initialPage: 3,
};

export const IsEven = Template.bind({});
IsEven.args = {
  ...defaultProps,
  isEven: true,
};

export const Controlled = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="flex flex-col gap-5">
      <p>Page: {currentPage}</p>
      <Pagination
        {...defaultProps}
        showShadow
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
      />
      <div className="flex gap-2">
        <button
          className={button({color: "secondary", size: "sm", variant: "flat"})}
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </button>
        <button
          className={button({color: "secondary", size: "sm", variant: "flat"})}
          onClick={() => setCurrentPage((prev) => (prev < defaultProps.total ? prev + 1 : prev))}
        >
          Next
        </button>
      </div>
    </div>
  );
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

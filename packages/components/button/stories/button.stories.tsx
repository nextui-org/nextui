import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {button} from "@nextui-org/theme";
// import {Loading} from "@nextui-org/loading";
// import {Lock, Notification, User, Camera, Activity} from "@nextui-org/shared-icons";
import {Notification, Camera} from "@nextui-org/shared-icons";

import {Button, ButtonProps} from "../src";

export default {
  title: "General/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["solid", "bordered", "light", "flat", "shadow", "ghost"],
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
        options: ["none", "base", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Button>;

const defaultProps = {
  children: "Button",
  ...button.defaultVariants,
};

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  ...defaultProps,
  isDisabled: true,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  ...defaultProps,
  leftIcon: <Notification />,
  rightIcon: <Camera />,
};

// export const Loadings = () => (
//   <Grid.Container gap={2}>
//     <Grid>
//       <Button auto disabled color="primary" css={{px: "$13"}}>
//         <Loading color="currentColor" size="sm" />
//       </Button>
//     </Grid>
//     <Grid>
//       <Button auto disabled color="secondary" css={{px: "$13"}}>
//         <Loading color="currentColor" size="sm" type="spinner" />
//       </Button>
//     </Grid>
//     <Grid>
//       <Button auto disabled color="success" css={{px: "$13"}}>
//         <Loading color="currentColor" size="sm" type="points" />
//       </Button>
//     </Grid>
//     <Grid>
//       <Button auto disabled color="warning" css={{px: "$13"}}>
//         <Loading color="currentColor" size="sm" type="points-opacity" />
//       </Button>
//     </Grid>
//     <Grid>
//       <Button auto disabled color="error" css={{px: "$13"}}>
//         <Loading color="currentColor" size="sm" type="spinner" />
//       </Button>
//     </Grid>
//   </Grid.Container>
// );

import {Meta} from "@storybook/react";
import {alert} from "@nextui-org/theme";

import {Alert} from "../src";

export default {
  title: "Components/Alert",
  component: Alert,
} as Meta<typeof Alert>;

const defaultProps = {
  ...alert.defaultVariants,
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

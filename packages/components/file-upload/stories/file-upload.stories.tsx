import React from "react";
import {Meta} from "@storybook/react";
import {fileUpload} from "@nextui-org/theme";

import {FileUpload, FileUploadProps} from "../src";

export default {
  title: "Components/FileUpload",
  component: FileUpload,
  argTypes: {
    color: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof FileUpload>;

const defaultProps = {
  ...fileUpload.defaultVariants,
};

const Template = (args: FileUploadProps) => <FileUpload {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

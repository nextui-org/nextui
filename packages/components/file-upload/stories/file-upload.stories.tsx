import React from "react";
import {Meta} from "@storybook/react";
import {fileUpload} from "@nextui-org/theme";

import {FileUpload, FileUploadProps} from "../src";

export default {
  title: "Components/FileUpload",
  component: FileUpload,
  argTypes: {
    multiple: {
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
} as Meta<typeof FileUpload>;

const defaultProps = {
  multiple: false,
  ...fileUpload.defaultVariants,
};

const Template = (args: FileUploadProps) => <FileUpload {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

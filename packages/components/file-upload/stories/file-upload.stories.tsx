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
  maxItems: 2,
  maxItemsText: "Max Num of Items",
  maxAllowedSize: "250 KB",
  maxAllowedSizeText: "File Size for Each File",
  totalMaxAllowedSize: "2 MB",
  totalMaxAllowedSizeText: "Total Max",
  ...fileUpload.defaultVariants,
};

const Template = (args: FileUploadProps) => (
  <FileUpload
    {...args}
    // onChange={(files) => {
    //   console.log(files);
    // }}
  />
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

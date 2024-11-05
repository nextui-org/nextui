import React from "react";
import {Meta} from "@storybook/react";
import {fileUpload} from "@nextui-org/theme";
import {Button} from "@nextui-org/button";

import {FileUpload, FileUploadProps, FileUploadTopbar, FileUploadTopbarProps} from "../src";

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

const TopbarTemplate = ({
  totalMaxAllowedSize,
  ...args
}: FileUploadProps & FileUploadTopbarProps) => (
  <FileUpload {...args} topbar={<FileUploadTopbar totalMaxAllowedSize={totalMaxAllowedSize} />} />
);

const CustomFileItemTemplate = (args: FileUploadProps) => (
  <FileUpload {...args} fileItemElement={(file) => <div>File Name: {file.name}</div>} />
);

const CustomButtonsTemplate = (args: FileUploadProps) => {
  return (
    <FileUpload
      {...args}
      addButton={<Button>Custom add button</Button>}
      browseButton={<Button>Custom browse button</Button>}
      resetButton={<Button>Custom reset button</Button>}
      uploadButton={<Button>Upload</Button>}
    />
  );
};

const ButtonsContainerTemplate = (args: FileUploadProps) => {
  return (
    <FileUpload
      {...args}
      buttons={(onBrowse, onAdd, onReset) => {
        return (
          <div>
            <Button onClick={onBrowse}>Browse Files</Button>
            <Button onClick={onReset}>Remove All</Button>
            <Button onClick={onAdd}>Add New File</Button>
          </div>
        );
      }}
    />
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Topbar = {
  render: TopbarTemplate,
  args: {
    ...defaultProps,
    totalMaxAllowedSize: "5 MB",
  },
};

export const CustomFileItem = {
  render: CustomFileItemTemplate,
  args: {
    ...defaultProps,
  },
};

export const CustomButtons = {
  render: CustomButtonsTemplate,
  args: {
    ...defaultProps,
    multiple: true,
  },
};

export const ButtonsContainer = {
  render: ButtonsContainerTemplate,
  args: {
    ...defaultProps,
    multiple: true,
  },
};

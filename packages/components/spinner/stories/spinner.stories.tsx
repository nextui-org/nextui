import React from "react";
import {Meta} from "@storybook/react";
import {spinner} from "@heroui/theme";

import {Spinner, SpinnerProps} from "../src";

export default {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    labelColor: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <div className="ml-4">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Spinner>;

const defaultProps = {
  ...spinner.defaultVariants,
};

const VariantsTemplate = (args: SpinnerProps) => {
  return (
    <div className="flex flex-col gap-4 w-fit">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="p-2">variant</th>
            <th className="p-2">sm</th>
            <th className="p-2">md</th>
            <th className="p-2">lg</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 text-center">default</td>
            <td className="p-2">
              <Spinner {...args} size="sm" variant="default" />
            </td>
            <td className="p-2">
              <Spinner {...args} size="md" variant="default" />
            </td>
            <td className="p-2">
              <Spinner {...args} size="lg" variant="default" />
            </td>
          </tr>
          <tr>
            <td className="p-2 text-center">gradient</td>
            <td className="p-2">
              <Spinner {...args} size="sm" variant="gradient" />
            </td>
            <td className="p-2">
              <Spinner {...args} size="md" variant="gradient" />
            </td>
            <td className="p-2">
              <Spinner {...args} size="lg" variant="gradient" />
            </td>
          </tr>
          <tr>
            <td className="p-2 text-center">dots</td>
            <td className="p-2">
              <Spinner {...args} size="sm" variant="dots" />
            </td>
            <td className="p-2">
              <Spinner {...args} size="md" variant="dots" />
            </td>
            <td className="p-2">
              <Spinner {...args} size="lg" variant="dots" />
            </td>
          </tr>
          <tr>
            <td className="p-2 text-center">dots-blink</td>
            <td className="p-2">
              <Spinner {...args} size="sm" variant="dots-blink" />
            </td>
            <td className="p-2">
              <Spinner {...args} size="md" variant="dots-blink" />
            </td>
            <td className="p-2">
              <Spinner {...args} size="lg" variant="dots-blink" />
            </td>
          </tr>
          <tr>
            <td className="p-2 text-center">spinner-bars</td>
            <td className="p-2">
              <Spinner {...args} size="sm" variant="spinner-bars" />
            </td>
            <td className="p-2">
              <Spinner {...args} size="md" variant="spinner-bars" />
            </td>
            <td className="p-2">
              <Spinner {...args} size="lg" variant="spinner-bars" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithLabel = {
  args: {
    ...defaultProps,
    label: "Loading...",
  },
};

export const Variants = {
  args: {
    ...defaultProps,
    className: "h-full w-full",
  },

  render: VariantsTemplate,
};

import React, {useState} from "react";
import {Meta} from "@storybook/react";
import {button, rating} from "@nextui-org/theme";
import {useForm} from "react-hook-form";
import {
  AngryEmojicon,
  HappyEmojicon,
  HeartIcon,
  LikeIcon,
  MusicIcon,
  SadEmojicon,
  StarIcon,
  StraightEmojicon,
} from "@nextui-org/shared-icons";

import {Rating, RatingProps, RatingSegment} from "../src";

export default {
  title: "Components/Rating",
  component: Rating,
  argTypes: {
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
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
} as Meta<typeof Rating>;

const defaultProps = {
  ...rating.defaultVariants,
};

const Template = (args: RatingProps) => <Rating {...args} length={5} />;

const WithReactHookFormTemplate = (args) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Rating {...register("rating", {required: true})} {...args} length={5} />
        {errors.rating && <span className="text-danger text-tiny">This field is required</span>}
        <button className={button({class: "w-fit"})} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const ControlledTemplate = (args) => {
  const [value, setValue] = React.useState("0");

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <Rating {...args} length={5} onValueChange={setValue} />
      <p className="text-default-500 text-tiny">Rating value: {value}</p>
    </div>
  );
};

const PrecisionTemplate = (args) => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-x-5">
        <Rating precision={0.25} onValueChange={setValue1} {...args} length={5} />
        <span className="text-xs text-foreground-500">Precision 0.25: {value1}</span>
      </div>
      <div className="flex gap-x-5">
        <Rating precision={0.2} onValueChange={setValue2} {...args} length={5} />
        <span className="text-xs text-foreground-500">Precision 0.20: {value2}</span>
      </div>
    </div>
  );
};

const CustomIconTemplate = (args) => {
  const [value1, setValue1] = useState("0");
  const [value2, setValue2] = useState("0");
  const [value3, setValue3] = useState("0");

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-x-10">
        <Rating
          {...args}
          fillColor="red"
          icon={HeartIcon({})}
          length={5}
          onValueChange={setValue1}
        />
        <span className="text-tiny text-foreground-500">Heart Rating: {value1}</span>
      </div>
      <div className="flex gap-x-10">
        <Rating
          {...args}
          fillColor="green"
          icon={LikeIcon({})}
          length={5}
          onValueChange={setValue2}
        />
        <span className="text-tiny text-foreground-500">Like Rating: {value2}</span>
      </div>
      <div className="flex gap-x-10">
        <Rating
          {...args}
          fillColor="blue"
          icon={MusicIcon({})}
          length={5}
          onValueChange={setValue3}
        />
        <div className="text-tiny text-foreground-500">Music Rating: {value3}</div>
      </div>
    </div>
  );
};

const CustomSegmentTemplate = (args) => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Rating isSingleSelection length={4} onValueChange={setValue}>
        <RatingSegment fillColor="red" icon={AngryEmojicon({})} index={0} {...args} />
        <RatingSegment fillColor="orange" icon={SadEmojicon({})} index={1} {...args} />
        <RatingSegment icon={StraightEmojicon({})} index={2} {...args} />
        <RatingSegment fillColor="green" icon={HappyEmojicon({})} index={3} {...args} />
      </Rating>
      <div className="text-tiny text-foreground-500">Rating Value: {value}</div>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Accessibility = {
  render: Template,
  args: {
    ...defaultProps,
    length: 5,
    "aria-label": "Rate this item",
  },
  parameters: {
    a11y: {disable: false},
  },
};

export const Required = {
  render: WithReactHookFormTemplate,
  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const Disabled = {
  render: Template,
  args: {
    ...defaultProps,
    value: 3,
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    value: 2,
    isReadOnly: true,
  },
};

export const WithDescription = {
  render: Template,
  args: {
    ...defaultProps,
    description: "Description for the rating component.",
  },
};

export const WithErrorMessage = {
  render: Template,
  args: {
    ...defaultProps,
    errorMessage: "Error Message for the rating component.",
    isInvalid: true,
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
    icon: StarIcon({}),
  },
};

export const WithPrecision = {
  render: PrecisionTemplate,
  args: {
    ...defaultProps,
  },
};

export const CustomIcon = {
  render: CustomIconTemplate,
  args: {
    ...defaultProps,
  },
};

export const CustomSegments = {
  render: CustomSegmentTemplate,
  args: {
    ...defaultProps,
  },
};

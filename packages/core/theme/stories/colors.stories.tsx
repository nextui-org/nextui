import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {parseToRgba, readableColor} from "color2k";

import {commonColors} from "../src/colors";

type ColorsItem = {
  color: string;
  className?: string;
  textClassName?: string;
};

type SwatchColors = {
  title: string;
  items: ColorsItem[];
};

type SwatchSetProps = {
  colors: SwatchColors[];
  isSematic?: boolean;
};

const Swatch = ({color}: {color: string}) => {
  const colorText = color
    ? `#${parseToRgba(color)
        .slice(0, 3)
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()}`
    : "N/A";

  return (
    <div
      className="flex flex-col items-center justify-center w-24 h-24 m-2 rounded-xl shadow-lg"
      style={{
        backgroundColor: color,
      }}
    >
      <span
        style={{
          color: readableColor(color),
        }}
      >
        {colorText}
      </span>
    </div>
  );
};

const SematicSwatch = ({
  color,
  className,
  textClassName,
}: {
  color: string;
  className?: string;
  textClassName?: string;
}) => {
  return (
    <div
      className={`${className} flex flex-col items-center justify-center w-24 h-24 m-2 rounded-xl shadow-lg`}
    >
      <span className={textClassName}>{color}</span>
    </div>
  );
};

const SwatchSet = ({colors, isSematic = false}: SwatchSetProps) => (
  <div className="flex flex-row flex-wrap items-center justify-center w-full h-full p-4">
    {colors.map(({title, items}) => (
      <div key={title} className="flex flex-col items-start w-full h-full p-4">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <div className="flex flex-row flex-wrap items-center justify-start w-full h-full p-4">
          {items.map((c, index) =>
            isSematic ? (
              <SematicSwatch
                key={`${c.color}-${index}`}
                className={c.className}
                color={c.color}
                textClassName={c.textClassName}
              />
            ) : (
              <Swatch key={`${c.color}-${index}`} color={c.color} />
            ),
          )}
        </div>
      </div>
    ))}
  </div>
);

export default {
  title: "Foundation/Colors",
  component: SwatchSet,
} as ComponentMeta<typeof SwatchSet>;

const Template: ComponentStory<typeof SwatchSet> = (args: SwatchSetProps) => (
  <SwatchSet {...args} />
);

const getCommonItems = (colors: string[]) => {
  return colors.map((color) => ({
    color,
  }));
};

export const CommonColors = Template.bind({});
CommonColors.args = {
  colors: [
    {
      title: "App Colors",
      items: getCommonItems([commonColors.white, commonColors.black]),
    },
    {
      title: "Blue",
      items: getCommonItems([...Object.values(commonColors.blue)]),
    },
    {
      title: "Purple",
      items: getCommonItems([...Object.values(commonColors.purple)]),
    },
    {
      title: "Green",
      items: getCommonItems([...Object.values(commonColors.green)]),
    },
    {
      title: "Red",
      items: getCommonItems([...Object.values(commonColors.red)]),
    },
    {
      title: "Pink",
      items: getCommonItems([...Object.values(commonColors.pink)]),
    },
    {
      title: "Yellow",
      items: getCommonItems([...Object.values(commonColors.yellow)]),
    },
  ],
};

export const SemanticColors = Template.bind({});
SemanticColors.args = {
  isSematic: true,
  colors: [
    {
      title: "Layout",
      items: [
        {
          color: "background",
          className: "bg-background",
          textClassName: "text-foreground",
        },
        {
          color: "foreground",
          className: "bg-foreground",
          textClassName: "text-background",
        },
        {
          color: "border",
          className: "bg-border",
          textClassName: "text-foreground",
        },
      ],
    },
    {
      title: "Base",
      items: [
        {
          color: "neutral",
          className: "bg-neutral",
          textClassName: "text-neutral-contrastText",
        },
        {
          color: "primary",
          className: "bg-primary",
          textClassName: "text-primary-contrastText",
        },
        {
          color: "secondary",
          className: "bg-secondary",
          textClassName: "text-secondary-contrastText",
        },
        {
          color: "success",
          className: "bg-success",
          textClassName: "text-success-contrastText",
        },
        {
          color: "warning",
          className: "bg-warning",
          textClassName: "text-warning-contrastText",
        },
        {
          color: "danger",
          className: "bg-danger",
          textClassName: "text-danger-contrastText",
        },
      ],
    },
  ],
};

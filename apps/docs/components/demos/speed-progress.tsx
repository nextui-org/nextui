import {
  tv,
  VariantProps,
  CircularProgress,
  CircularProgressProps,
  circularProgress,
} from "@nextui-org/react";
import {FC} from "react";

const speedProgress = tv({
  extend: circularProgress,
  slots: {
    svg: "",
    label: "",
    value: "",
  },
  variants: {
    color: {
      olive: {
        svg: "text-[#84cc16]",
      },
      orange: {
        svg: "text-[#ff8c00]",
      },
      violet: {
        svg: "text-[#8b5cf6]",
      },
    },
    size: {
      sm: {
        svg: "w-10 h-10",
        label: "text-small",
        value: "text-[0.5rem]",
      },
      md: {
        svg: "w-12 h-12",
        label: "text-medium",
        value: "text-small",
      },
      lg: {
        svg: "w-14 h-14",
        label: "text-medium",
        value: "text-[0.6rem]",
      },
      xl: {
        svg: "w-16 h-16",
        label: "text-large",
        value: "text-small",
      },
    },
  },
  defaultVariants: {
    color: "olive",
    size: "sm",
  },
});

type SpeedProgressVariants = VariantProps<typeof speedProgress>;

export interface SpeedProgressProps extends Omit<CircularProgressProps, "color" | "size"> {
  color?: SpeedProgressVariants["color"];
  size?: SpeedProgressVariants["size"];
}

export const SpeedProgress: FC<SpeedProgressProps> = ({color, size, ...otherProps}) => {
  const slots = speedProgress({size, color});

  return (
    <CircularProgress
      classNames={{
        svg: slots.svg(),
        label: slots.label(),
        value: slots.value(),
      }}
      // color={color} // not needed because is being passed from slots
      formatOptions={{style: "unit", unit: "kilometer"}}
      label="Speed"
      showValueLabel={true}
      // size={size}
      {...otherProps}
    />
  );
};

// const MyApp = () => {
//   return (
//    <SpeedProgress color="orange" />
//   );
// }

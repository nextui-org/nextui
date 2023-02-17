import {tv, type VariantProps} from "tailwind-variants";

import {focusVisibleClasses} from "../../utils";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * <div className={card()}>A basic card</div>
 */
const card = tv({
  base: [
    ...focusVisibleClasses,
    "flex flex-col m-0 p-0 relative overflow-hidden w-full height-auto  bg-white rounded-xl box-border",
  ],
  variants: {
    variant: {
      shadow: "drop-shadow-lg",
      bordered: "border-border-default",
      flat: "bg-neutral-100",
    },
    borderWeight: {
      light: "",
      normal: "",
      bold: "",
      extrabold: "",
      black: "",
    },
    isHoverable: {
      true: "hover:drop-shadow-lg hover:-translate-y-0.5 transition",
    },
    isPressable: {
      true: "cursor-pointer active:scale-95",
    },
  },
  compoundVariants: [
    {
      variant: "bordered",
      borderWeight: "light",
      class: "border",
    },
    {
      variant: "bordered",
      borderWeight: "normal",
      class: "border-2",
    },
    {
      variant: "bordered",
      borderWeight: "bold",
      class: "border-3",
    },
    {
      variant: "bordered",
      borderWeight: "extrabold",
      class: "border-4",
    },
    {
      variant: "bordered",
      borderWeight: "black",
      class: "border-5",
    },
  ],
  defaultVariants: {
    variant: "shadow",
    isHoverable: false,
  },
});

export type CardVariantProps = VariantProps<typeof card>;
export type CardSlots = keyof ReturnType<typeof card>;

export {card};

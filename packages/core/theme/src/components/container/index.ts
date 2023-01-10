import {cva, type VariantProps} from "../../utils";

const containerBase = ["container"];

const containerVariants = {};

// const containerCompoundVariants = [];

const containerDefaultVariants = {};

const containerStyles = {
  variants: containerVariants,
  // compoundVariants: containerCompoundVariants,
  defaultVariants: containerDefaultVariants,
};

// @ts-ignore
const container = cva(containerBase, containerStyles);

export {
  containerBase,
  containerVariants,
  // containerCompoundVariants,
  containerDefaultVariants,
  containerStyles,
  container,
};

export type StyledContainerProps = VariantProps<typeof container>;

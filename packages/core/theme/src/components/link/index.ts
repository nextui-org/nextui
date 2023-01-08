import {styled, type VariantProps} from "../../utils";

export const link = styled(
  [
    "inline-flex",
    "items-center",
    "leading-inherit",
    "text-current",
    "w-fit",
    "bg-transparent",
    "bg-img-inherit",
    "bg-clip-inherit",
    "text-fill-inherit",
    "transition-opacity",
    "hover:opacity-80",
  ],
  {
    variants: {
      color: {
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        warning: "text-warning",
        error: "text-error",
      },
      isUnderline: {
        true: "hover:underline active:underline focus:underline",
        false: "no-underline",
      },
      isBlock: {
        true: "px-2 py-4 rounded transition-background transition-shadow",
      },
      disableAnimation: {
        true: "transition-none",
      },
    },
    compoundVariants: [
      {
        isBlock: true,
        color: "primary",
        class: "hover:bg-primary-light",
      },
      {
        isBlock: true,
        color: "secondary",
        class: "hover:bg-secondary-light",
      },
      {
        isBlock: true,
        color: "success",
        class: "hover:bg-success-light",
      },
      {
        isBlock: true,
        color: "warning",
        class: "hover:bg-warning-light",
      },
      {
        isBlock: true,
        color: "error",
        class: "hover:bg-error-light",
      },
    ],
    defaultVariants: {
      color: "primary",
      isBlock: false,
      isUnderline: false,
      disableAnimation: false,
    },
  },
);

export type StyledLinkProps = VariantProps<typeof link>;

import {cva, withFocusVisible, type VariantProps} from "../../utils";

const linkBase = withFocusVisible([
  "inline-flex",
  "relative",
  "items-center",
  "leading-inherit",
  "text-current",
  "w-fit",
  "rounded-lg",
  "bg-transparent",
  "bg-img-inherit",
  "bg-clip-inherit",
  "text-fill-inherit",
]);

const linkVariants = {
  size: {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  },
  color: {
    foreground: "text-foreground dark:text-foreground-dark",
    primary: "text-primary",
    secondary: "text-secondary dark:text-secondary-dark",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
  },
  isUnderline: {
    true: "hover:underline active:underline focus:underline",
    false: "no-underline",
  },
  isBlock: {
    true: "px-2 py-1 hover:after:opacity-100 after:content-[' '] after:inset-0 after:opacity-0 after:w-full after:h-full after:rounded-xl after:transition-background after:absolute",
    false: "hover:opacity-80 transition-opacity",
  },
  disableAnimation: {
    true: "after:transition-none transition-none",
  },
};

const linkCompoundVariants = [
  {
    isBlock: true,
    color: "foreground",
    class: "hover:after:bg-foreground/25 dark:hover:after:bg-foreground-dark/25",
  },
  {
    isBlock: true,
    color: "primary",
    class: "hover:after:bg-primary/25",
  },
  {
    isBlock: true,
    color: "secondary",
    class: "hover:after:bg-secondary/25 dark:hover:after:bg-secondary-dark/25",
  },
  {
    isBlock: true,
    color: "success",
    class: "hover:after:bg-success/25",
  },
  {
    isBlock: true,
    color: "warning",
    class: "hover:after:bg-warning/25",
  },
  {
    isBlock: true,
    color: "error",
    class: "hover:after:bg-error/25",
  },
];

const linkDefaultVariants = {
  color: "primary",
  size: "md",
  isBlock: false,
  isUnderline: false,
  disableAnimation: false,
};

const linkStyles = {
  variants: linkVariants,
  compoundVariants: linkCompoundVariants,
  defaultVariants: linkDefaultVariants,
};

// @ts-ignore
const link = cva(linkBase, linkStyles);

export {linkBase, linkVariants, linkCompoundVariants, linkDefaultVariants, linkStyles, link};

export type LinkVariantProps = VariantProps<typeof link>;

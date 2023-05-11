import {FC} from "react";
import {tv, VariantProps} from "tailwind-variants";

const blockquote = tv({
  base: "border pl-4 bg-neutral-50 my-6 py-3 rounded-xl [&>p]:mt-0",

  variants: {
    color: {
      neutral: "border-neutral-100 bg-neutral-50",
      primary: "border-primary-200 bg-primary-50",
      secondary: "border-secondary-200 bg-secondary-50",
      success: "border-success-200 bg-success-50",
      warning: "border-warning-200 bg-warning-50",
      danger: "border-danger-200 bg-danger-50",
    },
  },
  defaultVariants: {
    color: "neutral",
  },
});

type BlockquoteVariantProps = VariantProps<typeof blockquote>;

export interface BlockquoteProps extends BlockquoteVariantProps {
  children?: React.ReactNode;
  className?: string;
}

export const Blockquote: FC<BlockquoteProps> = ({children, color, className, ...props}) => {
  const styles = blockquote({color, className});

  return (
    <blockquote className={styles} {...props}>
      {children}
    </blockquote>
  );
};

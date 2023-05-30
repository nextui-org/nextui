import {FC} from "react";
import {tv, VariantProps} from "tailwind-variants";

const blockquote = tv({
  base: "border pl-4 bg-default-50 my-6 py-3 rounded-xl [&>p]:m-0",
  variants: {
    color: {
      default: "border-default-100 bg-default-50/20",
      primary: "border-primary-100 bg-primary-50/20",
      secondary: "border-secondary-100 bg-secondary-50/20",
      success: "border-success-100 bg-success-50/20",
      warning: "border-warning-100 bg-warning-50/20",
      danger: "border-danger-100 bg-danger-50/20",
    },
  },
  defaultVariants: {
    color: "default",
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

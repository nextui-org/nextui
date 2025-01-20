import {forwardRef} from "react";
import {Button, ButtonProps} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

export interface PreviewButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

export const PreviewButton = forwardRef<HTMLButtonElement | null, PreviewButtonProps>(
  (props, ref) => {
    const {icon, className, ...buttonProps} = props;

    return (
      <Button
        ref={ref}
        isIconOnly
        className={clsx(
          "relative z-50 text-zinc-300 top-8 border-1 border-transparent bg-transparent before:bg-white/10 before:content-[''] before:block before:z-[-1] before:absolute before:inset-0 before:backdrop-blur-md before:backdrop-saturate-100 before:rounded-lg",
          className,
        )}
        size="sm"
        variant="light"
        {...buttonProps}
      >
        {icon}
      </Button>
    );
  },
);

PreviewButton.displayName = "PreviewButton";

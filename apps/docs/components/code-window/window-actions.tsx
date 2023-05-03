import React from "react";
import {tv} from "tailwind-variants";
import {clsx} from "@nextui-org/shared-utils";

export type WindowActionsProps = {
  title?: string;
  className?: string;
};

const windowIconStyles = tv({
  base: "w-3 h-3 rounded-full",
  variants: {
    color: {
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      green: "bg-green-500",
    },
  },
});

export const WindowActions: React.FC<WindowActionsProps> = ({title, className, ...props}) => {
  return (
    <div
      className={clsx(
        "flex items-center sticky top-0 left-0 px-4 z-10 justify-between h-8 bg-code-background w-full",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 basis-1/3">
        <div className={windowIconStyles({color: "red"})} />
        <div className={windowIconStyles({color: "yellow"})} />
        <div className={windowIconStyles({color: "green"})} />
      </div>
      <div className="flex basis-1/3 h-full justify-center items-center">
        {title && <p className="text-white/30 text-xs font-light">{title}</p>}
      </div>
      <div className="flex basis-1/3" />
    </div>
  );
};

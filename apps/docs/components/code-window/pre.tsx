import {forwardRef} from "react";
import {clsx} from "@nextui-org/shared-utils";

export interface PreProps {
  className?: string;
  isScrollable?: boolean;
  children?: React.ReactNode;
}

export const Pre = forwardRef<HTMLPreElement, PreProps>(
  ({className = "", children, isScrollable = true, ...props}, forwardedRef) => {
    const scrollClass = isScrollable ? "overflow-scroll" : "overflow-hidden";

    return (
      <pre
        ref={forwardedRef}
        className={clsx(
          "relative w-full h-full box-border shadow-md text-white/80 leading-5 whitespace-pre text-sm font-mono bg-code-background rounded-xl [&>code]:transition-transform",
          scrollClass,
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    );
  },
);

Pre.displayName = "CodeBlock.Pre";

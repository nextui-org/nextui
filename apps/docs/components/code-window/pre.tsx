import {forwardRef} from "react";
import {clsx} from "@nextui-org/shared-utils";

export interface PreProps {
  className?: string;
  children?: React.ReactNode;
}

export const Pre = forwardRef<HTMLPreElement, PreProps>(
  ({className = "", children, ...props}, forwardedRef) => {
    return (
      <pre
        ref={forwardedRef}
        className={clsx(
          "relative w-full h-full box-border shadow-md text-white/80 px-4 py-6 leading-5 whitespace-pre text-sm font-mono bg-code-background rounded-xl overflow-hidden [&>code]:transition-transform",
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

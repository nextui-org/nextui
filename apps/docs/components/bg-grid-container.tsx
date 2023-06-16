import {ReactNode, FC} from "react";
import {clsx} from "@nextui-org/shared-utils";
export interface BgGridContainerProps {
  showGradient?: boolean;
  children?: ReactNode;
  className?: string;
}

export const BgGridContainer: FC<BgGridContainerProps> = ({
  // showGradient = true,
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        "relative overflow-y-hidden flex items-center border border-default-200 dark:border-default-100 px-2 py-4 rounded-lg",
        "overflow-hidden",
        // blur effect
        // "bg-transparent",
        // "before:w-full",
        // "before:bg-background/10",
        // "before:content-['']",
        // "before:block",
        // "before:z-[-1]",
        // "before:absolute",
        // "before:inset-0",
        // "before:backdrop-blur-md",
        // "before:backdrop-saturate-200",
        className,
      )}
    >
      <div className="max-w-full py-4 px-2 w-full h-full scrollbar-hide overflow-x-scroll">
        {children}
      </div>
      {/* <div
        className={clsx(
          "hidden md:block absolute z-[-1] inset-0 bg-grid-zinc-300/25 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.6))]",
          "dark:bg-grid-zinc-500/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]",
        )}
        style={{backgroundPosition: "10px 10px"}}
      />
      {showGradient && (
        <div className="hidden md:block absolute h-full w-full z-[-1] opacity-40 -top-8 -right-28">
          <Image
            removeWrapper
            alt="custom themes background"
            className="h-full w-full object-cover overflow-visible"
            src="/gradients/blue-purple-1.svg"
          />
        </div>
      )} */}
    </div>
  );
};

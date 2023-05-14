import {ReactNode, FC} from "react";
import {Image} from "@nextui-org/react";
import {clsx} from "@nextui-org/shared-utils";

export interface BgGridContainerProps {
  showGradient?: boolean;
  children?: ReactNode;
  className?: string;
}

export const BgGridContainer: FC<BgGridContainerProps> = ({
  showGradient = true,
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        "relative overflow-hidden flex items-center border border-neutral-400/50 dark:border-neutral-100/50 px-4 py-8 rounded-lg",
        "bg-transparent",
        "dark:bg-transparent",
        "before:bg-background/10",
        "before:content-['']",
        "before:block",
        "before:z-[-1]",
        "before:absolute",
        "before:inset-0",
        "before:backdrop-blur-md",
        "before:backdrop-saturate-200",
        className,
      )}
    >
      {children}
      <div
        className={clsx(
          "absolute z-[-1] inset-0 bg-grid-zinc-600/25 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.6))]",
          "dark:bg-grid-zinc-500/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]",
        )}
        style={{backgroundPosition: "10px 10px"}}
      />
      {showGradient && (
        <div className="absolute h-full w-full z-[-1] opacity-40 -top-8 -right-28">
          <Image
            removeWrapper
            alt="custom themes background"
            className="h-full w-full object-cover overflow-visible"
            src="/gradients/blue-purple-1.svg"
          />
        </div>
      )}
    </div>
  );
};

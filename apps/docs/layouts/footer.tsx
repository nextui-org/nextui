import {FC} from "react";
import {Link} from "@nextui-org/react";
import {clsx} from "@nextui-org/shared-utils";

import {VercelCallout} from "@/components";

export interface FooterProps {
  align?: "left" | "center" | "right";
  className?: string;
}

export const Footer: FC<FooterProps> = ({align = "center", className}) => {
  return (
    <div className={clsx("container mx-auto max-w-7xl pb-12 px-12", className)}>
      <div
        className={clsx("flex flex-col justify-center items-center gap-1", {
          "md:items-start": align === "left",
          "md:items-center": align === "center",
          "md:items-end": align === "right",
        })}
      >
        <p className="text-sm text-neutral-400">
          Created&nbsp;by&nbsp;
          <Link isExternal className="text-sm" href="https://jrgarciadev.com">
            Junior Garcia
          </Link>
        </p>
        <VercelCallout />
      </div>
    </div>
  );
};

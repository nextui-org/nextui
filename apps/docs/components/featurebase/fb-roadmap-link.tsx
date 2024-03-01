"use client";

import NextLink from "next/link";
import arrowRightUpIcon from "@iconify/icons-solar/arrow-right-up-linear";
import {Icon} from "@iconify/react/dist/offline";
import {clsx} from "@nextui-org/shared-utils";

export interface RoadmapLinkProps {
  className?: string;
}

export const FbRoadmapLink = ({className}: RoadmapLinkProps) => {
  return (
    <NextLink
      className={clsx("inline-flex items-center", className)}
      color="foreground"
      href={`${process.env.NEXT_PUBLIC_FB_FEEDBACK_URL}/roadmap`}
      target="_blank"
    >
      <div className="relative">
        Roadmap
        <Icon
          className="absolute right-[-10px] top-0 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]"
          icon={arrowRightUpIcon}
          width={10}
        />
      </div>
    </NextLink>
  );
};

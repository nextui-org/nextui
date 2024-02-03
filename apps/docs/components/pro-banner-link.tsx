"use client";

import {Icon} from "@iconify/react/dist/offline";
import arrowRightIcon from "@iconify/icons-solar/arrow-right-linear";

import {trackEvent} from "@/utils/va";

export const ProBannerLink = () => {
  const handleClick = () => {
    trackEvent("NextUI Pro Banner", {
      action: "click",
      category: "landing-page",
    });
  };

  return (
    <>
      <a
        className="text-small flex items-end sm:text-[0.93rem] text-foreground hover:opacity-80 transition-opacity"
        href="https://nextui.pro?ref=nextui"
        rel="noopener noreferrer"
        target="_blank"
        onClick={handleClick}
      >
        <span aria-label="rocket" className="hidden md:block" role="img">
          🚀
        </span>
        <span
          className="inline-flex md:ml-1 animate-text-gradient font-medium bg-clip-text text-transparent bg-[linear-gradient(90deg,#D6009A_0%,#8a56cc_50%,#D6009A_100%)] dark:bg-[linear-gradient(90deg,#FFEBF9_0%,#8a56cc_50%,#FFEBF9_100%)]"
          style={{
            fontSize: "inherit",
            backgroundSize: "200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Ship faster with beautiful components
        </span>
      </a>
      <a
        className="flex group min-w-[120px] items-center font-semibold text-foreground shadow-sm gap-1.5 relative overflow-hidden rounded-full p-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        href="https://nextui.pro?ref=nextui"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F54180_0%,#338EF7_50%,#F54180_100%)]" />
        <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background group-hover:bg-background/70 transition-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
          NextUI Pro
          <Icon
            aria-hidden="true"
            className="outline-none transition-transform group-hover:translate-x-0.5 [&>path]:stroke-[2px]"
            icon={arrowRightIcon}
            width={16}
          />
        </div>
      </a>
    </>
  );
};

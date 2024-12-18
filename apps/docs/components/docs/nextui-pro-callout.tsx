"use client";

import {usePostHog} from "posthog-js/react";
import NextLink from "next/link";

export const NextUIProCallout = () => {
  const posthog = usePostHog();

  const handleClick = () => {
    posthog.capture("NextUI Pro Banner", {
      action: "click",
      category: "nextui-callout",
    });
  };

  return (
    <div className="fixed flex flex-col items-center top-[calc(100vh-340px)] border border-default/60 hover:border-default/90 rounded-md py-6 px-2 m-2 cursor-pointer">
      <div>
        <p className="leading-tight tracking-tight text-center text-xl font-semibold">
          Ship&nbsp;
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#5EA2EF] to-[#0072F5]">
            faster
          </span>
          <br />
          with beautiful
          <br />
          components
        </p>
        <p className="text-center text-xs mt-2 px-6 font-medium text-default-500 leading-tight">
          Discover 210+ stunning, responsive components crafted by the NextUI team.
        </p>
      </div>
      <div className="mt-2 w-fit flex group items-center text-foreground hover:shadow-sm relative overflow-hidden rounded-full p-[2px]">
        <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#338EF7_0%,#F54180_50%,#338EF7_100%)]" />
        <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background transition-background p-2.5 text-xs font-medium hover:font-semibold text-foreground backdrop-blur-3xl">
          Explore Components
        </div>
      </div>
      <NextLink
        className="absolute inset-0 z-[1]"
        href="https://nextui.pro/components?utm_source=nextui.org&utm_medium=callout"
        onClick={handleClick}
      />
    </div>
  );
};

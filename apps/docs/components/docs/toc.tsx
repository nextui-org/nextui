"use client";

import {FC, useRef, useEffect, useState} from "react";
import {clsx} from "@nextui-org/shared-utils";
import {Divider, Spacer} from "@nextui-org/react";
import {ChevronCircleTopLinearIcon} from "@nextui-org/shared-icons";
import scrollIntoView from "scroll-into-view-if-needed";
import {usePostHog} from "posthog-js/react";

import {title} from "../primitives";

import {Heading} from "@/libs/docs/utils";
import {useScrollSpy} from "@/hooks/use-scroll-spy";
import {useScrollPosition} from "@/hooks/use-scroll-position";
import emitter from "@/libs/emitter";

export interface DocsTocProps {
  headings: Heading[];
}

const paddingLeftByLevel: Record<number, string> = {
  1: "pl-0",
  2: "pl-0",
  3: "pl-3",
  4: "pl-6",
};

export const DocsToc: FC<DocsTocProps> = ({headings}) => {
  const [isProBannerVisible, setIsProBannerVisible] = useState(true);

  const tocRef = useRef<HTMLDivElement>(null);

  const scrollPosition = useScrollPosition(tocRef);

  const activeId = useScrollSpy(
    headings.map(({id}) => `[id="${id}"]`),
    {
      rootMargin: "0% 0% -80% 0%",
    },
  );

  const activeIndex = headings.findIndex(({id}) => id == activeId);
  const firstId = headings[0].id;

  useEffect(() => {
    if (!activeId || activeIndex < 2) return;
    const anchor = tocRef.current?.querySelector(`li > a[href="#${activeId}"]`);

    if (anchor) {
      scrollIntoView(anchor, {
        behavior: "smooth",
        block: "center",
        inline: "center",
        scrollMode: "always",
        boundary: tocRef.current,
      });
    }
  }, [activeId, activeIndex]);

  useEffect(() => {
    emitter.on("proBannerVisibilityChange", (value) => {
      setIsProBannerVisible(value === "visible");
    });

    return () => {
      emitter.off("proBannerVisibilityChange");
    };
  }, []);

  const posthog = usePostHog();

  const handleClick = () => {
    posthog.capture("NextUI Pro Banner", {
      action: "click",
      category: "nextui-callout",
    });
  };

  return (
    <div
      ref={tocRef}
      className={clsx(
        "fixed w-full max-w-[12rem] flex flex-col gap-4 text-left pb-28 h-[calc(100vh-121px)] scrollbar-hide overflow-y-scroll",
        isProBannerVisible ? "top-32" : "top-20",
      )}
      style={{
        WebkitMaskImage: `linear-gradient(to top, transparent 0%, #000 100px, #000 ${
          scrollPosition > 30 ? "90%" : "100%"
        }, transparent 100%)`,
      }}
    >
      <p className="text-sm font-medium">On this page</p>
      <ul className="scrollbar-hide flex flex-col gap-2">
        {headings.map(
          (heading, i) =>
            heading.level > 1 && (
              <li
                key={i}
                className={clsx(
                  "transition-colors",
                  "font-normal",
                  "flex items-center text-tiny font-normal text-default-500 dark:text-default-300",
                  "data-[active=true]:text-foreground",
                  "dark:data-[active=true]:text-foreground",
                  "before:content-['']",
                  "before:opacity-0",
                  "data-[active=true]:before:opacity-100",
                  "before:transition-opacity",
                  "before:-ml-3",
                  "before:absolute",
                  "before:bg-default-400",
                  "before:w-1",
                  "before:h-1",
                  "before:rounded-full",
                  paddingLeftByLevel[heading.level],
                )}
                data-active={activeId == heading.id}
              >
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ),
        )}
        <li
          className="mt-2 opacity-0 data-[visible=true]:opacity-100 transition-opacity"
          data-visible={activeIndex >= 2}
        >
          <Divider />
          <Spacer y={2} />
          <a
            className="flex gap-2 items-center text-tiny text-default-500 dark:text-foreground/30 hover:text-foreground/80 pl-4 transition-opacity"
            href={`#${firstId}`}
          >
            Back to top
            <ChevronCircleTopLinearIcon />
          </a>
        </li>
      </ul>
      <div className="w-full border border-default/60 hover:shadow-inner hover:border-default/80 rounded-md p-2 cursor-pointer">
        <a
          className="flex flex-col items-center"
          href="https://nextui.pro?utm_source=nextui.org&utm_medium=callout"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          <div className="flex flex-col sm:flex-row">
            <h1 className={title({size: "xs"})}>Ship&nbsp;</h1>
            <h1 className={title({size: "xs", color: "blue"})}>faster&nbsp;</h1>
          </div>
          <div className="flex flex-col sm:flex-row">
            <h1 className={title({size: "xs"})}>with&nbsp;</h1>
            <h1 className={title({size: "xs"})}>beautiful&nbsp;</h1>
          </div>
          <div className="flex flex-col sm:flex-row">
            <h1 className={title({size: "xs"})}>components</h1>
          </div>
          <p className="text-center text-xs m-2 font-medium text-default-500">
            Discover 210+ stunning, responsive components crafted by the NextUI team.
          </p>
          <div className="flex group min-w-[120px] items-center font-semibold text-foreground shadow-sm gap-1.5 relative overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F54180_0%,#338EF7_50%,#F54180_100%)]" />
            <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background group-hover:bg-background/70 transition-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
              Explore Components
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

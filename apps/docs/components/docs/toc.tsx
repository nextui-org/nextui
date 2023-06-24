"use client";

import {FC, useRef, useEffect} from "react";
import {clsx} from "@nextui-org/shared-utils";
import {Divider, Spacer} from "@nextui-org/react";
import {ChevronCircleTopLinearIcon} from "@nextui-org/shared-icons";
import scrollIntoView from "scroll-into-view-if-needed";

import {Heading} from "@/libs/docs/utils";
import {useScrollSpy} from "@/hooks/use-scroll-spy";
import {useScrollPosition} from "@/hooks/use-scroll-position";

export interface DocsTocProps {
  headings: Heading[];
}

const paddingLeftByLevel: Record<number, string> = {
  1: "pl-0",
  2: "pl-0",
  3: "pl-3",
  4: "pl-3",
};

export const DocsToc: FC<DocsTocProps> = ({headings}) => {
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

  return (
    <div
      ref={tocRef}
      className="fixed w-full max-w-[12rem] flex flex-col gap-4 text-left top-20 pb-20 h-[calc(100vh-121px)] scrollbar-hide overflow-y-scroll"
      style={{
        WebkitMaskImage: `linear-gradient(to top, transparent 0%, #000 100px, #000 ${
          scrollPosition > 30 ? "90%" : "100%"
        }, transparent 100%)`,
      }}
    >
      <p className="text-sm">On this page</p>
      <ul className="scrollbar-hide flex flex-col gap-2">
        {headings.map(
          (heading, i) =>
            heading.level > 1 && (
              <li
                key={i}
                className={clsx(
                  "transition-colors",
                  "font-normal",
                  "flex items-center text-sm font-normal text-default-500 dark:text-default-300",
                  "data-[active=true]:text-foreground",
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
            className="flex gap-2 items-center text-sm text-default-500 dark:text-foreground/30 hover:text-foreground/80 pl-4 transition-opacity"
            href={`#${firstId}`}
          >
            Back to top
            <ChevronCircleTopLinearIcon />
          </a>
        </li>
      </ul>
    </div>
  );
};

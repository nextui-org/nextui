import {FC} from "react";
import {clsx} from "@nextui-org/shared-utils";

import {Heading} from "@/utils/docs-utils";
import {useScrollSpy} from "@/hooks/use-scroll-spy";

export interface DocsTocProps {
  headings: Heading[];
}

export const DocsToc: FC<DocsTocProps> = ({headings}) => {
  const activeId = useScrollSpy(
    headings.map(({id}) => `[id="${id}"]`),
    {
      rootMargin: "0% 0% -100% 0%",
    },
  );

  if (headings.length <= 0) return null;

  return (
    <div className="sticky top-20 h-[calc(100vh-121px)]">
      <h4>Contents</h4>
      <ul className="scrollbar-hide flex flex-col gap-2 mt-4 ml-6">
        {headings.map((heading, i) => (
          <li
            key={i}
            className={clsx(
              "flex items-center text-sm font-light text-foreground/30",
              "data-[active=true]:text-foreground/80",
              "before:content-['']",
              "before:opacity-0",
              "data-[active=true]:before:opacity-100",
              "before:transition-opacity",
              "before:mr-3",
              "before:block",
              "before:bg-neutral-300",
              "before:w-1",
              "before:h-1",
              "before:rounded-full",
            )}
            data-active={activeId == heading.id}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

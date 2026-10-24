"use client";

import type {BreadcrumbOptions} from "fumadocs-core/breadcrumb";
import type * as PageTree from "fumadocs-core/page-tree";
import type {ComponentProps} from "react";

import {useTranslations} from "@fuma-translate/react";
import {ChevronDown, ChevronLeft, ChevronRight} from "@gravity-ui/icons";
import {getBreadcrumbItemsFromPath} from "fumadocs-core/breadcrumb";
import {usePathname} from "fumadocs-core/framework";
import Link from "fumadocs-core/link";
import {useActiveAnchor} from "fumadocs-core/toc";
import {useTOCItems} from "fumadocs-ui/components/toc";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "fumadocs-ui/components/ui/collapsible";
import {useTreeContext, useTreePath} from "fumadocs-ui/contexts/tree";
import {useFooterItems} from "fumadocs-ui/utils/use-footer-items";
import {
  Fragment,
  createContext,
  use,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import {isActive} from "@/components/fumadocs/utils/urls";
import {cn} from "@/utils/cn";

import {LayoutContext} from "../client";

const TocPopoverContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export function PageTOCPopover({children, className, ...rest}: ComponentProps<"div">) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const {isNavTransparent} = use(LayoutContext)!;

  const onClick = useEffectEvent((e: Event) => {
    if (!open) return;

    if (ref.current && !ref.current.contains(e.target as HTMLElement)) setOpen(false);
  });

  useEffect(() => {
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <TocPopoverContext
      value={useMemo(
        () => ({
          open,
          setOpen,
        }),
        [setOpen, open],
      )}
    >
      <Collapsible
        data-toc-popover=""
        open={open}
        className={cn(
          "max-xl:layout:[--fd-toc-popover-height:--spacing(10)] sticky top-(--fd-docs-row-2) z-10 h-(--fd-toc-popover-height) [grid-area:toc-popover] xl:hidden",
          className,
        )}
        onOpenChange={setOpen}
        {...rest}
      >
        <header
          ref={ref}
          className={cn(
            "border-b backdrop-blur-sm transition-colors",
            (!isNavTransparent || open) && "bg-fd-background/80",
            open && "shadow-lg",
          )}
        >
          {children}
        </header>
      </Collapsible>
    </TocPopoverContext>
  );
}

export function PageTOCPopoverTrigger({className, ...props}: ComponentProps<"button">) {
  const t = useTranslations({note: "table of contents"});
  const {open} = use(TocPopoverContext)!;
  const items = useTOCItems();
  const active = useActiveAnchor();
  const selected = useMemo(
    () => items.findIndex((item) => active === item.url.slice(1)),
    [items, active],
  );
  const path = useTreePath().at(-1);
  const showItem = selected !== -1 && !open;

  return (
    <CollapsibleTrigger
      data-toc-popover-trigger=""
      className={cn(
        "text-fd-muted-foreground flex h-10 w-full items-center gap-2.5 px-4 py-2.5 text-start text-sm focus-visible:outline-none md:px-6 [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      <ProgressCircle
        className={cn("shrink-0", open && "text-fd-primary")}
        max={1}
        value={(selected + 1) / Math.max(1, items.length)}
      />
      <span className="grid flex-1 *:col-start-1 *:row-start-1 *:my-auto">
        <span
          className={cn(
            "truncate transition-all",
            open && "text-fd-foreground",
            showItem && "pointer-events-none -translate-y-full opacity-0",
          )}
        >
          {path?.name ?? t("On this page")}
        </span>
        <span
          className={cn(
            "truncate transition-all",
            !showItem && "pointer-events-none translate-y-full opacity-0",
          )}
        >
          {items[selected]?.title}
        </span>
      </span>
      <ChevronDown className={cn("mx-0.5 shrink-0 transition-transform", open && "rotate-180")} />
    </CollapsibleTrigger>
  );
}

interface ProgressCircleProps extends Omit<React.ComponentProps<"svg">, "strokeWidth"> {
  value: number;
  strokeWidth?: number;
  size?: number;
  min?: number;
  max?: number;
}

function clamp(input: number, min: number, max: number): number {
  if (input < min) return min;
  if (input > max) return max;

  return input;
}

function ProgressCircle({
  max = 100,
  min = 0,
  size = 24,
  strokeWidth = 2,
  value,
  ...restSvgProps
}: ProgressCircleProps) {
  const normalizedValue = clamp(value, min, max);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (normalizedValue / max) * circumference;
  const circleProps = {
    cx: size / 2,
    cy: size / 2,
    fill: "none",
    r: radius,
    strokeWidth,
  };

  return (
    <svg
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={normalizedValue}
      role="progressbar"
      viewBox={`0 0 ${size} ${size}`}
      {...restSvgProps}
    >
      <circle {...circleProps} className="stroke-current/25" />
      <circle
        {...circleProps}
        className="transition-all"
        stroke="currentColor"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export function PageTOCPopoverContent(props: ComponentProps<"div">) {
  return (
    <CollapsibleContent
      data-toc-popover-content=""
      {...props}
      className={cn("flex max-h-[50vh] flex-col px-4 md:px-6", props.className)}
    >
      {props.children}
    </CollapsibleContent>
  );
}

const subscribeToClientDate = () => () => {};

export function PageLastUpdate({
  date: value,
  ...props
}: Omit<ComponentProps<"p">, "children"> & {date: Date}) {
  const t = useTranslations({note: "page footer"});
  // to the timezone of client
  const date = useSyncExternalStore(
    subscribeToClientDate,
    () => value.toLocaleDateString(),
    () => "",
  );

  return (
    <p {...props} className={cn("text-fd-muted-foreground text-sm", props.className)}>
      {t("Last updated on")} {date}
    </p>
  );
}

type Item = Pick<PageTree.Item, "name" | "description" | "url">;
export interface FooterProps extends ComponentProps<"div"> {
  /**
   * Items including information for the next and previous page
   */
  items?: {
    previous?: Item;
    next?: Item;
  };
}

export function PageFooter({items, ...props}: FooterProps) {
  const footerList = useFooterItems();
  const pathname = usePathname();
  const {next, previous} = useMemo(() => {
    if (items) return items;

    const idx = footerList.findIndex((item) => isActive(item.url, pathname, false));

    if (idx === -1) return {};

    return {
      next: footerList[idx + 1],
      previous: footerList[idx - 1],
    };
  }, [footerList, items, pathname]);

  return (
    <div
      {...props}
      className={cn(
        "@container my-8 grid gap-4",
        previous && next ? "grid-cols-2" : "grid-cols-1",
        props.className,
      )}
    >
      {previous ? <FooterItem index={0} item={previous} /> : null}
      {next ? <FooterItem index={1} item={next} /> : null}
    </div>
  );
}

function FooterItem({index, item}: {item: Item; index: 0 | 1}) {
  const t = useTranslations({note: "pagination"});
  const Icon = index === 0 ? ChevronLeft : ChevronRight;

  return (
    <Link
      href={item.url}
      className={cn(
        "hover:text-fd-accent-foreground flex flex-col gap-2 rounded-2xl p-4 text-sm transition-none hover:bg-surface-secondary @max-lg:col-span-full",
        index === 1 && "text-end",
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-1.5 font-medium",
          index === 1 && "flex-row-reverse",
        )}
      >
        <Icon className="-mx-1 size-4 shrink-0 rtl:rotate-180" />
        <p>{item.name}</p>
      </div>
      <p className="text-fd-muted-foreground truncate">
        {item.description ?? (index === 0 ? t("Previous Page") : t("Next Page"))}
      </p>
    </Link>
  );
}

export type BreadcrumbProps = BreadcrumbOptions & ComponentProps<"div">;

export function PageBreadcrumb({
  includePage,
  includeRoot,
  includeSeparator,
  ...props
}: BreadcrumbProps) {
  const path = useTreePath();
  const {root} = useTreeContext();
  const items = useMemo(() => {
    return getBreadcrumbItemsFromPath(root, path, {
      includePage,
      includeRoot,
      includeSeparator,
    });
  }, [includePage, includeRoot, includeSeparator, path, root]);

  if (items.length === 0) return null;

  return (
    <div
      {...props}
      className={cn("text-fd-muted-foreground flex items-center gap-1.5 text-sm", props.className)}
    >
      {items.map((item, i) => {
        const className = cn("truncate", i === items.length - 1 && "text-fd-primary font-medium");

        return (
          <Fragment key={i}>
            {i !== 0 && <ChevronRight className="size-3.5 shrink-0" />}
            {item.url ? (
              <Link
                className={cn(className, "transition-opacity hover:opacity-80")}
                href={item.url}
              >
                {item.name}
              </Link>
            ) : (
              <span className={className}>{item.name}</span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

import type {BreadcrumbProps, FooterProps} from "./client";
import type {AnchorProviderProps, TOCItemType} from "fumadocs-core/toc";
import type {ComponentProps, ReactNode} from "react";

import {T} from "@fuma-translate/react";
import {TOCProvider, TOCScrollArea} from "fumadocs-ui/components/toc";
import {buttonVariants} from "fumadocs-ui/components/ui/button";

import {Edit, Text} from "@/components/fumadocs/ui/icons";
import {cn} from "@/utils/cn";

import {
  PageBreadcrumb,
  PageFooter,
  PageTOCPopover,
  PageTOCPopoverContent,
  PageTOCPopoverTrigger,
} from "./client";
import {TOCItems} from "./toc-items";

interface BreadcrumbOptions extends BreadcrumbProps {
  enabled: boolean;
  component: ReactNode;
}

interface FooterOptions extends FooterProps {
  enabled: boolean;
  component: ReactNode;
}

export interface DocsPageProps {
  toc?: TOCItemType[];
  tableOfContent?: Partial<TableOfContentOptions>;
  tableOfContentPopover?: Partial<TableOfContentPopoverOptions>;

  /**
   * Extend the page to fill all available space
   *
   * @defaultValue false
   */
  full?: boolean;

  /**
   * Replace or disable breadcrumb
   */
  breadcrumb?: Partial<BreadcrumbOptions>;

  /**
   * Footer navigation, you can disable it by passing `false`
   */
  footer?: Partial<FooterOptions>;

  children?: ReactNode;
}

type TableOfContentOptions = Pick<AnchorProviderProps, "single"> & {
  /**
   * Custom content in TOC container, before the main TOC
   */
  header?: ReactNode;

  /**
   * Custom content in TOC container, after the main TOC
   */
  footer?: ReactNode;

  enabled: boolean;
  component: ReactNode;

  /**
   * @defaultValue 'normal'
   */
  style?: "normal" | "clerk";
};

type TableOfContentPopoverOptions = Omit<TableOfContentOptions, "single">;

export function DocsPage({
  breadcrumb: {component: breadcrumb, enabled: breadcrumbEnabled = true, ...breadcrumbProps} = {},
  children,
  footer = {},
  full = false,
  tableOfContent: {component: tocReplace, enabled: tocEnabled, ...tocOptions} = {},
  tableOfContentPopover: {
    component: tocPopover,
    enabled: tocPopoverEnabled,
    ...tocPopoverOptions
  } = {},
  toc = [],
}: DocsPageProps) {
  // disable TOC on full mode, you can still enable it with `enabled` option.
  tocEnabled ??=
    !full && (toc.length > 0 || tocOptions.footer !== undefined || tocOptions.header !== undefined);

  tocPopoverEnabled ??=
    toc.length > 0 ||
    tocPopoverOptions.header !== undefined ||
    tocPopoverOptions.footer !== undefined;

  let wrapper = (children: ReactNode) => children;

  if (tocEnabled || tocPopoverEnabled) {
    wrapper = (children) => (
      <TOCProvider single={tocOptions.single} toc={toc}>
        {children}
      </TOCProvider>
    );
  }

  return wrapper(
    <>
      {!!tocPopoverEnabled &&
        (tocPopover ?? (
          <PageTOCPopover>
            <PageTOCPopoverTrigger />
            <PageTOCPopoverContent>
              {tocPopoverOptions.header}
              <TOCScrollArea>
                <TOCItems />
              </TOCScrollArea>
              {tocPopoverOptions.footer}
            </PageTOCPopoverContent>
          </PageTOCPopover>
        ))}
      <article
        data-full={full}
        id="nd-page"
        className={cn(
          "flex flex-col gap-4 px-4 py-6 [grid-area:main] *:max-w-[900px] md:px-6 md:pt-8 xl:px-8 xl:pt-14",
          full && "*:max-w-[1285px]",
        )}
      >
        {!!breadcrumbEnabled && (breadcrumb ?? <PageBreadcrumb {...breadcrumbProps} />)}
        {children}
        {footer.enabled !== false && (footer.component ?? <PageFooter items={footer.items} />)}
      </article>
      {!!tocEnabled &&
        (tocReplace ?? (
          <div
            className="xl:layout:[--fd-toc-width:268px] sticky top-(--fd-docs-row-3) flex h-[calc(var(--fd-docs-height)-var(--fd-docs-row-3))] w-(--fd-toc-width) flex-col pe-4 pt-12 pb-2 [grid-area:toc] max-xl:hidden"
            id="nd-toc"
          >
            {tocOptions.header}
            <h3
              className="text-fd-muted-foreground inline-flex items-center gap-1.5 text-sm"
              id="toc-title"
            >
              <Text className="size-4" />
              <T note="table of contents" text="On this page" />
            </h3>
            <TOCScrollArea>
              <TOCItems />
            </TOCScrollArea>
            {tocOptions.footer}
          </div>
        ))}
    </>,
  );
}

export function EditOnGitHub(props: ComponentProps<"a">) {
  return (
    <a
      rel="noreferrer noopener"
      target="_blank"
      {...props}
      className={cn(
        buttonVariants({
          className: "not-prose gap-1.5",
          color: "secondary",
          size: "sm",
        }),
        props.className,
      )}
    >
      {props.children ?? (
        <>
          <Edit className="size-3.5" />
          <T note="edit page" text="Edit on GitHub" />
        </>
      )}
    </a>
  );
}

/**
 * Add typography styles
 */
export function DocsBody({children, className, ...props}: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("prose flex-1", className)}>
      {children}
    </div>
  );
}

export function DocsDescription({children, className, ...props}: ComponentProps<"p">) {
  // Don't render if no description provided
  if (children === undefined) return null;

  return (
    <p {...props} className={cn("text-fd-muted-foreground mb-8 text-lg", className)}>
      {children}
    </p>
  );
}

export function DocsTitle({children, className, ...props}: ComponentProps<"h1">) {
  return (
    <h1 {...props} className={cn("text-[1.75em] font-semibold", className)}>
      {children}
    </h1>
  );
}

export {PageLastUpdate, PageBreadcrumb} from "./client";

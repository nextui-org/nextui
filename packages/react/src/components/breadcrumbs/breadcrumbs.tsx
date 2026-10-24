"use client";

import type {LinkProps} from "../link";
import type {BreadcrumbsVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {breadcrumbsVariants} from "@heroui/styles";
import React, {createContext, use} from "react";
import {
  Breadcrumb as BreadcrumbPrimitive,
  Breadcrumbs as BreadcrumbsPrimitive,
} from "react-aria-components/Breadcrumbs";

import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {IconChevronRight} from "../icons";
import {Link} from "../link";

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs Context
 * -----------------------------------------------------------------------------------------------*/
type BreadcrumbsContext = {
  slots?: ReturnType<typeof breadcrumbsVariants>;
  separator?: React.ReactNode;
};

const BreadcrumbsContext = createContext<BreadcrumbsContext>({});

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs Root
 * -----------------------------------------------------------------------------------------------*/
interface BreadcrumbsRootProps
  extends ComponentPropsWithRef<typeof BreadcrumbsPrimitive>, BreadcrumbsVariants {
  separator?: React.ReactNode;
}

const BreadcrumbsRoot = ({children, className, separator, ...props}: BreadcrumbsRootProps) => {
  const slots = React.useMemo(() => breadcrumbsVariants({}), []);

  return (
    <BreadcrumbsContext.Provider value={{slots, separator}}>
      <BreadcrumbsPrimitive
        data-slot="breadcrumbs"
        {...props}
        className={composeSlotClassName(slots.base, className)}
      >
        {children}
      </BreadcrumbsPrimitive>
    </BreadcrumbsContext.Provider>
  );
};

BreadcrumbsRoot.displayName = "HeroUI.Breadcrumbs";

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs Item
 * -----------------------------------------------------------------------------------------------*/
interface BreadcrumbsItemProps extends ComponentPropsWithRef<typeof BreadcrumbPrimitive> {}

const BreadcrumbsItem = ({
  children,
  className,
  ...props
}: BreadcrumbsItemProps & Omit<LinkProps, "className">) => {
  const {separator, slots} = use(BreadcrumbsContext);

  const renderSeparator = () => {
    if (!separator)
      return <IconChevronRight className={slots?.separator()} data-slot="breadcrumbs-separator" />;

    if (React.isValidElement(separator)) {
      return React.cloneElement(
        separator as React.ReactElement<{
          className?: string;
          "data-slot": "breadcrumbs-separator";
        }>,
        {
          className: slots?.separator(),
          "data-slot": "breadcrumbs-separator",
        },
      );
    }

    return separator;
  };

  return (
    <BreadcrumbPrimitive
      className={useResolvedClassName(className, slots?.item())}
      data-slot="breadcrumbs-item"
      {...props}
    >
      {({isCurrent}) => {
        if (typeof children === "function") {
          return children({} as any);
        }

        return (
          <>
            <Link className={slots?.link()} {...props}>
              {children}
            </Link>
            {!isCurrent && renderSeparator()}
          </>
        );
      }}
    </BreadcrumbPrimitive>
  );
};

BreadcrumbsItem.displayName = "HeroUI.Breadcrumbs.Item";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {BreadcrumbsRoot, BreadcrumbsItem};

export type {BreadcrumbsRootProps, BreadcrumbsItemProps};

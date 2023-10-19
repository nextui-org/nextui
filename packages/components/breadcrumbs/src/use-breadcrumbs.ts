import type {BreadcrumbsVariantProps, SlotsToClasses, BreadcrumbsSlots} from "@nextui-org/theme";
import type {AriaBreadcrumbsProps} from "@react-types/breadcrumbs";

import {Children, ReactNode} from "react";
import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {breadcrumbs} from "@nextui-org/theme";
import {filterDOMProps, ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {mergeProps} from "@react-aria/utils";
import {useBreadcrumbs as useAriaBreadcrumbs} from "@react-aria/breadcrumbs";
import {useMemo} from "react";
import {clsx, dataAttr} from "@nextui-org/shared-utils";

import {BreadcrumbItemProps} from "./breadcrumb-item";

type RenderEllipsisItemProps = {
  items: BreadcrumbItemProps[];
  maxItems: number;
  collapsedItem: ReactNode;
  ellipsisIcon: ReactNode;
  itemsBeforeCollapse: number;
  itemsAfterCollapse: number;
  separator: ReactNode;
};

interface Props extends HTMLNextUIProps<"nav">, AriaBreadcrumbsProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse?: number;
  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   * @default 2
   */
  itemsAfterCollapse?: number;
  /**
   * Specifies the maximum number of breadcrumbs to display.  When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   * @default 8
   */
  maxItems?: number;
  /**
   * The separator between each breadcrumb. It is a chevron by default.
   */
  separator?: ReactNode;
  /**
   * Breadcrumbs in a disabled state shows items, but indicates that navigation is
   * not available. This can be used to maintain layout continuity.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The breadcrumbs classNames.
   */
  classNames?: SlotsToClasses<BreadcrumbsSlots>;
  /**
   * The breadcrumbs items classNames.
   */
  itemClasses?: BreadcrumbItemProps["classNames"];
  /**
   * A function that allows to render the ellipsis when the number of items is exceeded.
   *
   * @param items Collapsed items
   */
  renderEllipsis?: (items: RenderEllipsisItemProps) => ReactNode;
}

export type UseBreadcrumbsProps = Props &
  BreadcrumbsVariantProps &
  Partial<Pick<BreadcrumbItemProps, "color" | "size" | "underline" | "disableAnimation">>;

export function useBreadcrumbs(originalProps: UseBreadcrumbsProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, breadcrumbs.variantKeys);

  const {
    ref,
    as,
    children,
    color,
    underline,
    isDisabled,
    separator,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 2,
    maxItems = 8,
    disableAnimation,
    renderEllipsis,
    className,
    classNames,
    itemClasses,
    ...otherProps
  } = props;

  const Component = as || "nav";
  const shouldFilterDOMProps = typeof Component === "string";

  const {navProps} = useAriaBreadcrumbs(originalProps);
  const childCount = Children.count(children);

  const domRef = useDOMRef(ref);

  const slots = useMemo(
    () =>
      breadcrumbs({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const baseStyles = clsx(classNames?.base, className);

  const itemProps: Partial<BreadcrumbItemProps> = {
    color,
    underline,
    disableAnimation,
    size: originalProps?.size,
    classNames: itemClasses,
  };

  const getBaseProps = () => ({
    ref: domRef,
    "data-slot": "base",
    className: slots.base({class: baseStyles}),
    ...mergeProps(
      navProps,
      filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
    ),
  });

  const getListProps = () => ({
    "data-slot": "list",
    className: slots.list({class: classNames?.list}),
  });

  const getEllipsisProps = () => ({
    "data-slot": "ellipsis",
    className: slots.ellipsis({class: classNames?.ellipsis}),
  });

  const getSeparatorProps = () => ({
    "data-slot": "separator",
    "aria-hidden": dataAttr(true),
    className: slots.separator({class: classNames?.separator}),
  });

  return {
    Component,
    children,
    slots,
    separator,
    childCount,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    maxItems,
    classNames,
    isDisabled,
    itemProps,
    renderEllipsis,
    getBaseProps,
    getListProps,
    getEllipsisProps,
    getSeparatorProps,
  };
}

export type UseBreadcrumbsReturn = ReturnType<typeof useBreadcrumbs>;

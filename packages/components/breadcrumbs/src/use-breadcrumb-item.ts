import type {
  BreadcrumbItemVariantProps,
  SlotsToClasses,
  BreadcrumbItemSlots,
} from "@nextui-org/theme";
import type {ReactNode} from "react";
import type {BreadcrumbItemProps as AriaBreadcrumbItemProps} from "@react-types/breadcrumbs";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useFocusRing} from "@react-aria/focus";
import {breadcrumbItem} from "@nextui-org/theme";
import {filterDOMProps, ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useBreadcrumbItem as useAriaBreadcrumbItem} from "@react-aria/breadcrumbs";
import {clsx, dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {useMemo} from "react";
import {mergeProps} from "@react-aria/utils";

interface Props
  extends Omit<HTMLNextUIProps<"li">, keyof AriaBreadcrumbItemProps>,
    AriaBreadcrumbItemProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLLIElement | null>;
  /**
   * The item custom separator. It is a chevron by default.
   */
  separator?: ReactNode;
  /**
   * Whether the item is the last one.
   * @default false
   */
  isLast?: boolean;
  /**
   * Whether to hide the separator element.
   * @default false
   */
  hideSeparator?: boolean;
  /**
   * The start content of the item.
   */
  startContent?: ReactNode;
  /**
   * The end content of the item.
   */
  endContent?: ReactNode;
  /**
   * The breadcrumbs item classNames.
   */
  classNames?: SlotsToClasses<BreadcrumbItemSlots>;
}

export type UseBreadcrumbItemProps = Props & BreadcrumbItemVariantProps;

export function useBreadcrumbItem(originalProps: UseBreadcrumbItemProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, breadcrumbItem.variantKeys);

  const {
    ref,
    as,
    className,
    children,
    isLast,
    separator,
    startContent,
    endContent,
    classNames,
    hideSeparator = false,
    ...otherProps
  } = props;

  const WrapperComponent = as || "li";

  const isCurrent = !!originalProps?.isCurrent;
  const isDisabled = originalProps?.isDisabled;

  const Component = originalProps?.href && !isCurrent ? "a" : "span";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const {itemProps} = useAriaBreadcrumbItem(
    {...originalProps, isCurrent, elementType: Component},
    domRef,
  );
  const {isFocusVisible, isFocused, focusProps} = useFocusRing();

  const slots = useMemo(
    () =>
      breadcrumbItem({
        ...variantProps,
        isCurrent,
        underline:
          originalProps?.underline !== undefined && !isCurrent ? originalProps?.underline : "none",
        className,
      }),
    [objectToDeps(variantProps), isCurrent, className],
  );

  const baseStyles = clsx(classNames?.base, className);

  const getBaseProps = () => ({
    ref: domRef,
    "data-slot": "base",
    className: slots.base({class: baseStyles}),
    ...filterDOMProps(otherProps, {
      enabled: shouldFilterDOMProps,
    }),
  });

  const getItemProps: PropGetter = () => ({
    href: !isCurrent ? originalProps?.href : undefined,
    "data-slot": "item",
    "data-focus": dataAttr(isFocused),
    "data-focus-visible": dataAttr(isFocusVisible),
    "data-disabled": originalProps?.isDisabled,
    "data-current": originalProps?.isCurrent,
    className: slots.item({class: classNames?.item}),
    ...mergeProps(itemProps, isDisabled ? {} : focusProps),
  });

  const getSeparatorProps = () => ({
    "data-slot": "separator",
    "aria-hidden": dataAttr(true),
    className: slots.separator({class: classNames?.separator}),
  });

  return {
    Component,
    WrapperComponent,
    children,
    separator,
    startContent,
    endContent,
    isDisabled,
    isCurrent,
    isLast,
    hideSeparator,
    getBaseProps,
    getItemProps,
    getSeparatorProps,
  };
}

export type UseBreadcrumbItemReturn = ReturnType<typeof useBreadcrumbItem>;

import type {BadgeSlots, BadgeVariantProps, SlotsToClasses} from "@nextui-org/theme";
import type {ReactNode} from "react";

import {badge} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";

export interface UseBadgeProps extends HTMLNextUIProps<"span">, BadgeVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * The children of the badge.
   */
  children: ReactNode;
  /**
   * The content of the badge. The badge will be rendered relative to its children.
   */
  content?: string | number | ReactNode;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Badge styles={{
   *    base:"base-classes", // wrapper
   *    badge: "badge-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<BadgeSlots>;
}

export function useBadge(originalProps: UseBadgeProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, badge.variantKeys);

  const {as, ref, children, className, content, styles, ...otherProps} = props;

  const Component = as || "span";

  const domRef = useDOMRef(ref);

  const isOneChar = useMemo(() => String(content)?.length === 1, [content]);
  const isDot = useMemo(() => String(content)?.length === 0, [content]);

  const baseStyles = clsx(styles?.badge, className);

  const slots = useMemo(
    () =>
      badge({
        ...variantProps,
        isOneChar,
        isDot,
      }),
    [...Object.values(variantProps), isOneChar, isDot],
  );

  const getBadgeProps: PropGetter = () => {
    return {
      ref: domRef,
      className: slots.badge({class: baseStyles}),
      "data-invisible": originalProps.isInvisible,
      ...otherProps,
    };
  };

  return {
    Component,
    children,
    content,
    slots,
    styles,
    getBadgeProps,
  };
}

export type UseBadgeReturn = ReturnType<typeof useBadge>;

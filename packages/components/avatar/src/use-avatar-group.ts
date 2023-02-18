import type {ReactNode} from "react";

import {avatarGroup} from "@nextui-org/theme";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef, clsx, getValidChildren, compact} from "@nextui-org/shared-utils";
import {cloneElement} from "react";

import {AvatarProps} from "./index";

export interface UseAvatarGroupProps extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  children?: ReactNode;
  /**
   * The size of the avatars
   */
  size?: AvatarProps["size"];
  /**
   * The color of the avatars
   */
  color?: AvatarProps["color"];
  /**
   * The radius of the avatars
   */
  radius?: AvatarProps["radius"];
  /**
   * Whether the avatars are bordered
   */
  isBordered?: AvatarProps["isBordered"];
  /**
   * Whether the avatars are disabled
   */
  isDisabled?: AvatarProps["isDisabled"];
  /**
   * Whether the avatars should be displayed in a grid
   */
  isGrid?: boolean;
  /**
   * The maximum number of visible avatars
   * @default 5
   */
  max?: number;
  /**
   * Control the number of avatar not visible
   */
  total?: number;
  /**
   * This allows you to render a custom count component.
   */
  renderCount?: (count: number) => ReactNode;
}

export type ContextType = {
  size?: AvatarProps["size"];
  color?: AvatarProps["color"];
  radius?: AvatarProps["radius"];
  isGrid?: boolean;
  isBordered?: AvatarProps["isBordered"];
  isDisabled?: AvatarProps["isDisabled"];
};

export function useAvatarGroup(props: UseAvatarGroupProps) {
  const {
    as,
    ref,
    max = 5,
    total,
    size,
    color,
    radius,
    children,
    isBordered,
    isDisabled,
    isGrid,
    className,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const Component = as || "div";

  const context: ContextType = {
    size,
    color,
    radius,
    isGrid,
    isBordered,
    isDisabled,
  };

  const styles = avatarGroup({className, isGrid});

  const validChildren = getValidChildren(children);
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren;

  const remainingCount = total ? total : max != null ? validChildren.length - max : -1;

  const clones = childrenWithinMax.map((child, index) => {
    const isFirstAvatar = index === 0;
    const isLastAvatar = index === childrenWithinMax.length - 1;

    const childProps = {
      className: clsx(
        isFirstAvatar ? "ml-0" : !isGrid ? "-ml-2" : "",
        isLastAvatar && remainingCount < 1 ? "hover:-translate-x-0" : "",
      ),
    };

    return cloneElement(child, compact(childProps));
  });

  return {
    Component,
    context,
    domRef,
    styles,
    remainingCount,
    clones,
    ...otherProps,
  };
}

export type UseAvatarReturn = ReturnType<typeof useAvatarGroup>;

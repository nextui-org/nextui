import type {UserVariantProps, SlotsToClasses, UserSlots} from "@nextui-org/theme";
import type {AvatarProps} from "@nextui-org/avatar";

import {ReactNode, useMemo, useCallback} from "react";
import {useFocusRing} from "@react-aria/focus";
import {HTMLNextUIProps} from "@nextui-org/system";
import {user} from "@nextui-org/theme";
import {ReactRef, clsx} from "@nextui-org/shared-utils";
import {useDOMRef} from "@nextui-org/dom-utils";
import {mergeProps} from "@react-aria/utils";
export interface UseUserProps
  extends Omit<HTMLNextUIProps<"div", UserVariantProps>, "children" | "isFocusVisible"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * The user name.
   */
  name: ReactNode | string;
  /**
   * The user information, like email, phone, etc.
   */
  description?: ReactNode | string;
  /**
   * Whether the user can be focused.
   * @default false
   */
  isFocusable?: boolean;
  /**
   * The user avatar props
   * @see https://nextui.org/docs/components/avatar
   */
  avatarProps?: AvatarProps;
  /**
   * Classname or List of classes to change the styles of the avatar.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <User styles={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    name: "name-classes",
   *    description: "description-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<UserSlots>;
}

export function useUser(props: UseUserProps) {
  const {
    as,
    ref,
    css,
    name,
    description,
    className,
    styles,
    isFocusable = false,
    avatarProps = {
      isFocusable: false,
      name: typeof name === "string" ? name : undefined,
    },
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const {isFocusVisible, focusProps} = useFocusRing();

  const Component = as || "div";

  const canBeFocused = useMemo(() => {
    return isFocusable || as === "button";
  }, [isFocusable, as]);

  const slots = user({isFocusVisible});

  const baseStyles = clsx(styles?.base, className);

  const buttonStyles = useMemo(() => {
    if (as !== "button") return "";

    // reset button styles
    return [
      "p-0",
      "m-0",
      "bg-none",
      "radius-none",
      "appearance-none",
      "outline-none",
      "border-none",
      "cursor-pointer",
    ];
  }, [as]);

  const getUserProps = useCallback(
    () => ({
      tabIndex: canBeFocused ? 0 : -1,
      className: slots.base({
        class: clsx(baseStyles, buttonStyles),
      }),
      ...mergeProps(otherProps, canBeFocused ? focusProps : {}),
    }),
    [canBeFocused, slots, baseStyles, focusProps, otherProps],
  );

  return {
    Component,
    domRef,
    className,
    css,
    slots,
    name,
    description,
    styles,
    baseStyles,
    focusProps,
    avatarProps,
    getUserProps,
  };
}

export type UseUserReturn = ReturnType<typeof useUser>;

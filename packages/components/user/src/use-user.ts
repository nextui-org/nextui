import type {SlotsToClasses, UserSlots} from "@nextui-org/theme";
import type {AvatarProps} from "@nextui-org/avatar";

import {ReactNode, useMemo, useCallback} from "react";
import {useFocusRing} from "@react-aria/focus";
import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {user} from "@nextui-org/theme";
import {ReactRef, clsx, dataAttr} from "@nextui-org/shared-utils";
import {useDOMRef} from "@nextui-org/dom-utils";
import {mergeProps} from "@react-aria/utils";
export interface UseUserProps extends Omit<HTMLNextUIProps<"div">, "children"> {
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
   * Classname or List of classes to change the classNames of the avatar.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <User classNames={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    name: "name-classes",
   *    description: "description-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<UserSlots>;
}

export function useUser(props: UseUserProps) {
  const {
    as,
    ref,
    name,
    description,
    className,
    classNames,
    isFocusable = false,
    avatarProps = {
      isFocusable: false,
      name: typeof name === "string" ? name : undefined,
    },
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing();

  const canBeFocused = useMemo(() => {
    return isFocusable || as === "button";
  }, [isFocusable, as]);

  const slots = useMemo(() => user(), []);

  const baseStyles = clsx(className, classNames?.base);

  const getUserProps = useCallback<PropGetter>(
    () => ({
      ref: domRef,
      tabIndex: canBeFocused ? 0 : -1,
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-focus": dataAttr(isFocused),
      className: slots.base({
        class: baseStyles,
      }),
      ...mergeProps(otherProps, canBeFocused ? focusProps : {}),
    }),
    [canBeFocused, slots, baseStyles, focusProps, otherProps],
  );

  return {
    Component,
    className,
    slots,
    name,
    description,
    classNames,
    baseStyles,
    focusProps,
    avatarProps,
    getUserProps,
  };
}

export type UseUserReturn = ReturnType<typeof useUser>;

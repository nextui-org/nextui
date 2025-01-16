import type {SlotsToClasses, UserSlots} from "@heroui/theme";
import type {AvatarProps} from "@heroui/avatar";

import {ReactNode, useMemo, useCallback} from "react";
import {useFocusRing} from "@react-aria/focus";
import {HTMLHeroUIProps, PropGetter} from "@heroui/system";
import {user} from "@heroui/theme";
import {clsx, dataAttr} from "@heroui/shared-utils";
import {filterDOMProps, ReactRef} from "@heroui/react-utils";
import {useDOMRef} from "@heroui/react-utils";
import {mergeProps} from "@react-aria/utils";
interface Props {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * The user name.
   */
  name: ReactNode;
  /**
   * The user information, like email, phone, etc.
   */
  description?: ReactNode;
  /**
   * Whether the user can be focused.
   * @default false
   */
  isFocusable?: boolean;
  /**
   * The user avatar props
   * @see https://heroui.com/docs/components/avatar
   */
  avatarProps?: Partial<AvatarProps>;
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

export type UseUserProps = Props & Omit<HTMLHeroUIProps<"div">, "children">;

export function useUser(props: UseUserProps) {
  const {
    as,
    ref,
    name,
    description,
    className,
    classNames,
    isFocusable = false,
    avatarProps: userAvatarProps = {},
    ...otherProps
  } = props;

  const avatarProps = {
    isFocusable: false,
    ...userAvatarProps,
  };

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({});

  const canBeFocused = useMemo(() => {
    return isFocusable || as === "button";
  }, [isFocusable, as]);

  const slots = useMemo(() => user(), []);

  const baseStyles = clsx(classNames?.base, className);

  const getUserProps = useCallback<PropGetter>(
    () => ({
      ref: domRef,
      tabIndex: canBeFocused ? 0 : -1,
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-focus": dataAttr(isFocused),
      className: slots.base({
        class: baseStyles,
      }),
      ...mergeProps(
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        canBeFocused ? focusProps : {},
      ),
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
    avatarProps,
    getUserProps,
  };
}

export type UseUserReturn = ReturnType<typeof useUser>;

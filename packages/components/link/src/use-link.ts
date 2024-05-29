import type {AriaLinkProps} from "@react-types/link";
import type {LinkVariantProps} from "@nextui-org/theme";

import {link} from "@nextui-org/theme";
import {useLink as useAriaLink} from "@react-aria/link";
import {
  HTMLNextUIProps,
  mapPropsVariants,
  PropGetter,
  useProviderContext,
} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {useFocusRing} from "@react-aria/focus";
import {dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {ReactRef} from "@nextui-org/react-utils";
import {useMemo, useCallback} from "react";
import {mergeProps} from "@react-aria/utils";

interface Props extends HTMLNextUIProps<"a">, LinkVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLAnchorElement | null>;
  /**
   * Whether the link is external.
   * @default false
   */
  isExternal?: boolean;
  /**
   * Whether to show the icon when the link is external.
   * @default false
   */
  showAnchorIcon?: boolean;
  /**
   * The icon to display right after the link.
   * @default <LinkIcon />
   */
  anchorIcon?: React.ReactNode;
}

export type UseLinkProps = Props & AriaLinkProps;

export function useLink(originalProps: UseLinkProps) {
  const globalContext = useProviderContext();

  const [props, variantProps] = mapPropsVariants(originalProps, link.variantKeys);

  const {
    ref,
    as,
    children,
    anchorIcon,
    isExternal = false,
    showAnchorIcon = false,
    autoFocus = false,
    className,
    onPress,
    onPressStart,
    onPressEnd,
    onClick,
    ...otherProps
  } = props;

  const Component = as || "a";

  const domRef = useDOMRef(ref);
  const disableAnimation =
    originalProps?.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const {linkProps} = useAriaLink(
    {
      ...otherProps,
      onPress,
      onPressStart,
      onPressEnd,
      // @ts-ignore React Aria Link does accept onClick as a prop but it's not in the types
      onClick,
      isDisabled: originalProps.isDisabled,
      elementType: `${as}`,
    },
    domRef,
  );

  const {isFocused, isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  if (isExternal) {
    otherProps.rel = otherProps.rel ?? "noopener noreferrer";
    otherProps.target = otherProps.target ?? "_blank";
  }

  const classNames = useMemo(
    () =>
      link({
        ...variantProps,
        disableAnimation,
        className,
      }),
    [objectToDeps(variantProps), disableAnimation, className],
  );

  const getLinkProps: PropGetter = useCallback(() => {
    return {
      ref: domRef,
      className: classNames,
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(originalProps.isDisabled),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(focusProps, linkProps, otherProps),
    };
  }, [classNames, isFocused, isFocusVisible, focusProps, linkProps, otherProps]);

  return {Component, children, anchorIcon, showAnchorIcon, getLinkProps};
}

export type UseLinkReturn = ReturnType<typeof useLink>;
